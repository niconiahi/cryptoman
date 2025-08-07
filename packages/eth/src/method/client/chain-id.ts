import { parse } from "valibot"

import type { Http, Readable } from "@cryptoman/transport"
import { callSchema } from "@cryptoman/transport"

import { uintSchema } from "../../core/base"
import type { Uint } from "../../core/base"

export function eth_chainId(): Readable<Uint> {
  return async (transports: Http[]): Promise<Uint> => {
    const method = "eth_chainId"
    const call = parse(callSchema, [method])
    const response = await Promise.any(
      transports.map((transport) => transport(call)),
    )
    if ("error" in response) {
      throw new Error(response.error.message)
    }
    const result = parse(uintSchema, response.result)
    return result
  }
}
