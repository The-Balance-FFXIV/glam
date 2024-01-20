# Glam

Glam is a theme for The Balance website put together by the wonderful FFXIV community

## Getting started on Windows
### Tools Required
* [git](https://git-scm.com/downloads)
  1. Accept all the default options except for the following option.
  2. Check the `Enable symbolic links` box when presented the option.
* [nodejs](https://nodejs.org/en/download/)
  1. Choose the latest LTS release listed.
  2. Accept all default options.
* [hugo](https://github.com/gohugoio/hugo/releases) (Optionally, you can install `hugo` via a package manager if desired.)
  1. Choose hugo__extended_X.XXX.X_Windows-64bit.zip where the X's are the current version (Latest tested with `0.119.0`).
  2. Extract the .zip to a location of your choosing (Documents is reasonable choice).
  3. Open the extracted folder and right click on `hugo.exe` and select properties.
  4. Check the `Unblock` box near the bottom and press `Ok`.
### How to build the project
1. These steps only need to be done once.
2. Add hugo.exe to PATH.
   1. Open the Start menu, search for `environment`, and choose `Edit the system environment variables` to open a dialogue.
   2. Click the `Environment Variables` box near the bottom.
   3. Select the `Path` line in the first box and hit `Edit`.
   4. Press the `New` button and input the path to the folder you extracted (i.e `C:/Users/UserName/Documents/hugo`) and hit the `Enter` key.
   5. Select `Ok` to close all the dialogue boxes.
3. Clone the git repository.
   1. Open a command prompt in the location you want the repository to be placed (You can `Shift+Right Click` in a folder and choose the `Open Powershell window` option).
   2. Run `git clone https://github.com/The-Balance-FFXIV/glam.git` to clone the repository.
4. Navigate into the repository: `cd glam/`.
5. Run `yarn` to setup the necessary environment.
### How to run the project
1. Navigate to your project folder in a command prompt or Powershell window.
2. Run `yarn start:dev`.
3. Navigate to `localhost:1313` in a web browser to view the local version of the website.
  

## Testing the theme locally

Make sure you have [hugo](https://gohugo.io/getting-started/installing/) installed. Either drop `hugo.exe` in the project's root folder or add it to your PATH.

```sh
# Clone the repository
git clone https://github.com/The-Balance-FFXIV/glam.git

# Navigate into it
cd ./glam/

# Install project dependencies and dependencies. If you prefer to not edit PATH, you can install globally.
export PATH=$PATH:${PWD}/node_modules/.bin
yarn

# Run the servers
yarn start:dev

# Server starts by default on `localhost:1313`
```

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
