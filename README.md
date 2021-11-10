# Glam

Glam is a theme for The Balance website put together by the wonderful FFXIV community

## Install Hugo
Follow the instruction on [gohugo.io](https://gohugo.io/getting-started/installing/) to install hugo on your machine.

## Testing the theme locally

First install all node dependencies:

```
npm install
```

Just run the following:

```
npm run serve:hugo
```

## Using the editor locally

Change `IS_LOCAL_BUILD` inside `cms/index.js` to `true`.  This makes sure, netlify cms is available for your local build.

Then run:

```
npm run serve:cms
```

Also make sure your hugo dev server is running. Afterwards, navigate to `http://localhost:1313/admin`
