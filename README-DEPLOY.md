# Deploy to GitHub Pages — Quick Guide

This document contains the deployment instructions for the Digital Portfolio repository. It shows safe local deploy options and a recommended GitHub Actions CI workflow.

## Prerequisites
- Git installed and configured (git --version)
- Node.js + npm installed
- A GitHub account and a repository created (e.g. https://github.com/<your-username>/<repo>.git)
- VS Code with the project folder opened

## 1) Vite config for GitHub Pages
Set the `base` in `vite.config.ts` when deploying to a repository site (not user/org site):

```ts
export default defineConfig({
  base: '/<repo-name>/', // e.g. '/Salim-Saay/'
})
```

## 2) Build the site

```powershell
npm install
npm run build
# build/ will be created
```

## 3) Deploy options

### A) `gh-pages` (may fail on Windows with long paths)

```powershell
npm install --save-dev gh-pages
# package.json:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
npm run deploy
```

If you see cache or "destination path already exists" errors:

```powershell
Remove-Item -Recurse -Force node_modules\.cache\gh-pages -ErrorAction Ignore
```

### B) Safe local deploy (recommended on Windows)
Use a short-path git worktree to avoid long-path problems and avoid touching node_modules.

```powershell
$td = 'C:\gh-pages-deploy'
if (Test-Path $td) { Remove-Item -Recurse -Force $td }
# create or reset a worktree for gh-pages
git worktree add -B gh-pages $td origin/gh-pages
# delete everything except .git
Get-ChildItem -Force -Path $td | Where-Object { $_.Name -ne '.git' } | ForEach-Object { Remove-Item -Recurse -Force -LiteralPath $_.FullName }
# copy build output
Copy-Item -Path .\build\* -Destination $td -Recurse -Force
# commit & push
Set-Location $td
git add -A
if (-not (git diff --cached --quiet)) { git commit -m "Deploy site: $(Get-Date -Format o)" }
git push origin gh-pages --force
# cleanup
Set-Location -Path "$(Get-Location -LiteralPath)"
git worktree remove $td --force
if (Test-Path $td) { Remove-Item -Recurse -Force $td }
```

### C) Recommended: GitHub Actions (robust)
Create `.github/workflows/deploy-gh-pages.yml` with this snippet:

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

## Verify the site
Visit: https://<your-username>.github.io/<repo-name>/
If blank, open DevTools: check Network for 404s (assets missing) and ensure `base` in `vite.config.ts` is set correctly.

---

If you'd like, I can now add the GitHub Actions workflow file or add a safe `npm run deploy` script that uses the worktree flow. Tell me which and I'll implement it.