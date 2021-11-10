export const createRoleMetaSlider = () => ({
  label: 'Role metadata',
  name: 'role-data',
  folder: 'data/roles/',
  format: 'json',
  identifier_field: 'name',
  create: true,
  fields: [
    {
      label: 'Short Name',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Role Name',
      name: 'name',
      widget: 'string',
    },
    {
      label: 'Display Order',
      name: 'order',
      widget: 'number',
    },
    {
      label: 'Color',
      name: 'color',
      widget: 'color',
    },
    {
      label: 'Icon',
      name: 'icon',
      widget: 'string',
    },
    {
      label: 'Link',
      name: 'role_link',
      widget: 'string',
    },
    {
      label: 'Description',
      name: 'role_text_md',
      widget: 'markdown',
    },
    {
      label: 'Job Information',
      name: 'jobs',
      widget: 'list',
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
        },
        {
          label: 'Link',
          name: 'job_link',
          widget: 'string',
        },
        {
          label: 'Icon',
          name: 'icon',
          widget: 'string',
        },
      ],
    },
  ],
});
