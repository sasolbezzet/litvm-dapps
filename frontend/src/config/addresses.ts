export const ADDR = {
  litvm: {
    usdc: "0xaaa101d72680F5aB9222431d4b3936Bb9a77702e",
    usdt: "0x9cA225DE592ac8060e5DCd7cf235aE778df11e32",
    weth: "0xeF271adC5ef13205118e4d90Ad4A7013b528927E",
    wbtc: "0x0ef67FfBfF7Da1c9792De292D8e3c73d3E0ed3a9",
    factory: "0x011646182FB03a91c237a6365CAa81a9BbbAcB45",
    router: "0xB371068e32249ef14b396ECd7a3083A00A72dfA0",
    pair: "0x0E6b86CA0D75333eb2Ac7f4f6b892a9DcE1a80b0",
    bridgeLitVM: "0xd9Fe5b8473cC2B208023D7753b2b9bD206937e9C",
    staking: "0xD3c18dB42Fb5Be0d419CF68c2e30FCD408bDA627",
  },
  sepolia: {
    bridgeSepolia: "0xc95f495e6f30DD7a0B08427033241a545AE37685",
    usdc: "0xEa85F775aa75EDdD89BEEFAcAedaaeA71d557c74",
    usdt: "0xa9993FC305815386815613281Ebd59efB73A70F7",
  },
} as const;

export const TOKENS = [
  { symbol: "USDC", address: ADDR.litvm.usdc, decimals: 6, price: 1 },
  { symbol: "USDT", address: ADDR.litvm.usdt, decimals: 6, price: 1 },
  { symbol: "WETH", address: ADDR.litvm.weth, decimals: 18, price: 3500 },
  { symbol: "WBTC", address: ADDR.litvm.wbtc, decimals: 8, price: 60000 },
  { symbol: "zkLTC", address: "0x0000000000000000000000000000000000000000", decimals: 18, price: 0.01, native: true },
] as const;

export const SEPOLIA_TOKENS = [
  { symbol: "USDC", address: ADDR.sepolia.usdc, decimals: 6, price: 1 },
  { symbol: "USDT", address: ADDR.sepolia.usdt, decimals: 6, price: 1 },
] as const;
