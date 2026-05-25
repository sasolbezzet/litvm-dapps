# LitVM DeFi DApp

Platform DeFi lengkap di LitVM testnet — AMM Swap, Liquidity, Bridge (LitVM ↔ Sepolia), Staking.

## Arsitektur

```
litvm-dapps/
├── contracts/          # Solidity smart contracts
│   ├── MockToken.sol         # USDC, USDT, WETH, WBTC
│   ├── UniswapV2Factory.sol  # AMM Factory
│   ├── UniswapV2Pair.sol     # AMM Pair
│   ├── UniswapV2Router.sol   # AMM Router
│   ├── BridgeLitVM.sol       # Bridge on LitVM
│   ├── BridgeSepolia.sol     # Bridge on Sepolia
│   └── Staking.sol           # LP staking → USDC rewards
├── scripts/
│   └── deploy.js             # Deploy ke LitVM + Sepolia
├── frontend/                 # Next.js + RainbowKit
└── hardhat.config.js
```

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/sasolbezzet/litvm-dapps.git
cd litvm-dapps

# Install Hardhat deps
npm install

# Install Frontend deps
cd frontend && npm install && cd ..
```

### 2. Konfigurasi Private Key

```bash
cp .env.example .env
```

Edit `.env`:
```
PRIVATE_KEY=private_key_litvm_anda
SEPOLIA_PRIVATE_KEY=private_key_sepolia_anda
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

### 3. Deploy Smart Contracts

```bash
npx hardhat run scripts/deploy.js --network litvm
```

Addresses tersimpan di `deployed-addresses.json` (symlink ke `frontend/deployed-addresses.json`).

### 4. Build & Deploy Frontend

```bash
cd frontend
npm run build
```

Output statis di `frontend/out/`. Deploy ke GitHub Pages atau static hosting.

## Jaringan

| Network | RPC | Chain ID | Native Token |
|---------|-----|----------|-------------|
| LitVM Testnet | https://litvm-devnet.rpc.caldera.xyz/ | 840027 | zkLTC |
| Sepolia | https://eth-sepolia.g.alchemy.com/v2/demo | 11155111 | ETH |

## Bridge Manual

### LitVM → Sepolia
1. Approve token ke BridgeLitVM
2. Panggil `lock(token, amount, recipient)` di BridgeLitVM
3. Relayer memanggil `mint(token, amount, recipient, lockTxHash)` di BridgeSepolia

### Sepolia → LitVM
1. Approve token ke BridgeSepolia
2. Panggil `burn(token, amount, recipient)` di BridgeSepolia
3. Relayer memanggil `release(token, amount, recipient)` di BridgeLitVM

## Kontrak di LitVM Testnet

| Kontrak | Address |
|---------|---------|
| USDC | lihat `deployed-addresses.json` |
| USDT | lihat `deployed-addresses.json` |
| WETH | lihat `deployed-addresses.json` |
| WBTC | lihat `deployed-addresses.json` |
| Factory | lihat `deployed-addresses.json` |
| Router | lihat `deployed-addresses.json` |
| BridgeLitVM | lihat `deployed-addresses.json` |
| Staking | lihat `deployed-addresses.json` |

## Tech Stack

- **Smart Contracts:** Solidity 0.8.20, Hardhat, OpenZeppelin
- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Web3:** Wagmi v2, Viem, RainbowKit
