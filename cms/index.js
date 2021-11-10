import CMS from 'netlify-cms-app';
import { createAuthorCollection } from './collections/authors';
import { createGuidesCollection } from './collections/guides';
import { createJobCollections } from './collections/jobs';
import { createRoleMetaSlider } from './collections/roleMetaSlider';

window.CMS_MANUAL_INIT = true;

const LOCAL_FOLDER_PREFIX = 'exampleSite/';
const IS_LOCAL_BUILD = true;

/* eslint-disable-next-line */
const createBackendConfig = (isLocalBackend = false) => {
  if (isLocalBackend) {
    return {
      local_backend: true,
      backend: {
        name: 'git-gateway',
        branch: 'main',
      },
    };
  }

  return {
    backend: {
      name: 'github',
      repo: 'The-Balance-FFXIV/balance-static',
      branch: 'main',
      base_url: 'https://auth.xivresources.com',
      site_domain: 'guides.xivresources.com',
      cms_label_prefix: 'cms/',
      publish_mode: 'editorial_workflow',
      site_url: 'https://guides.xivresources.com',
      show_preview_links: true,
    },
  };
};

CMS.init({
  config: {
    ...createBackendConfig(IS_LOCAL_BUILD),
    load_config_file: false,
    media_folder: `${IS_LOCAL_BUILD ? LOCAL_FOLDER_PREFIX : ''}static/img`,
    public_folder: '/img',
    collections: [
      createRoleMetaSlider(),
      createAuthorCollection(IS_LOCAL_BUILD ? LOCAL_FOLDER_PREFIX : ''),
      createGuidesCollection(IS_LOCAL_BUILD ? LOCAL_FOLDER_PREFIX : ''),
      ...createJobCollections(IS_LOCAL_BUILD ? LOCAL_FOLDER_PREFIX : ''),
    ],
  },
});
