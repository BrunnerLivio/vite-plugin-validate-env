import type { UI } from '../ui.js'
import { zodValidation } from './zod/index.js'
import type { RecordViteKeys } from '../types.js'
import type { ZodEnvValue } from './zod/index.js'
import { builtinValidation } from './builtin/index.js'
import { valibotValidation } from './valibot/index.js'
import type { PoppinsEnvValue } from './builtin/index.js'
import type { ValibotEnvValue } from './valibot/index.js'

type ValidatorResult = { key: string; value: any }

export type Validator = (
  ui: UI,
  env: Record<string, string>,
  schema: RecordViteKeys<any>,
) => ValidatorResult[] | Promise<ValidatorResult[]>

/**
 * List of available validators
 * Needs to be updated when a new validator is added
 */
export const validators = {
  zod: zodValidation,
  valibot: valibotValidation,
  builtin: builtinValidation,
} satisfies Record<string, Validator>

/**
 * Generic type to infer the value of the schema
 * based on the validator
 * Needs to be updated when a new validator is added
 */
export type EnvValue<Fn> = PoppinsEnvValue<Fn> | ZodEnvValue<Fn> | ValibotEnvValue<Fn>
