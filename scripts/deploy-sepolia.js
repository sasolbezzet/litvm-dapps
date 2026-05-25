const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/demo"
  );
  const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
  console.log("Deploying to Sepolia with:", wallet.address);

  const deployedPath = path.join(__dirname, "..", "deployed-addresses.json");
  let deployed = { litvm: {}, sepolia: {} };
  if (fs.existsSync(deployedPath)) {
    deployed = JSON.parse(fs.readFileSync(deployedPath, "utf8"));
  }

  // Deploy BridgeSepolia if not already deployed
  let bridgeAddr = deployed.sepolia?.bridgeSepolia;
  if (!bridgeAddr || bridgeAddr === "0x0000000000000000000000000000000000000000") {
    const BridgeSepolia = await ethers.getContractFactory("BridgeSepolia");
    const bridge = await BridgeSepolia.connect(wallet).deploy(wallet.address);
    await bridge.waitForDeployment();
    bridgeAddr = await bridge.getAddress();
    console.log("BridgeSepolia:", bridgeAddr);
  } else {
    console.log("BridgeSepolia already at:", bridgeAddr);
  }

  // Deploy mock tokens
  const MockToken = await ethers.getContractFactory("MockToken");
  let usdcAddr = deployed.sepolia?.usdc;
  if (!usdcAddr || usdcAddr === "0x0000000000000000000000000000000000000000") {
    const usdc = await MockToken.connect(wallet).deploy("USD Coin", "USDC", 6);
    await usdc.waitForDeployment();
    usdcAddr = await usdc.getAddress();
    console.log("Sepolia USDC:", usdcAddr);
  } else {
    console.log("USDC already at:", usdcAddr);
  }

  let usdtAddr = deployed.sepolia?.usdt;
  if (!usdtAddr || usdtAddr === "0x0000000000000000000000000000000000000000") {
    const usdt = await MockToken.connect(wallet).deploy("Tether USD", "USDT", 6);
    await usdt.waitForDeployment();
    usdtAddr = await usdt.getAddress();
    console.log("Sepolia USDT:", usdtAddr);
  } else {
    console.log("USDT already at:", usdtAddr);
  }

  // Register tokens on bridge
  const BridgeSepoliaAbi = require("../artifacts/contracts/BridgeSepolia.sol/BridgeSepolia.json").abi;
  const bridgeContract = new ethers.Contract(bridgeAddr, BridgeSepoliaAbi, wallet);
  
  const tx1 = await bridgeContract.addSupportedToken(usdcAddr);
  await tx1.wait();
  console.log("USDC registered on bridge");
  
  const tx2 = await bridgeContract.addSupportedToken(usdtAddr);
  await tx2.wait();
  console.log("USDT registered on bridge");

  deployed.sepolia = { bridgeSepolia: bridgeAddr, usdc: usdcAddr, usdt: usdtAddr };
  fs.writeFileSync(deployedPath, JSON.stringify(deployed, null, 2));

  // Also update frontend copy
  const frontendPath = path.join(__dirname, "..", "frontend", "deployed-addresses.json");
  fs.writeFileSync(frontendPath, JSON.stringify(deployed, null, 2));

  console.log("\nDeployed addresses:");
  console.log(JSON.stringify(deployed, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
