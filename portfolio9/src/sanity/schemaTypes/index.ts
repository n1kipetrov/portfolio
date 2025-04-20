import { type SchemaTypeDefinition } from 'sanity'
import { localeString, navigation } from '../schema-helper'

export const schema = {
  types: [
    localeString,
    navigation,
  ] as SchemaTypeDefinition[],
}
