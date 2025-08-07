// biome-ignore-all lint: disable Biome linting for this file
import type { Chain } from "../shared"

export const eip155_206 = {
  name: "VinuChain Testnet",
  shortName: "VCTEST",
  chain: "VinuChain Testnet",
  icon: "vitainu-testnet",
  rpc: ["https://vinufoundation-rpc.com"],
  faucets: [],
  nativeCurrency: {
    name: "VinuChain",
    symbol: "VC",
    decimals: 18,
  },
  infoURL: "https://vitainu.org",
  chainId: 206,
  networkId: 206,
  slip44: 1,
  explorers: [
    {
      name: "VinuScan Testnet",
      url: "https://testnet.vinuscan.com",
      standard: "none",
    },
  ],
} satisfies Chain
