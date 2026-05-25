import deployed from "../../deployed-addresses.json";

export const LITVM_CHAIN_ID = 840027;
export const SEPOLIA_CHAIN_ID = 11155111;

export const LITVM_RPC = "https://litvm-devnet.rpc.caldera.xyz/";
export const SEPOLIA_RPC = "https://eth-sepolia.g.alchemy.com/v2/demo";

export const ADDRESSES = deployed;

export const TOKEN_LIST = [
  { symbol: "USDC", address: deployed.litvm.usdc, decimals: 6 },
  { symbol: "USDT", address: deployed.litvm.usdt, decimals: 6 },
  { symbol: "WETH", address: deployed.litvm.weth, decimals: 18 },
  { symbol: "WBTC", address: deployed.litvm.wbtc, decimals: 8 },
];

export const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function approve(address, uint256) returns (bool)",
  "function allowance(address, address) view returns (uint256)",
  "function transfer(address, uint256) returns (bool)",
  "function symbol() view returns (string)",
];

export const ROUTER_ABI = [
  "function swapExactTokensForTokens(uint256,uint256,address[],address,uint256) returns (uint256[])",
  "function addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256) returns (uint256,uint256,uint256)",
  "function removeLiquidity(address,address,uint256,uint256,uint256,address,uint256) returns (uint256,uint256)",
  "function factory() view returns (address)",
];

export const FACTORY_ABI = [
  "function getPair(address,address) view returns (address)",
];

export const PAIR_ABI = [
  "function getReserves() view returns (uint112,uint112,uint32)",
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function approve(address,uint256) returns (bool)",
  "function allowance(address,address) view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

export const STAKING_ABI = [
  "function stake(uint256)",
  "function withdraw(uint256)",
  "function claimReward()",
  "function earned(address) view returns (uint256)",
  "function stakes(address) view returns (uint256)",
  "function stakingToken() view returns (address)",
  "function rewardToken() view returns (address)",
];

export const BRIDGE_LITVM_ABI = [
  "function lock(address,uint256,address)",
  "function release(address,uint256,address)",
];

export const BRIDGE_SEPOLIA_ABI = [
  "function mint(address,uint256,address,bytes32)",
  "function burn(address,uint256,address)",
];
