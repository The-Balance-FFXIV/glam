export const createAuthorCollection = (folderPrefix = '') => ({
  label: 'Author profile',
  name: 'author-profile',
  folder: `${folderPrefix}data/author/`,
  format: 'json',
  identifier_field: 'username',
  media_folder: '/static/img/profile',
  public_folder: '/img/profile',
  create: true,
  fields: [
    {
      label: 'Username',
      name: 'username',
      widget: 'string',
    },
    {
      label: 'Profile Image',
      name: 'image',
      widget: 'image',
      choose_url: false,
    },
    {
      label: 'Display Name',
      name: 'name',
      widget: 'string',
    },
    {
      label: 'Social information',
      name: 'socials',
      widget: 'object',
      fields: [
        {
          label: 'Discord Name',
          name: 'discord_id',
          widget: 'string',
        },
      ],
    },
  ],
});
