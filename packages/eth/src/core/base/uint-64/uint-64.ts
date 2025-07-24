import type { InferOutput } from "valibot"
import { custom } from "valibot"

function isUint64(input: unknown): boolean {
  return typeof input === "string" && /^0x([1-9a-f]+[0-9a-f]{0,15})|0$/.test(input)
}
export const uint64Schema = custom<`0x${string}`>(isUint64)
export type Uint64 = InferOutput<typeof uint64Schema>
