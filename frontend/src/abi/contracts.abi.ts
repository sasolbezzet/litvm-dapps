export const FACTORY_ABI = [
  "function getPair(address,address) view returns (address)",
  "function allPairs(uint256) view returns (address)",
  "function allPairsLength() view returns (uint256)",
] as const;

export const PAIR_ABI = [
  "function getReserves() view returns (uint112,uint112,uint32)",
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function token0() view returns (address)",
  "function token1() view returns (address)",
] as const;

export const BRIDGE_LITVM_ABI = [
  "function lock(address,uint256,address)",
  "function release(address,uint256,address)",
  "event Locked(address indexed token, address indexed sender, uint256 amount, address recipient)",
] as const;

export const BRIDGE_SEPOLIA_ABI = [
  "function mint(address,uint256,address,bytes32)",
  "function burn(address,uint256,address)",
  "event Burned(address indexed token, address indexed sender, uint256 amount, address recipient)",
] as const;

export const STAKING_ABI = [
  "function stake(uint256)",
  "function unstake(uint256)",
  "function claimReward()",
  "function earned(address) view returns (uint256)",
  "function stakes(address) view returns (uint256)",
  "function rewardRate() view returns (uint256)",
  "function totalStaked() view returns (uint256)",
] as const;
