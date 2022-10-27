import yaml

from cgwain.collection import FileCollection, FolderCollection, File
from cgwain.widgets import (
    Widgets,
    BooleanWidget,
    ColorWidget,
    DateTimeWidget,
    ImageWidget,
    ListWidget,
    MarkdownWidget,
    NumberWidget,
    ObjectWidget,
    RelationWidget,
    SelectWidget,
    StringWidget,
)
from cgwain.netlify import NetlifyConfig, Backend


##
# Common fields
##

title = StringWidget(name="title", label="Title")
body = MarkdownWidget(name="body", label="Body")
title_and_body_widgets = [title, body]

author_relation = RelationWidget(
    name="authors",
    label="Author(s)",
    required=False,
    multiple=True,
    collection="author-profile",
    search_fields=["username", "name"],
    value_field="username",
    display_fields=["username", "name"],
)

lastmod = DateTimeWidget(
    name="lastmod", label="Last Updated", date_format="YYYY-MM-DD", time_format=False
)

changelog = ListWidget(
    name="changelog",
    label="Changelog Entry",
    summary="{{fields.date}}: {{fields.message}}",
    fields=[
        DateTimeWidget(
            name="date", label="Date", date_format="YYYY-MM-DD", time_format=False
        ),
        StringWidget(name="message", label="Message"),
    ],
)

seo_description = StringWidget(name="description", label="SEO Description")
seo_tag_relation = RelationWidget(
    name="tags",
    label="SEO Tags (only the first six can be used)",
    multiple=True,
    collection="seo-tags",
    search_fields=["tag", "description"],
    value_field="tag",
)

patch = StringWidget(name="patch", label="Patch")

common_fields: Widgets = [
    *title_and_body_widgets,
    ImageWidget(
        name="card_header_image",
        label="Card Header Image",
        choose_url=False,
        required=False,
    ),
    author_relation,
    patch,
    lastmod,
    changelog,
    seo_description,
    seo_tag_relation,
]
qna_fields: Widgets = [
    title,
    SelectWidget(name="layout", label="Layout", options=["qna"], default=["qna"]),
    patch,
    lastmod,
    ListWidget(
        name="qna",
        label="FAQ Entry",
        summary="{{fields.question}}: {{fields.answer}}",
        fields=[
            StringWidget(name="question", label="Question"),
            MarkdownWidget(name="answer", label="Answer"),
        ],
    ),
    author_relation,
    seo_description,
    seo_tag_relation,
]
bis_fields: Widgets = [
    title,
    SelectWidget(name="layout", label="layout", options=["bis"], default=["bis"]),
    patch,
    lastmod,
    changelog,
    ListWidget(
        name="bis",
        label="Sets",
        summary="{{fields.name}}",
        fields=[
            StringWidget(name="name", label="Name"),
            SelectWidget(
                name="type",
                label="Type",
                options=["etro", "ariyala", "gsheets", "sleepyshiba"],
                default="etro",
            ),
            StringWidget(name="link", label="Link"),
            MarkdownWidget(name="description", label="Description", required=False),
        ],
    ),
    author_relation,
]
stats: Widgets = [
    title,
    patch,
    body,
    lastmod,
    changelog,
    StringWidget(name="priority", label="Priority"),
    author_relation,
    seo_description,
    seo_tag_relation,
]
changes: Widgets = [
    title,
    SelectWidget(name="layout", label="Layout", options=["changes"], default="changes"),
    lastmod,
    ListWidget(
        name="changes",
        label="Change",
        summary="{{fields.patch}}",
        fields=[
            StringWidget(name="patch", label="Patch"),
            MarkdownWidget(name="description", label="Description"),
        ],
    ),
    author_relation,
    seo_description,
    seo_tag_relation,
]

##
# Collections
##

role_metadata = FolderCollection(
    name="role-data",
    label="Role Metadata",
    folder="data/roles/",
    format="json",
    identifier_field="name",
    create=True,
    fields=[
        StringWidget(label="Short name", name="title"),
        StringWidget(label="Role name", name="name"),
        NumberWidget(label="Display order", name="order"),
        ColorWidget(label="Color", name="color"),
        StringWidget(label="Icon", name="icon"),
        StringWidget(label="Link", name="role_link"),
        MarkdownWidget(label="Description", name="role_text_md"),
        ListWidget(
            label="Job Information",
            name="jobs",
            fields=[
                StringWidget(label="Name", name="name"),
                StringWidget(label="Link", name="job_link"),
                StringWidget(label="Icon", name="icon"),
            ],
        ),
    ],
)

author_profile = FolderCollection(
    name="author-profile",
    label="Author Profile",
    folder="data/author/",
    format="json",
    identifier_field="username",
    media_folder="/static/img/profile",
    public_folder="/img/profile",
    create=True,
    fields=[
        StringWidget(name="username", label="Username"),
        ImageWidget(name="image", label="Profile Image", choose_url=False),
        StringWidget(name="name", label="Display Name"),
        ObjectWidget(
            name="socials",
            label="Social Information",
            fields=[
                StringWidget(name="discord_id", label="Discord Name", required=False),
            ],
        ),
    ],
)

seo_tag_collection = FolderCollection(
    name="seo-tags",
    label="SEO tags",
    folder="data/seo/tags",
    format="json",
    identifier_field="tag",
    media_folder="/static/img/profile",
    public_folder="/img/profile",
    create=True,
    fields=[
        StringWidget(name="tag", label="Tag"),
        StringWidget(name="description", label="Description"),
    ],
)


def generate_role_landing_file(role: str) -> File:
    """Generates the file for role landing"""
    role_proper = role.title()
    return File(
        name=role,
        label=role_proper,
        media_folder=f"/static/img/jobs/{role}",
        public_folder=f"/img/jobs/{role}",
        file=f"content/jobs/{role}/_index.md",
        fields=[
            body,
            ObjectWidget(
                name="menu",
                label="Menu hierarchy",
                fields=[
                    ObjectWidget(
                        name="main",
                        label="Main",
                        fields=[
                            SelectWidget(
                                name="name",
                                label="Name",
                                options=[role_proper],
                                default=role_proper,
                            ),
                            SelectWidget(
                                name="identifier",
                                label="Identifier",
                                options=[role],
                                default=[role],
                            ),
                            SelectWidget(
                                name="parent",
                                label="Parent",
                                options=["jobs"],
                                default="jobs",
                            ),
                        ],
                    )
                ],
            ),
            SelectWidget(name="role", label="Role", options=[role], default=role),
            SelectWidget(
                name="layout",
                label="Layout",
                options=["role_home"],
                default="role_home",
            ),
            ImageWidget(
                name="bg_header_image",
                label="Background Header Image",
                choose_url=False,
            ),
            ImageWidget(
                name="role_hero_image", label="Role Hero Image", choose_url=False
            ),
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
    job_slug = job_name.lower().replace(" ", "-")
    return FileCollection(
        name=f"{job_short_name}-guide",
        label=f"{job_name} guide",
        media_folder=f"/static/img/jobs/{job_short_name}",
        public_folder=f"/img/jobs/{job_short_name}",
        files=[
            File(
                name="landing",
                label="Landing page",
                file=f"content/jobs/{role}/{job_slug}/_index.md",
                fields=[
                    *title_and_body_widgets,
                    SelectWidget(
                        name="job_name",
                        label="Job Name",
                        options=[job_name.lower()],
                        default=[job_name.lower()],
                    ),
                    ObjectWidget(
                        name="menu",
                        label="Menu hierarchy",
                        fields=[
                            ObjectWidget(
                                name="main",
                                label="Main",
                                fields=[
                                    SelectWidget(
                                        name="name",
                                        label="Name",
                                        options=[job_name],
                                        default=[job_name],
                                    ),
                                    SelectWidget(
                                        name="parent",
                                        label="Parent",
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
                name="leveling-guide",
                label="Leveling Guide",
                file=f"content/jobs/{role}/{job_slug}/leveling-guide.md",
                fields=common_fields,
            ),
            File(
                name="basic-guide",
                label="Basic Guide",
                file=f"content/jobs/{role}/{job_slug}/basic-guide.md",
                fields=common_fields,
            ),
            File(
                name="skills-overview",
                label="Skills Overview",
                file=f"content/jobs/{role}/{job_slug}/skills-overview.md",
                fields=common_fields,
            ),
            File(
                name="openers",
                label="Openers and Rotation",
                file=f"content/jobs/{role}/{job_slug}/openers.md",
                fields=common_fields,
            ),
            File(
                name="faq",
                label="Frequently Asked Questions",
                file=f"content/jobs/{role}/{job_slug}/faq.md",
                fields=qna_fields,
            ),
            File(
                name="advanced-guide",
                label="Advanced Guide",
                file=f"content/jobs/{role}/{job_slug}/advanced-guide.md",
                fields=common_fields,
            ),
            File(
                name="bis",
                label="Best in Slot",
                file=f"content/jobs/{role}/{job_slug}/best-in-slot.md",
                fields=bis_fields,
            ),
            File(
                name="stat-priority",
                label="Stat Priority",
                file=f"content/jobs/{role}/{job_slug}/stat-priority.md",
                fields=stats,
            ),
            File(
                name="job-changes",
                label="Job Changes",
                file=f"content/jobs/{role}/{job_slug}/job-changes.md",
                fields=changes,
            ),
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
        name=f"encounter-{identifier}",
        label=identifier,
        folder=f"content/encounters/{tier}/{identifier}",
        media_folder=f"/static/img/encounters/{tier}/{identifier}",
        public_folder=f"/img/encounters/{tier}/{identifier}",
        identifier_field="fight_title",
        create=True,
        fields=[
            StringWidget(
                name="title",
                label="Fight Name",
                hint='This is the fight name (Ex. "E12 (Eternity)" or "O12 (Alphascape 4.0)")',
            ),
            StringWidget(
                name="fight_title",
                label="Short Name of Fight",
                hint='This is the short name of the fight (Ex. "o12s" or "e12s-p2")',
            ),  # TODO: pattern
            SelectWidget(
                name="difficulty",
                label="Encounter Category",
                options=["savage", "ultimate", "extreme"],
            ),
            ImageWidget(name="card_image", label="Fight Card Image", choose_url=False),
            ImageWidget(
                name="banner_image",
                label="Fight Banner (for individual guides)",
                choose_url=False,
            ),
            ImageWidget(
                name="tier_image",
                label="Encounter Tier Image",
                choose_url=False,
                required=False,
            ),
            StringWidget(
                name="tier_name",
                label="Encounter Tier Name",
                hint="""Please capitalize the name (Ex. "Eden's Promise" or "Alphascape")""",
            ),
            StringWidget(
                name="series_name",
                label="Encounter Series Name (Capitalized)",
                hint='Please capitalize the series name (Ex. "Eden Series" or "Alexander Series")',
            ),
            NumberWidget(
                name="weight",
                label="Weight",
                hint="(1 - last fight of tier, 2 - third fight of tier, etc. Must be in reverse order.)",
            ),
            NumberWidget(
                name="tier_weight",
                label="Tier Weight",
                hint="(1 - EW, 2 - ShB, 3 - SB, 4 - HW, 5 - ARR)",
            ),
            BooleanWidget(
                name="coming_soon",
                label="Coming Soon?",
                hint="This adds the coming soon overlay. Only enable Coming Soon or Spoilers. Not both.",
                required=False,
            ),
            BooleanWidget(
                name="spoilers",
                label="Spoilers?",
                hint="This adds the spoiler overlay. Only enable Coming Soon or Spoilers. Not both.",
                required=False,
            ),
            SelectWidget(
                name="expansion",
                label="Expansion",
                options=["ew", "shb", "sb", "hw", "arr"],
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


netlify = NetlifyConfig(
    backend=Backend(
        name="git-gateway",
    ),
    local_backend=True,
    media_folder="static/img",
    public_folder="/img",
    collections=[
        role_metadata,
        author_profile,
        seo_tag_collection,
        FileCollection(
            name="role-landing",
            label="Role Landing Pages",
            files=[
                generate_role_landing_file("tanks"),
                generate_role_landing_file("healers"),
                generate_role_landing_file("melee"),
                generate_role_landing_file("ranged"),
                generate_role_landing_file("casters"),
            ],
        ),
        generate_encounter_for(name="Pandaemonium", tier="savage"),
        generate_encounter_for(name="Ultimates", tier="ultimate"),
        generate_encounter_for(
            name="Extreme", tier="extreme"
        ),  # TODO: this presents a problem with naming in the function
        # tanks
        generate_job_guide("Paladin", "pld", "tanks"),
        # TODO: fight tips per job
        generate_job_guide("Warrior", "war", "tanks"),
        generate_job_guide("Dark Knight", "drk", "tanks"),
        generate_job_guide("Gunbreaker", "gbn", "tanks"),
        # healers
        generate_job_guide("Scholar", "sch", "healers"),
        generate_job_guide("White Mage", "whm", "healers"),
        generate_job_guide("Astrologian", "ast", "healers"),
        generate_job_guide("Sage", "sge", "healers"),
        # melee
        generate_job_guide("Monk", "mnk", "melee"),
        generate_job_guide("Dragoon", "drg", "melee"),
        generate_job_guide("Ninja", "nin", "melee"),
        generate_job_guide("Samurai", "sam", "melee"),
        generate_job_guide("Reaper", "rpr", "melee"),
        # ranged
        generate_job_guide("Bard", "brd", "ranged"),
        generate_job_guide("Machinist", "mch", "ranged"),
        generate_job_guide("Dancer", "dnc", "ranged"),
        # casters
        generate_job_guide("Black Mage", "blm", "casters"),
        generate_job_guide("Red Mage", "rdm", "casters"),
        generate_job_guide("Summoner", "smn", "casters"),
    ],
)

print(yaml.dump(netlify.dict()))
