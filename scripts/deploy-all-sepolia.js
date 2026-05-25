const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/demo"
  );
  const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
  console.log("Deployer:", wallet.address);

  const deployedPath = path.join(__dirname, "..", "deployed-addresses.json");
  const frontendPath = path.join(__dirname, "..", "frontend", "deployed-addresses.json");
  let deployed = { litvm: {} };
  if (fs.existsSync(deployedPath)) {
    deployed = JSON.parse(fs.readFileSync(deployedPath, "utf8"));
  }

  const z = "0x0000000000000000000000000000000000000000";

  // Deploy Mock Tokens
  const MockToken = await ethers.getContractFactory("MockToken");

  const tokens = [
    { name: "USD Coin", symbol: "USDC", decimals: 6, key: "usdc" },
    { name: "Tether USD", symbol: "USDT", decimals: 6, key: "usdt" },
    { name: "Wrapped Ether", symbol: "WETH", decimals: 18, key: "weth" },
    { name: "Wrapped Bitcoin", symbol: "WBTC", decimals: 8, key: "wbtc" },
  ];

  for (const t of tokens) {
    if (!deployed.litvm[t.key] || deployed.litvm[t.key] === z) {
      const tok = await MockToken.connect(wallet).deploy(t.name, t.symbol, t.decimals);
      await tok.waitForDeployment();
      deployed.litvm[t.key] = await tok.getAddress();
      console.log(t.symbol + ":", deployed.litvm[t.key]);
    } else {
      console.log(t.symbol + " already deployed:", deployed.litvm[t.key]);
    }
  }

  // Deploy Factory
  const Factory = await ethers.getContractFactory("UniswapV2Factory");
  if (!deployed.litvm.factory || deployed.litvm.factory === z) {
    const factory = await Factory.connect(wallet).deploy();
    await factory.waitForDeployment();
    deployed.litvm.factory = await factory.getAddress();
    console.log("Factory:", deployed.litvm.factory);
  }

  // Deploy Router
  const Router = await ethers.getContractFactory("UniswapV2Router");
  if (!deployed.litvm.router || deployed.litvm.router === z) {
    const router = await Router.connect(wallet).deploy(deployed.litvm.factory);
    await router.waitForDeployment();
    deployed.litvm.router = await router.getAddress();
    console.log("Router:", deployed.litvm.router);
  }

  // Create USDC/WETH pair
  if (!deployed.litvm.pair || deployed.litvm.pair === z) {
    const FactoryAbi = require("../artifacts/contracts/UniswapV2Factory.sol/UniswapV2Factory.json").abi;
    const factoryContract = new ethers.Contract(deployed.litvm.factory, FactoryAbi, wallet);
    const tx = await factoryContract.createPair(deployed.litvm.usdc, deployed.litvm.weth);
    await tx.wait();
    deployed.litvm.pair = await factoryContract.getPair(deployed.litvm.usdc, deployed.litvm.weth);
    console.log("Pair USDC/WETH:", deployed.litvm.pair);
  }

  // Deploy BridgeLitVM
  const BridgeLitVM = await ethers.getContractFactory("BridgeLitVM");
  if (!deployed.litvm.bridgeLitVM || deployed.litvm.bridgeLitVM === z) {
    const bridge = await BridgeLitVM.connect(wallet).deploy(wallet.address);
    await bridge.waitForDeployment();
    deployed.litvm.bridgeLitVM = await bridge.getAddress();
    console.log("BridgeLitVM:", deployed.litvm.bridgeLitVM);
  }

  // Deploy Staking (stake LP, reward USDC)
  const Staking = await ethers.getContractFactory("Staking");
  if (!deployed.litvm.staking || deployed.litvm.staking === z) {
    const staking = await Staking.connect(wallet).deploy(deployed.litvm.pair, deployed.litvm.usdc);
    await staking.waitForDeployment();
    deployed.litvm.staking = await staking.getAddress();
    console.log("Staking:", deployed.litvm.staking);
  }

  // Keep Sepolia addresses if they exist
  if (!deployed.sepolia) deployed.sepolia = {};

  // Save
  fs.writeFileSync(deployedPath, JSON.stringify(deployed, null, 2));
  fs.writeFileSync(frontendPath, JSON.stringify(deployed, null, 2));
  console.log("\n=== ALL ADDRESSES ===");
  console.log(JSON.stringify(deployed, null, 2));
  console.log("\nSaved to deployed-addresses.json");
}

main().catch((e) => { console.error(e); process.exit(1); });
