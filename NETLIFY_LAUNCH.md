# Publish Form / Flow on Netlify

This is a static site: it has no build command, package install, environment variables, server or API key. Netlify can publish the project folder directly. The included `netlify.toml` sets the publish directory and response headers.

## Fastest launch: manual deploy

1. Open [Netlify Drop](https://app.netlify.com/drop) and sign in or create a Netlify account.
2. Drag the `D:\ather_project` folder into the deploy area. If your browser won't accept a folder, make a ZIP of the project folder and drop that instead.
3. Wait for Netlify to finish the deploy, then open the generated `*.netlify.app` address.
4. Check the page on desktop and mobile. The Google Fonts link needs internet; the rest of the project is self-contained.
5. To update a manual deploy, drag the updated project folder into that site's deploy area again.

## Keep it updated from Git

For automatic deploys, push this folder to a Git provider, choose **Add new project → Import an existing project** in Netlify, and select the repository. Leave the build command empty and use `.` as the publish directory. The `netlify.toml` already supplies the publish directory. Each push to the production branch can then publish an update.

## Before sharing the public URL

- Replace any student name or contact details you want shown in the portfolio.
- Keep the sample metrics labelled as illustrative; they are not study results.
- Flow Assist is a local interaction demo, not a connected AI service.
- Check the site's visibility and access settings in Netlify before sharing.

Netlify's current manual deploy instructions are in its [Add a new site guide](https://docs.netlify.com/welcome/add-new-site/). For an imported repository, see [build configuration](https://docs.netlify.com/build/configure-builds/overview/).

