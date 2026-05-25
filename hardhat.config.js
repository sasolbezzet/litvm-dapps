require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const LITVM_PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

if (!LITVM_PRIVATE_KEY || !SEPOLIA_PRIVATE_KEY) {
  console.error("ERROR: PRIVATE_KEY and SEPOLIA_PRIVATE_KEY must be set in .env");
  process.exit(1);
}

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    litvm: {
      url: "https://liteforge.rpc.caldera.xyz/http",
      chainId: 4441,
      accounts: [LITVM_PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/demo",
      chainId: 11155111,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
