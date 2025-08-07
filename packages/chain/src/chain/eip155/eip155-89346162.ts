// biome-ignore-all lint: disable Biome linting for this file
import type { Chain } from "../shared"

export const eip155_89346162 = {
  name: "Reya Cronos",
  shortName: "reya-cronos",
  title: "Reya Cronos",
  chain: "reya-cronos",
  rpc: [
    "https://rpc.reya-cronos.gelato.digital",
    "wss://ws.reya-cronos.gelato.digital",
  ],
  faucets: [],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  infoURL:
    "https://raas.gelato.network/rollups/details/public/reya-cronos",
  chainId: 89346162,
  networkId: 89346162,
  slip44: 60,
  explorers: [
    {
      name: "blockscout",
      url: "https://reya-cronos.blockscout.com",
      standard: "EIP3091",
    },
  ],
  parent: {
    type: "L2",
    chain: "eip155-11155111",
    bridges: [
      {
        url: "https://bridge.gelato.network/bridge/reya-cronos",
      },
    ],
  },
} satisfies Chain
