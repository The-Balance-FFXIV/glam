# Glam

Glam is a theme for The Balance website put together by the wonderful FFXIV community

## Testing the theme locally

Make sure you have [hugo](https://gohugo.io/getting-started/installing/) installed, either drop `hugo.exe` in the root dir or have it in your PATH.

```sh
# Clone the repository...
git clone https://github.com/The-Balance-FFXIV/glam.git
# Navigate into it...
cd ./glam/
# Install project dependencies and global dependencies...
yarn global add postcss-cli@8.3.1 autoprefixer postcss tailwindcss
yarn install
# Run it...
hugo server -s exampleSite/ --themesDir=../.. --disableFastRender
# Server starts by default on `localhost:1313`
```


## Using the editor locally

cd to the `exampleSite` directory and run `npx netlify-cms-proxy-server` alongside the `hugo` command; afterwards, navigate to `http://localhost:1313/admin`
