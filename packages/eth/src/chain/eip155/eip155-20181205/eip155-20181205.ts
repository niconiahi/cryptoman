/* eslint no-template-curly-in-string: 0 */
import type { Chain } from "../../shared"

export const eip155_20181205 = {
  "name": "quarkblockchain",
  "shortName": "qki",
  "chain": "QKI",
  "rpc": [
    "https://hz.rpc.qkiscan.cn",
    "https://jp.rpc.qkiscan.io",
    "https://rpc1.qkiscan.io",
    "https://rpc2.qkiscan.io",
    "https://rpc3.qkiscan.io"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "quarkblockchain Native Token",
    "symbol": "QKI",
    "decimals": 18
  },
  "infoURL": "https://quarkblockchain.org/",
  "chainId": 20181205,
  "networkId": 20181205,
  "explorers": [
    {
      "name": "qkiscan",
      "url": "https://qkiscan.io",
      "standard": "EIP3091"
    }
  ]
} satisfies Chain