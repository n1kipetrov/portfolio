import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      type: 'string',
      title: 'English',
    }),
    defineField({
      name: 'ru',
      type: 'string',
      title: 'Russian',
    }),
  ],
});
