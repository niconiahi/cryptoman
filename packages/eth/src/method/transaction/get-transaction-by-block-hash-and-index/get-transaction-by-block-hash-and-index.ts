import type { InferOutput } from "valibot"
import { object, parse, tuple, union } from "valibot"

import type { Http, Readable } from "@cryptoman/transport"
import { callSchema } from "@cryptoman/transport"

import {
  Hash32Schema,
  notFoundSchema,
  uintSchema,
} from "../../../core/base"
import type { NotFound } from "../../../core/base"
import { transactionInfoSchema } from "../../../core/transaction"
import type { TransactionInfo } from "../../../core/transaction"

const parametersSchema = union([
  tuple([Hash32Schema, uintSchema]),
  object({
    blockHash: Hash32Schema,
    transactionIndex: uintSchema,
  }),
])
type Parameters = InferOutput<typeof parametersSchema>
/**
 * @returns Transaction information or null if not found
 */
export function eth_getTransactionByBlockHashAndIndex(
  _parameters: Parameters,
): Readable<TransactionInfo | NotFound> {
  return async (
    transports: Http[],
  ): Promise<TransactionInfo | NotFound> => {
    const method = "eth_getTransactionByBlockHashAndIndex"
    const parameters = parse(parametersSchema, _parameters)
    const call = parse(callSchema, [method, parameters])
    const response = await Promise.any(
      transports.map((transport) => transport(call)),
    )
    if ("error" in response) {
      throw new Error(response.error.message)
    }
    const result = parse(
      union([transactionInfoSchema, notFoundSchema]),
      response.result,
    )
    return result
  }
}
