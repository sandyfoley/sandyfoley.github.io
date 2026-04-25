# So you wanna... with AI

Personal Astro blog for practical AI workflows in real software delivery, written for .NET architects and developers working on content-driven platforms.

Live site: <https://sandyfoley.github.io>

## Tech stack

- Astro static site
- Markdown/MDX-ready content collection structure
- GitHub Pages deployment from `dist`
- Minimal dependencies and plain CSS

## Local setup

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content

Blog posts live in:

```text
src/content/blog
```

Each post uses frontmatter like:

```yaml
---
title: "Post title"
description: "Short summary for listing pages and SEO."
publishDate: 2026-04-25
tags:
  - Codex
  - AI workflows
draft: false
---
```

Draft posts are excluded from the blog and homepage when `draft: true`.

## Project structure

```text
src/
  components/
  content/
    blog/
  layouts/
  pages/
  styles/
public/
.github/workflows/
```

## GitHub Pages deployment

This repository is the root GitHub Pages repository for `sandyfoley.github.io`, so Astro is configured with:

```js
site: 'https://sandyfoley.github.io'
```

There is no repo base path.

The included workflow at `.github/workflows/deploy.yml` builds the Astro site and deploys `dist` to GitHub Pages on pushes to `main`.

In GitHub, confirm the Pages source is set to **GitHub Actions** under repository settings.
