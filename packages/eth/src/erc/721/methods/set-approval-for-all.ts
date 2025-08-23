import type { Address } from "@ethernauta/eth"
import { addressSchema } from "@ethernauta/eth"
import type { Http, Readable } from "@ethernauta/transport"
import { callSchema } from "@ethernauta/transport"
import type { InferOutput } from "valibot"
import {
  boolean,
  object,
  parse,
  tuple,
  union,
} from "valibot"

const parametersSchema = union([
  tuple([addressSchema, boolean()]),
  object({
    operator: addressSchema,
    approved: boolean(),
  }),
])
type Parameters = InferOutput<typeof parametersSchema>
export function setApprovalForAll(
  _parameters: Parameters,
): Readable<Address> {
  return async (transports: Http[]): Promise<Address> => {
    const method = "setApprovalForAll"
    const parameters = parse(parametersSchema, _parameters)
    const call = parse(callSchema, [method, parameters])
    const response = await Promise.any(
      transports.map((transport) => transport(call)),
    )
    if ("error" in response) {
      throw new Error(response.error.message)
    }
    const result = parse(
      union([addressSchema]),
      response.result,
    )
    return result
  }
}
