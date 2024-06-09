"""Fields common to a lot of sections"""

from netlifyconfig.widgets import (
    Widgets,
    DateTimeWidget,
    ImageWidget,
    ListWidget,
    MarkdownWidget,
    RelationWidget,
    SelectWidget,
    StringWidget,
)

##
# Common fields
##

title = StringWidget(name='title', label='Title')
body = MarkdownWidget(name='body', label='Body')
title_and_body_widgets = (title, body)

author_relation = RelationWidget(
    name='authors',
    label='Author(s)',
    required=False,
    multiple=True,
    collection='author-profile',
    search_fields=['username', 'name'],
    value_field='username',
    display_fields=['username', 'name'],
)

lastmod = DateTimeWidget(
    name='lastmod',
    label='Last Updated',
    date_format='YYYY-MM-DD',
    time_format=False,
)

changelog = ListWidget(
    name='changelog',
    label='Changelog Entry',
    summary='{{fields.date}}: {{fields.message}}',
    fields=[
        DateTimeWidget(
            name='date',
            label='Date',
            date_format='YYYY-MM-DD',
            time_format=False,
        ),
        StringWidget(name='message', label='Message'),
    ],
)

seo_description = StringWidget(name='description', label='SEO Description')
seo_tag_relation = RelationWidget(
    name='tags',
    label='SEO Tags (only the first six can be used)',
    multiple=True,
    collection='seo-tags',
    search_fields=['tag', 'description'],
    value_field='tag',
)

patch = StringWidget(name='patch', label='Patch')

common_fields: Widgets = [
    *title_and_body_widgets,
    ImageWidget(
        name='card_header_image',
        label='Card Header Image',
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
    SelectWidget(name='layout', label='Layout', options=['qna'], default=['qna']),
    patch,
    lastmod,
    ListWidget(
        name='qna',
        label='FAQ Entry',
        summary='{{fields.question}}: {{fields.answer}}',
        fields=[
            StringWidget(name='question', label='Question'),
            MarkdownWidget(name='answer', label='Answer'),
        ],
    ),
    author_relation,
    seo_description,
    seo_tag_relation,
]

bis_fields: Widgets = [
    title,
    SelectWidget(name='layout', label='layout', options=['bis'], default=['bis']),
    patch,
    lastmod,
    changelog,
    ListWidget(
        name='bis',
        label='Sets',
        summary='{{fields.name}}',
        fields=[
            StringWidget(name='name', label='Name'),
            SelectWidget(
                name='type',
                label='Type',
                options=[
                    'etro',
                    'ariyala',
                    'gsheets',
                    'sleepyshiba',
                    'genericiframe',
                    'genericlink',
                    'xivgearset',
                ],
                default='etro',
            ),
            StringWidget(name='link', label='Link'),
            MarkdownWidget(name='description', label='Description', required=False),
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
    StringWidget(name='priority', label='Priority'),
    author_relation,
    seo_description,
    seo_tag_relation,
]

changes: Widgets = [
    title,
    SelectWidget(name='layout', label='Layout', options=['changes'], default='changes'),
    lastmod,
    ListWidget(
        name='changes',
        label='Change',
        summary='{{fields.patch}}',
        fields=[
            StringWidget(name='patch', label='Patch'),
            MarkdownWidget(name='description', label='Description'),
        ],
    ),
    author_relation,
    seo_description,
    seo_tag_relation,
]
