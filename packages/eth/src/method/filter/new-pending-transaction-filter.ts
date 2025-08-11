import type { Http, Readable } from "@ethernauta/transport"
import { callSchema } from "@ethernauta/transport"
import { parse } from "valibot"
import type { Uint } from "../../core/base"
import { uintSchema } from "../../core/base"

/**
 * @returns The created block filter's identifier
 */
export function eth_newPendingTransactionFilter(): Readable<Uint> {
  return async (transports: Http[]): Promise<Uint> => {
    const method = "eth_newPendingTransactionFilter"
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
