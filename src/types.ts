import type { EnvValue, validators } from './validators/index.js'

/**
 * Schema defined by the user
 */
export type RecordViteKeys<T> = Record<`${string}_${string}`, T>

/**
 * Options that can be passed to the plugin
 * The schema can be defined at the top level.
 */
export type PluginOptions = Schema | FullPluginOptions

type Validators = typeof validators

type ValidatorKeys = keyof Validators

export type FullPluginOptions = {
  [K in ValidatorKeys]: { validator: K; schema: Parameters<Validators[K]>[2] }
}[ValidatorKeys] & { debug?: boolean; configFile?: string }

export type Schema = Parameters<Validators[ValidatorKeys]>[2]

/**
 * Infer the schema type from the plugin options
 */
type EnvSchema<UserOptions extends PluginOptions> = UserOptions extends { schema: infer T }
  ? T
  : UserOptions

/**
 * Augment the import.meta.env object with the values returned by the schema validator
 */
export type ImportMetaEnvAugmented<UserOptions extends PluginOptions> = {
  [K in keyof EnvSchema<UserOptions>]: EnvValue<EnvSchema<UserOptions>[K]>
}
