const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [litvmDeployer] = await hre.ethers.getSigners();
  console.log("Deploying to LitVM with:", litvmDeployer.address);

  // 1. Deploy Mock Tokens
  const MockToken = await hre.ethers.getContractFactory("MockToken");
  const usdc = await MockToken.deploy("USD Coin", "USDC", 6);
  await usdc.waitForDeployment();
  console.log("USDC:", await usdc.getAddress());

  const usdt = await MockToken.deploy("Tether USD", "USDT", 6);
  await usdt.waitForDeployment();
  console.log("USDT:", await usdt.getAddress());

  const weth = await MockToken.deploy("Wrapped Ether", "WETH", 18);
  await weth.waitForDeployment();
  console.log("WETH:", await weth.getAddress());

  const wbtc = await MockToken.deploy("Wrapped Bitcoin", "WBTC", 8);
  await wbtc.waitForDeployment();
  console.log("WBTC:", await wbtc.getAddress());

  // 2. Deploy Factory
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();
  console.log("Factory:", await factory.getAddress());

  // 3. Deploy Router
  const Router = await hre.ethers.getContractFactory("UniswapV2Router");
  const router = await Router.deploy(await factory.getAddress());
  await router.waitForDeployment();
  console.log("Router:", await router.getAddress());

  // 4. Create USDC/zkLTC pair (zkLTC is native, use WETH as proxy)
  await factory.createPair(await usdc.getAddress(), await weth.getAddress());
  console.log("Pair USDC/WETH created");

  // 5. Deploy BridgeLitVM
  const BridgeLitVM = await hre.ethers.getContractFactory("BridgeLitVM");
  const bridgeLitVM = await BridgeLitVM.deploy(litvmDeployer.address);
  await bridgeLitVM.waitForDeployment();
  console.log("BridgeLitVM:", await bridgeLitVM.getAddress());

  // 6. Deploy Staking (stake LP token, reward USDC)
  const pairAddr = await factory.getPair(await usdc.getAddress(), await weth.getAddress());
  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(pairAddr, await usdc.getAddress());
  await staking.waitForDeployment();
  console.log("Staking:", await staking.getAddress());

  // Save LitVM addresses
  const litvmAddrs = {
    usdc: await usdc.getAddress(),
    usdt: await usdt.getAddress(),
    weth: await weth.getAddress(),
    wbtc: await wbtc.getAddress(),
    factory: await factory.getAddress(),
    router: await router.getAddress(),
    pair: pairAddr,
    bridgeLitVM: await bridgeLitVM.getAddress(),
    staking: await staking.getAddress(),
  };

  // 7. Deploy to Sepolia
  console.log("\n--- Deploying to Sepolia ---");
  const sepoliaProvider = new hre.ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/demo"
  );
  const sepoliaWallet = new hre.ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, sepoliaProvider);
  console.log("Sepolia deployer:", sepoliaWallet.address);

  const BridgeSepolia = await hre.ethers.getContractFactory("BridgeSepolia");
  const bridgeSepoliaFactory = new hre.ethers.ContractFactory(
    BridgeSepolia.interface,
    BridgeSepolia.bytecode,
    sepoliaWallet
  );
  const bridgeSepolia = await bridgeSepoliaFactory.deploy(sepoliaWallet.address);
  await bridgeSepolia.waitForDeployment();
  console.log("BridgeSepolia:", await bridgeSepolia.getAddress());

  // Deploy mock tokens on Sepolia for the bridge
  const MockTokenSepolia = new hre.ethers.ContractFactory(
    MockToken.interface,
    MockToken.bytecode,
    sepoliaWallet
  );
  const sepUSDC = await MockTokenSepolia.deploy("USD Coin", "USDC", 6);
  await sepUSDC.waitForDeployment();
  const sepUSDT = await MockTokenSepolia.deploy("Tether USD", "USDT", 6);
  await sepUSDT.waitForDeployment();

  // Register tokens on bridge
  await bridgeSepolia.addSupportedToken(await sepUSDC.getAddress());
  await bridgeSepolia.addSupportedToken(await sepUSDT.getAddress());

  const sepoliaAddrs = {
    bridgeSepolia: await bridgeSepolia.getAddress(),
    usdc: await sepUSDC.getAddress(),
    usdt: await sepUSDT.getAddress(),
  };

  // Write addresses
  const output = { litvm: litvmAddrs, sepolia: sepoliaAddrs };
  fs.writeFileSync(
    path.join(__dirname, "..", "deployed-addresses.json"),
    JSON.stringify(output, null, 2)
  );
  console.log("\nAddresses saved to deployed-addresses.json");
  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
