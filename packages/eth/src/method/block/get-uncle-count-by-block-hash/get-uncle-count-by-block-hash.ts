import type { InferOutput } from "valibot"
import { object, parse, tuple, union } from "valibot"

import type { Http, Readable } from "@cryptoman/transport"
import { callSchema } from "@cryptoman/transport"

import type { NotFound, Uint } from "../../../core/base"
import { hash32Schema, notFoundSchema, uintSchema } from "../../../core/base"

const parametersSchema = union([
  tuple([hash32Schema]),
  object({ blockHash: hash32Schema }),
])
type Parameters = InferOutput<typeof parametersSchema>
export function eth_getUncleCountByBlockHash(_parameters: Parameters): Readable<Uint | NotFound> {
  return async (transports: Http[]): Promise<Uint | NotFound> => {
    const method = "eth_getUncleCountByBlockHash"
    const parameters = parse(parametersSchema, _parameters)
    const call = parse(callSchema, [method, parameters])
    const response = await Promise.any(
      transports.map(transport => transport(call)),
    )
    if ("error" in response) {
      throw new Error(response.error.message)
    }
    const result = parse(union([uintSchema, notFoundSchema]), response.result)
    return result
  }
}
