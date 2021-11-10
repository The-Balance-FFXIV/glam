export const createBodyField = () => ({
  label: 'Body',
  name: 'body',
  widget: 'markdown',
});

export const createThumbnailField = () => ({
  label: 'Card Header Image',
  name: 'card_header_image',
  widget: 'image',
  choose_url: false,
  required: false,
});

export const createAuthorsField = () => ({
  label: 'Author(s)',
  name: 'authors',
  widget: 'relation',
  multiple: true,
  collection: 'author-profile',
  search_fields: [
    'username',
    'name',
  ],
  value_field: 'username',
  display_fields: [
    'username',
    'name',
  ],
});

export const createLastUpdatedField = () => ({
  label: 'Last Updated',
  name: 'lastmod',
  widget: 'datetime',
  date_format: 'YYYY-MM-DD',
  time_format: false,
});

export const createPatchField = () => ({
  label: 'Patch',
  name: 'patch',
  widget: 'string',
});

export const createChangelogField = () => ({
  label: 'Changelog entry',
  name: 'changelog',
  widget: 'list',
  summary: '{{fields.date}}: {{fields.message}}',
  fields: [
    {
      label: 'Date',
      name: 'date',
      widget: 'datetime',
      date_format: 'YYYY-MM-DD',
      time_format: false,
    },
    {
      label: 'Message',
      name: 'message',
      widget: 'string',
    },
  ],
});

export const createStaticLayoutField = (layout) => ({
  label: 'Layout',
  name: 'layout',
  widget: 'select',
  options: [layout],
  default: [layout],
});
