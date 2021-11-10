import { roles } from '../roles';

const createRoleLandingPage = (role, folderPrefix) => ({
  label: role.name,
  name: role.name.toLowerCase(),
  file: `${folderPrefix}content/jobs/${role.name.toLowerCase()}/_index.md`,
  fields: [
    {
      label: 'Body',
      name: 'body',
      widget: 'markdown',
    },
    {
      label: 'Menu hierarchy',
      name: 'menu',
      widget: 'hidden',
      default: {
        main: {
          name: role.name,
          parent: 'jobs',
        },
      },
    },
    {
      label: 'Role',
      name: 'role',
      widget: 'select',
      options: [role.name.toLowerCase()],
      default: [role.name.toLowerCase()],
    },
    {
      label: 'Ressources Background Image',
      name: 'resources_background_image',
      widget: 'image',
      choose_url: false,
    },
  ],
});

export const createRoleLandingPageCollection = (folderPrefix = '') => ({
  label: 'Role landing pages',
  name: 'role-landing',
  files: Object.values(roles).map((role) => createRoleLandingPage(role, folderPrefix)),
});
