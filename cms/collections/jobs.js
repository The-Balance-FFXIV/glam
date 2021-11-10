import {
  createAuthorsField, createBodyField, createChangelogField, createLastUpdatedField, createStaticLayoutField, createPatchField, createThumbnailField,
} from '../fields/fields';
import { roles } from '../roles';

export const jobs = [
  {
    id: 'warrior',
    label: 'Warrior guide',
    name: 'war-guide',
    role: roles.TANK,
    customFields: [],
  },
  {
    id: 'paladin',
    label: 'Paladin guide',
    name: 'pld-guide',
    role: roles.TANK,
    customFields: [],
  },
  {
    id: 'dark-knight',
    label: 'Dark Knight guide',
    name: 'drk-guide',
    role: roles.TANK,
    customFields: [],
  },
  {
    id: 'gunbreaker',
    label: 'Gunbreaker guide',
    name: 'gnb-guide',
    role: roles.TANK,
    customFields: [],
  },
  {
    id: 'white-mage',
    label: 'White Mage guide',
    name: 'whm-guide',
    role: roles.HEALER,
    customFields: [],
  },
  {
    id: 'scholar',
    label: 'Scholar guide',
    name: 'sch-guide',
    role: roles.HEALER,
    customFields: [],
  },
  {
    id: 'astrologian',
    label: 'Astrologian guide',
    name: 'ast-guide',
    role: roles.HEALER,
    customFields: [],
  },
  {
    id: 'sage',
    label: 'Sage guide',
    name: 'sge-guide',
    role: roles.HEALER,
    customFields: [],
  },
  {
    id: 'dragoon',
    label: 'Dragoon guide',
    name: 'drg-guide',
    role: roles.MELEE,
    customFields: [],
  },
  {
    id: 'reaper',
    label: 'Reaper guide',
    name: 'rpr-guide',
    role: roles.MELEE,
    customFields: [],
  },
  {
    id: 'samurai',
    label: 'Samurai guide',
    name: 'sam-guide',
    role: roles.MELEE,
    customFields: [],
  },
  {
    id: 'monk',
    label: 'Monk guide',
    name: 'mnk-guide',
    role: roles.MELEE,
    customFields: [],
  },
  {
    id: 'ninja',
    label: 'Ninja guide',
    name: 'nin-guide',
    role: roles.MELEE,
    customFields: [],
  },
  {
    id: 'dancer',
    label: 'Dancer guide',
    name: 'dnc-guide',
    role: roles.RANGED,
    customFields: [],
  },
  {
    id: 'machinist',
    label: 'Machinist guide',
    name: 'mch-guide',
    role: roles.RANGED,
    customFields: [],
  },
  {
    id: 'bard',
    label: 'Bard guide',
    name: 'brd-guide',
    role: roles.RANGED,
    customFields: [],
  },
  {
    id: 'black-mage',
    label: 'Black Mage guide',
    name: 'blm-guide',
    role: roles.CASTER,
    customFields: [],
  },
  {
    id: 'summoner',
    label: 'Summoner guide',
    name: 'smn-guide',
    role: roles.CASTER,
    customFields: [],
  },
  {
    id: 'red-mage',
    label: 'Red Mage guide',
    name: 'rdm-guide',
    role: roles.CASTER,
    customFields: [],
  },
];

const getPathForJob = (job) => `content/jobs/${job.role.name.toLowerCase()}/${job.id}`;

const createLandingPage = (job, folderPrefix) => ({
  label: 'Landing page',
  name: 'landing',
  file: `${folderPrefix}${getPathForJob(job)}/_index.md`,
  fields: [
    createBodyField(),
    { label: 'Job Name', name: 'job_name', widget: 'string' },
    {
      label: 'Header Image',
      name: 'header_image',
      widget: 'image',
      choose_url: false,
    },
    {
      label: 'Leveling Guide Image',
      name: 'leveling_guide_image',
      widget: 'image',
      choose_url: false,
      required: false,
    },
    {
      label: 'Basic Guide Image',
      name: 'basic_guide_image',
      widget: 'image',
      choose_url: false,
      required: false,
    },
    {
      label: 'Advanced Guide Image',
      name: 'advanced_guide_image',
      widget: 'image',
      choose_url: false,
      required: false,
    },
    {
      label: 'Fight Tips Image',
      name: 'fight_tips_image',
      widget: 'image',
      choose_url: false,
      required: false,
    },
    {
      label: 'Resources Image',
      name: 'resources_image',
      widget: 'image',
      choose_url: false,
      required: false,
    },
  ],
});

const createLevelingGuide = (job, folderPrefix) => ({
  label: 'Leveling Guide',
  name: 'leveling-guide',
  file: `${folderPrefix}${getPathForJob(job)}/leveling-guide.md`,
  fields: [
    createBodyField(),
    createThumbnailField(),
    createAuthorsField(),
    createPatchField(),
    createLastUpdatedField(),
    createChangelogField(),
  ],
});

const createBasicGuide = (job, folderPrefix) => ({
  label: 'Basic guide',
  name: 'basic-guide',
  file: `${folderPrefix}${getPathForJob(job)}/basic-guide.md`,
  fields: [
    createBodyField(),
    createThumbnailField(),
    createAuthorsField(),
    createPatchField(),
    createLastUpdatedField(),
    createChangelogField(),
  ],
});

const createSkillsOverview = (job, folderPrefix) => ({
  label: 'Skills overview',
  name: 'skills-overview',
  file: `${folderPrefix}${getPathForJob(job)}/skills-overview.md`,
  fields: [
    createBodyField(),
    createThumbnailField(),
    createAuthorsField(),
    createPatchField(),
    createLastUpdatedField(),
    createChangelogField(),
  ],
});

const createOpeners = (job, folderPrefix) => ({
  label: 'Openers',
  name: 'openers',
  file: `${folderPrefix}${getPathForJob(job)}/openers.md`,
  fields: [
    createBodyField(),
    createThumbnailField(),
    createAuthorsField(),
    createPatchField(),
    createLastUpdatedField(),
    createChangelogField(),
  ],
});

const createFAQ = (job, folderPrefix) => ({
  label: 'Frequently Asked Questions',
  name: 'faq',
  file: `${folderPrefix}${getPathForJob(job)}/faq.md`,
  fields: [
    createPatchField(),
    createLastUpdatedField(),
    createThumbnailField(),
    createAuthorsField(),
    createChangelogField(),
    {
      label: 'FAQ Entry',
      name: 'qna',
      widget: 'list',
      summary: '{{fields.question}}: {{fields.answer}}',
      fields: [
        {
          label: 'Question',
          name: 'question',
          widget: 'string',
        },
        {
          label: 'Answer',
          name: 'answer',
          widget: 'markdown',
        },
      ],
    },
    createStaticLayoutField('qna'),
  ],
});

const createAdvancedGuide = (job, folderPrefix) => ({
  label: 'Advanced guide',
  name: 'advanced-guide',
  file: `${folderPrefix}${getPathForJob(job)}/advanced-guide.md`,
  fields: [
    createBodyField(),
    createThumbnailField(),
    createAuthorsField(),
    createPatchField(),
    createLastUpdatedField(),
    createChangelogField(),
  ],
});

const createBestInSlot = (job, folderPrefix) => ({
  label: 'Best in Slot',
  name: 'bis',
  file: `${folderPrefix}${getPathForJob(job)}/best-in-slot.md`,
  fields: [
    createPatchField(),
    createThumbnailField(),
    createAuthorsField(),
    createLastUpdatedField(),
    createChangelogField(),
    {
      label: 'Sets',
      name: 'bis',
      widget: 'list',
      summary: '{{fields.name}}',
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          widget: 'select',
          options: [
            'etro',
          ],
          default: 'etro',
        },
        {
          label: 'Link',
          name: 'link',
          widget: 'string',
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'markdown',
          required: false,
          default: '',
        },
      ],
    },
    createStaticLayoutField('bis'),
  ],
});

const createStatPriority = (job, folderPrefix) => ({
  label: 'Stat Priority',
  name: 'stat-priority',
  file: `${folderPrefix}${getPathForJob(job)}/stat-priority.md`,
  fields: [
    createPatchField(),
    createThumbnailField(),
    createAuthorsField(),
    createLastUpdatedField(),
    createChangelogField(),
    {
      label: 'Priority',
      name: 'priority',
      widget: 'string',
    },
  ],
});

const createJobChanges = (job, folderPrefix) => ({
  label: 'Job Changes',
  name: 'job-changes',
  file: `${folderPrefix}${getPathForJob(job)}/job-changes.md`,
  fields: [
    createThumbnailField(),
    {
      label: 'Change',
      name: 'changes',
      widget: 'list',
      summary: '{{fields.patch}}',
      fields: [
        {
          label: 'Patch',
          name: 'patch',
          widget: 'string',
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'markdown',
        },
      ],
    },
    createStaticLayoutField('changes'),
  ],
});

const createFightTips = (job, folderPrefix) => ({
  label: 'Fight tips',
  name: 'fight-tips',
  file: `${folderPrefix}${getPathForJob(job)}/fight-tips.md`,
  fields: [
    createBodyField(),
    createThumbnailField(),
    createAuthorsField(),
    createPatchField(),
    createLastUpdatedField(),
    createChangelogField(),
  ],
});

const createJobCollection = (job, folderPrefix) => ({
  label: job.label,
  name: job.name,
  media_folder: `/${folderPrefix}static/img/jobs`,
  public_folder: '/img/jobs',
  files: [
    createLandingPage(job, folderPrefix),
    createLevelingGuide(job, folderPrefix),
    createBasicGuide(job, folderPrefix),
    createSkillsOverview(job, folderPrefix),
    createOpeners(job, folderPrefix),
    createFAQ(job, folderPrefix),
    createAdvancedGuide(job, folderPrefix),
    createBestInSlot(job, folderPrefix),
    createStatPriority(job, folderPrefix),
    createJobChanges(job, folderPrefix),
    createFightTips(job, folderPrefix),
    ...job.customFields,
  ],
});

export const createJobCollections = (folderPrefix = '') => jobs.map((job) => createJobCollection(job, folderPrefix));
