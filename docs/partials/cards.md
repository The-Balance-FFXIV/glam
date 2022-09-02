# `cards/default.html`

## Input params

| name           | type      | required? | default?   | notes                                        |
|:---------------|:----------|:----------|:-----------|:---------------------------------------------|
| `role`         | string    | no        | `gray-600` | Changes the border color of the card         |
| `image`        | http path | no        |            | Adds a header image to the card, if provided |
| `name`         | string    | no        |            | if set, calls `cards/_header.html`           |
| `text`         | html      | no        |            | Card body text                               |
| `readMoreLink` | string    | no        |            | if set, calls `cards/_footer.html`           |

See `cards/_header.html` and `cards/_footer.html` for optional input params

# `cards/_header.html`

## Input params

| name           | type      | required? | default?   | notes                                        |
|:---------------|:----------|:----------|:-----------|:---------------------------------------------|
| `inlineLink`   | ???       | no        |            | adds a hover effect to the card if set       |
| `icon`         | http path | no        |            | adds an icon image to the card, if set       |
| `name`         | string    | no        |            | adds a title to the header                   |
| `patch`        | string    | no        |            | Adds a "Patch: X.Y" to the header            |
| `updated`      | string    | no        |            | Adds an "Updated: Datestr" to the header     |

# `cards/_footer.html`

## Input params

| name           | type      | required? | default?    | notes                                        |
|:---------------|:----------|:----------|:------------|:---------------------------------------------|
| `readMoreLink` | http path | no        |             | Adds a link to the footer of the card        |
| `readMoreText` | string    | no        | "Read more" | Override text for the link                   |
