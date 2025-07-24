import type { InferOutput } from "valibot"
import { object, parse, tuple, union } from "valibot"

import type { Http, Readable } from "@cryptoman/transport"
import { callSchema } from "@cryptoman/transport"

import { addressSchema, uintSchema } from "../../../core/base"
import type { Uint } from "../../../core/base"
import { blockNumberOrTagOrHashSchema } from "../../../core/block"

const parametersSchema = union([
  tuple([addressSchema, blockNumberOrTagOrHashSchema]),
  tuple([addressSchema]),
  object({ address: addressSchema, blockNumberOrTagOrHash: blockNumberOrTagOrHashSchema }),
  object({ address: addressSchema }),
])
type Parameters = InferOutput<typeof parametersSchema>
/**
 * @returns The number of transactions sent from an address
 */
export function eth_getTransactionCount(_parameters: Parameters): Readable<Uint> {
  return async (transports: Http[]): Promise<Uint> => {
    const method = "eth_getTransactionCount"
    const parameters = parse(parametersSchema, _parameters)
    const call = parse(callSchema, [method, parameters])
    const response = await Promise.any(
      transports.map(transport => transport(call)),
    )
    if ("error" in response) {
      throw new Error(response.error.message)
    }
    const result = parse(uintSchema, response.result)
    return result
  }
}
