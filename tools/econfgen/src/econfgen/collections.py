"""Common collections and collection generators"""
from netlifyconfig.collection import FolderCollection, File, FileCollection
from netlifyconfig.widgets import (
    StringWidget,
    NumberWidget,
    ColorWidget,
    MarkdownWidget,
    ListWidget,
    ImageWidget,
    ObjectWidget,
    SelectWidget,
    BooleanWidget,
)

from econfgen.fields import (
    qna_fields,
    common_fields,
    bis_fields,
    stats,
    changes,
    title,
    title_and_body_widgets,
    body,
    seo_description,
    seo_tag_relation,
    author_relation,
    lastmod,
    patch,
    changelog,
)


role_metadata = FolderCollection(
    name='role-data',
    label='Role Metadata',
    folder='data/roles/',
    format='json',
    identifier_field='name',
    create=True,
    fields=[
        StringWidget(label='Short name', name='title'),
        StringWidget(label='Role name', name='name'),
        NumberWidget(label='Display order', name='order'),
        ColorWidget(label='Color', name='color'),
        StringWidget(label='Icon', name='icon'),
        StringWidget(label='Link', name='role_link'),
        MarkdownWidget(label='Description', name='role_text_md'),
        ListWidget(
            label='Job Information',
            name='jobs',
            fields=[
                StringWidget(label='Name', name='name'),
                StringWidget(label='Link', name='job_link'),
                StringWidget(label='Icon', name='icon'),
            ],
        ),
    ],
)

author_profile = FolderCollection(
    name='author-profile',
    label='Author Profile',
    folder='data/author/',
    format='json',
    identifier_field='username',
    media_folder='/static/img/profile',
    public_folder='/img/profile',
    create=True,
    fields=[
        StringWidget(name='username', label='Username'),
        ImageWidget(name='image', label='Profile Image', choose_url=False),
        StringWidget(name='name', label='Display Name'),
        ObjectWidget(
            name='socials',
            label='Social Information',
            fields=[
                StringWidget(name='discord_id', label='Discord Name', required=False),
            ],
        ),
    ],
)

seo_tag_collection = FolderCollection(
    name='seo-tags',
    label='SEO tags',
    folder='data/seo/tags',
    format='json',
    identifier_field='tag',
    media_folder='/static/img/profile',
    public_folder='/img/profile',
    create=True,
    fields=[
        StringWidget(name='tag', label='Tag'),
        StringWidget(name='description', label='Description'),
    ],
)


def generate_role_landing_file(role: str) -> File:
    """Generates the file for role landing"""
    role_proper = role.title()
    return File(
        name=role,
        label=role_proper,
        media_folder=f'/static/img/jobs/{role}',
        public_folder=f'/img/jobs/{role}',
        file=f'content/jobs/{role}/_index.md',
        fields=[
            body,
            ObjectWidget(
                name='menu',
                label='Menu hierarchy',
                fields=[
                    ObjectWidget(
                        name='main',
                        label='Main',
                        fields=[
                            SelectWidget(
                                name='name',
                                label='Name',
                                options=[role_proper],
                                default=role_proper,
                            ),
                            SelectWidget(
                                name='identifier',
                                label='Identifier',
                                options=[role],
                                default=[role],
                            ),
                            SelectWidget(
                                name='parent',
                                label='Parent',
                                options=['jobs'],
                                default='jobs',
                            ),
                        ],
                    )
                ],
            ),
            SelectWidget(name='role', label='Role', options=[role], default=role),
            SelectWidget(
                name='layout',
                label='Layout',
                options=['role_home'],
                default='role_home',
            ),
            ImageWidget(
                name='bg_header_image',
                label='Background Header Image',
                choose_url=False,
            ),
            ImageWidget(name='role_hero_image', label='Role Hero Image', choose_url=False),
        ],
    )


def generate_job_guide(job_name: str, job_short_name: str, role: str) -> FileCollection:
    """Generates the general job guide file collection

    :param job_name: The job name, such as "Dark Knight"
    :type job_name: str
    :param job_short_name: The 'short' job name, such as "drk"
    :type job_short_name: str
    :param role: The job role, such as "Healers", or "Tanks"
    :type role: str

    :return: A FileCollection with all the page(s) standard to the job guide
    :rtype: FileCollection
    """
    job_slug = job_name.lower().replace(' ', '-')
    return FileCollection(
        name=f'{job_short_name}-guide',
        label=f'{job_name} guide',
        media_folder=f'/static/img/jobs/{job_short_name}',
        public_folder=f'/img/jobs/{job_short_name}',
        files=[
            File(
                name='landing',
                label='Landing page',
                file=f'content/jobs/{role}/{job_slug}/_index.md',
                fields=[
                    *title_and_body_widgets,
                    SelectWidget(
                        name='job_name',
                        label='Job Name',
                        options=[job_name.lower()],
                        default=[job_name.lower()],
                    ),
                    ObjectWidget(
                        name='menu',
                        label='Menu hierarchy',
                        fields=[
                            ObjectWidget(
                                name='main',
                                label='Main',
                                fields=[
                                    SelectWidget(
                                        name='name',
                                        label='Name',
                                        options=[job_name],
                                        default=[job_name],
                                    ),
                                    SelectWidget(
                                        name='parent',
                                        label='Parent',
                                        options=[role],
                                        default=[role],
                                    ),
                                ],
                            )
                        ],
                    ),
                    seo_description,
                    seo_tag_relation,
                ],
            ),
            File(
                name='leveling-guide',
                label='Leveling Guide',
                file=f'content/jobs/{role}/{job_slug}/leveling-guide.md',
                fields=common_fields,
            ),
            File(
                name='basic-guide',
                label='Basic Guide',
                file=f'content/jobs/{role}/{job_slug}/basic-guide.md',
                fields=common_fields,
            ),
            File(
                name='skills-overview',
                label='Skills Overview',
                file=f'content/jobs/{role}/{job_slug}/skills-overview.md',
                fields=common_fields,
            ),
            File(
                name='openers',
                label='Openers and Rotation',
                file=f'content/jobs/{role}/{job_slug}/openers.md',
                fields=common_fields,
            ),
            File(
                name='faq',
                label='Frequently Asked Questions',
                file=f'content/jobs/{role}/{job_slug}/faq.md',
                fields=qna_fields,
            ),
            File(
                name='intermediate-guide',
                label='Intermediate Guide',
                file=f'content/jobs/{role}/{job_slug}/intermediate-guide.md',
                fields=common_fields,
            ),
            File(
                name='advanced-guide',
                label='Advanced Guide',
                file=f'content/jobs/{role}/{job_slug}/advanced-guide.md',
                fields=common_fields,
            ),
            File(
                name='bis',
                label='Best in Slot',
                file=f'content/jobs/{role}/{job_slug}/best-in-slot.md',
                fields=bis_fields,
            ),
            File(
                name='stat-priority',
                label='Stat Priority',
                file=f'content/jobs/{role}/{job_slug}/stat-priority.md',
                fields=stats,
            ),
            File(
                name='job-changes',
                label='Job Changes',
                file=f'content/jobs/{role}/{job_slug}/job-changes.md',
                fields=changes,
            ),
        ],
    )


def generate_fight_tips(job_name: str, job_short_name: str, role: str) -> FileCollection:
    # TODO: refactor this so it's less gross and in keeping with suggestions
    # to refactor the layout
    job_slug = job_name.lower().replace(' ', '-')
    return FolderCollection(
        name=f'{job_short_name}-fight-tips',
        label=f'{job_name} Fight Tips',
        description=f'Fight-specific tips for {job_name}',
        folder=f'content/jobs/{role}/{job_slug}/fight-tips/',
        create=True,
        fields=[
            title,
            ImageWidget(name='card_header_image', label='Card Header Imagel', choose_url=False, required=False),
            body,
            author_relation,
            patch,
            lastmod,
            changelog,
        ],
    )


def generate_encounter_for(name: str, tier: str) -> FolderCollection:
    """Generates a FolderCollection for a given encounter

    :param name: The name of the encounter. For alex, you'd submit 'Alexander'
    :param name: str
    :param tier: Is one of 'savage', 'ultimate', or 'extreme'
    :param tier: str
    :return: A FolderCollection for the encounter
    :rtype: FolderCollection
    """
    identifier = name.lower()
    return FolderCollection(
        name=f'encounter-{identifier}',
        label=identifier,
        folder=f'content/encounters/{tier}/{identifier}',
        media_folder=f'/static/img/encounters/{tier}/{identifier}',
        public_folder=f'/img/encounters/{tier}/{identifier}',
        identifier_field='fight_title',
        create=True,
        fields=[
            StringWidget(
                name='title',
                label='Fight Name',
                hint='This is the fight name (Ex. "E12 (Eternity)" or "O12 (Alphascape 4.0)")',
            ),
            StringWidget(
                name='fight_title',
                label='Short Name of Fight',
                hint='This is the short name of the fight (Ex. "o12s" or "e12s-p2")',
            ),  # TODO: pattern
            SelectWidget(
                name='difficulty',
                label='Encounter Category',
                options=['savage', 'ultimate', 'extreme'],
            ),
            ImageWidget(name='card_image', label='Fight Card Image', choose_url=False),
            ImageWidget(
                name='banner_image',
                label='Fight Banner (for individual guides)',
                choose_url=False,
            ),
            ImageWidget(
                name='tier_image',
                label='Encounter Tier Image',
                choose_url=False,
                required=False,
            ),
            StringWidget(
                name='tier_name',
                label='Encounter Tier Name',
                hint="""Please capitalize the name (Ex. "Eden's Promise" or "Alphascape")""",
            ),
            StringWidget(
                name='series_name',
                label='Encounter Series Name (Capitalized)',
                hint='Please capitalize the series name (Ex. "Eden Series" or "Alexander Series")',
            ),
            NumberWidget(
                name='weight',
                label='Weight',
                hint='(1 - last fight of tier, 2 - third fight of tier, etc. Must be in reverse order.)',
            ),
            NumberWidget(
                name='tier_weight',
                label='Tier Weight',
                hint='(1 - EW, 2 - ShB, 3 - SB, 4 - HW, 5 - ARR)',
            ),
            BooleanWidget(
                name='coming_soon',
                label='Coming Soon?',
                hint='This adds the coming soon overlay. Only enable Coming Soon or Spoilers. Not both.',
                required=False,
            ),
            BooleanWidget(
                name='spoilers',
                label='Spoilers?',
                hint='This adds the spoiler overlay. Only enable Coming Soon or Spoilers. Not both.',
                required=False,
            ),
            SelectWidget(
                name='expansion',
                label='Expansion',
                options=['ew', 'shb', 'sb', 'hw', 'arr'],
            ),
            body,
            author_relation,
            lastmod,
            patch,
            changelog,
            seo_description,
            seo_tag_relation,
        ],
    )
