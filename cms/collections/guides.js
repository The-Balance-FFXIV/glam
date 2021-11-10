export const createGuidesCollection = (folderPrefix = '') => ({
  name: 'guides',
  label: 'guide',
  description: 'General Guides',
  folder: `${folderPrefix}content/guide`,
  create: true,
  slug: '{{slug}}',
  preview_path: 'guide/{{slug}}',
  editor: {
    preview: true,
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Body',
      name: 'body',
      widget: 'markdown',
    },
  ],
});
