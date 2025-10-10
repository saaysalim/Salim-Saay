Deploy to GitHub Pages — Quick Guide

This short guide shows the minimum steps to connect VS Code to GitHub, build a Vite site, and publish it as a live GitHub Pages site. It includes a safe local publish method and a recommended GitHub Actions CI deploy.

Prerequisites
- Git installed and configured (git --version)
- Node.js + npm installed
- A GitHub account and an empty repository created (e.g. https://github.com/<your-username>/<repo>.git)
- VS Code with folder opened

1) Initialize repository in VS Code (or use existing repo)
- If not already a git repo:

```powershell
cd "C:\path\to\your\project"
git init
git config user.name "Your Name"
git config user.email "you@example.com"
# create .gitignore (node_modules, build, .env, etc.)
# stage and commit
git add -A
git commit -m "Initial commit"
```

2) Connect to GitHub remote and push main

```powershell
# replace the URL with your repo
git remote add origin https://github.com/<your-username>/<repo>.git
# ensure main branch name
git branch -M main
git push -u origin main
```

3) Vite project configuration for GitHub Pages
When publishing a GitHub Pages repository site (not a user/org site), the site is served under /<repo-name>/ so your asset URLs must include that base. In `vite.config.ts` set:

```ts
export default defineConfig({
  base: '/<repo-name>/', // <- set to your repo name, e.g. '/Salim-Saay/'
  // ...other config
})
```

Then ensure `package.json` has these scripts (typical):

```json
"scripts": {
  "dev": "vite",
  "build": "vite build"
}
```

4) Install dependencies and build

```powershell
# install (use npm ci if package-lock.json exists)
npm install
# build production output
npm run build
# this creates a `build/` folder (or `dist/` depending on config)
```

5) Deploy options — choose one

A) Quick local deploy using `gh-pages` (works often but can fail on Windows with long path issues)

```powershell
# install gh-pages as dev dependency
npm install --save-dev gh-pages
# add scripts in package.json
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
# then run:
npm run deploy
```

Notes: if you see errors from the gh-pages tool about a cache or "destination path already exists" you can try removing the cache:

```powershell
Remove-Item -Recurse -Force node_modules\.cache\gh-pages -ErrorAction Ignore
```

If `gh-pages` fails due to Windows path length or node_modules reset errors, use option (B) below.

B) Safe local deploy using a short-path git worktree (recommended on Windows)

This copies only the `build/` contents into a short temporary worktree, commits and force-pushes to the `gh-pages` branch without touching `node_modules`.

```powershell
# run from your repo root
$td = 'C:\gh-pages-deploy'
if (Test-Path $td) { Remove-Item -Recurse -Force $td }
# create a worktree checked out to gh-pages (create or reset)
git worktree add -B gh-pages $td origin/gh-pages
# clear the worktree (leave .git)
Get-ChildItem -Force -Path $td | Where-Object { $_.Name -ne '.git' } | ForEach-Object { Remove-Item -Recurse -Force -LiteralPath $_.FullName }
# copy build files
Copy-Item -Path .\build\* -Destination $td -Recurse -Force
# commit & push from the worktree
Set-Location $td
git add -A
if (-not (git diff --cached --quiet)) { git commit -m "Deploy site: $(Get-Date -Format o)" }
git push origin gh-pages --force
# cleanup
Set-Location -Path "$(Get-Location -LiteralPath)"
git worktree remove $td --force
if (Test-Path $td) { Remove-Item -Recurse -Force $td }
```

C) Recommended: CI deploy via GitHub Actions (best practice)
- Create a workflow file `.github/workflows/deploy-gh-pages.yml` with the following snippet (copy & paste and adjust `repo`/`token` settings are handled by actions automatically):

```yaml
name: Build and deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

This builds on GitHub Actions (Linux runner avoids Windows path issues) and pushes `build/` to `gh-pages`. After merging this workflow into `main`, every push to `main` will rebuild and publish.

6) Verify the site
- Wait ~1–2 minutes after the push. Visit:
  - https://<your-username>.github.io/<repo-name>/
- If page is blank, open DevTools (F12): check Network for 404s and Console for JS errors.
  - Common cause: missing `base` in Vite -> asset requests go to `/assets/...` instead of `/repo-name/assets/...`.

Troubleshooting quick tips
- Blank page: check `build/index.html` and ensure script/css src/href include `/your-repo-name/` when deploying to a repo site.
- 404s from GitHub Pages: confirm gh-pages branch has `index.html` at root.
- If gh-pages deploy fails locally (cache or long-path errors), use the worktree method or CI deploy.

That's it — concise flow from VS Code => GitHub => live GitHub Pages. If you want, I can:
- Create the GitHub Actions workflow file automatically for you, or
- Add a safe `npm run deploy` script that runs the short-path worktree steps.

Pick one and I'll implement it for you.