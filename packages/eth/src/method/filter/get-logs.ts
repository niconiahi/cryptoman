import type { InferOutput } from "valibot"
import { object, parse, tuple, union } from "valibot"

import type { Http, Readable } from "@ethernauta/transport"
import { callSchema } from "@ethernauta/transport"

import {
  filterResultsSchema,
  filterSchema,
} from "../../core/filter"
import type { FilterResults } from "../../core/filter"

const parametersSchema = union([
  tuple([filterSchema]),
  object({ filter: filterSchema }),
])
type Parameters = InferOutput<typeof parametersSchema>
/**
 * @returns All logs matching filter with given id
 */
export function eth_getLogs(
  _parameters: Parameters,
): Readable<FilterResults> {
  return async (
    transports: Http[],
  ): Promise<FilterResults> => {
    const method = "eth_getLogs"
    const parameters = parse(parametersSchema, _parameters)
    const call = parse(callSchema, [method, parameters])
    const response = await Promise.any(
      transports.map((transport) => transport(call)),
    )
    if ("error" in response) {
      throw new Error(response.error.message)
    }
    const result = parse(
      filterResultsSchema,
      response.result,
    )
    return result
  }
}
