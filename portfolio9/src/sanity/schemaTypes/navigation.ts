import { defineType, defineField } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
      title: 'Key',
    }),
    defineField({
      name: 'label',
      type: 'localeString',
      title: 'Label',
    }),
  ],
});
