# Glam

Glam is a theme for The Balance website put together by the wonderful FFXIV community

## Testing the theme locally

Make sure you have [hugo](https://gohugo.io/getting-started/installing/) installed, either drop `hugo.exe` in the root dir or add it to your PATH. Make sure you're using hugo version [v0.86.1](https://github.com/gohugoio/hugo/releases/tag/v0.86.1)

```sh
# Clone the repository
git clone https://github.com/The-Balance-FFXIV/glam.git

# Navigate into it
cd ./glam/

# Install project dependencies and dependencies. If you prefer to not edit PATH, you can install globally.
export PATH=$PATH:${PWD}/node_modules/.bin
yarn

# Run the servers
yarn start:static

# Server starts by default on `localhost:1313`
```

## Using the editor locally

First run the static site server with `yarn start:static`, then run `yarn start:admin` and navigate to `http://localhost:1313/admin`.
Alternatively, `yarn start` will start both servers.

# Configuration

## `[params]` section

| Key Name            | Type   | Description                                                            |
| ------------------- | ------ | ---------------------------------------------------------------------- |
| maxTierGearsets     | int    | Maximum number of 'tier' gearsets to display on a job landing page     |
| maxUltimateGearsets | int    | Maximum number of 'ultimate' gearsets to display on a job landing page |
| maxGearsets         | int    | Maximum number of gearsets to display, total                           |
| discord             | string | Discord join url (without any leading `https://`)                      |
| description         | string | Description for the site                                               |
| copyrightMessage    | string | Copyright string to display on the bottom of the site                  |

## Notes

- the `[menu]` section must contain at least one `[[menu.header]]` and `[[menu.footer]]` section:

```toml
[menu]
  [[menu.header]]
    identifier = 'Encounters'
    url = '/encounters/'
    weight = 20
  [[menu.footer]]
    identifier = 'Encounters'
    url = '/encounters'
    weight = 20
```
