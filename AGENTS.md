# Repository Guidelines

## Project Structure & Module Organization
This repo is a VuePress 2 site (Vue 3 + `vuepress-theme-hope`) deployed to GitHub Pages. Content lives under `docs/`, organized by topic (e.g., `docs/backend/`, `docs/frontend/`, `docs/devops/`, `docs/tools/`). Site configuration and theme assets are in `docs/.vuepress/`, with public static files in `docs/.vuepress/public/` and generated output in `docs/.vuepress/dist/`.

Key paths:
- `docs/.vuepress/config.ts`: site config
- `docs/.vuepress/styles/`: custom styles
- `docs/.vuepress/public/covers/`: cover images referenced by absolute paths

## Build, Test, and Development Commands
Use `pnpm` (see `pnpm-lock.yaml`).
- `pnpm install`: install dependencies.
- `pnpm run docs:dev`: start local dev server and open the site.
- `pnpm run docs:clean-dev`: dev server with a clean cache.
- `pnpm run docs:build`: build static site into `docs/.vuepress/dist/`.
- `pnpm run docs:update-package`: update VuePress packages via `vp-update`.
- `pnpm run release`: bump version and update `CHANGELOG.md` using `standard-version`.

There are currently no automated test scripts.

## Coding Style & Naming Conventions
Content is Markdown with YAML frontmatter. Follow the frontmatter pattern in `CLAUDE.md` (e.g., `title`, `shortTitle`, `date`, `categories`, `tags`, optional `order`, and `cover`).

Image rules:
- Frontmatter cover paths must be absolute and point into `docs/.vuepress/public/` (e.g., `cover: /covers/polymarket/api-guide.png`).
- Inline Markdown images should use relative paths (e.g., `![diagram](illustrations/topic/image.png)`).

## Testing Guidelines
No test framework is configured. If you add automated tests, also add scripts in `package.json` and document them here.

## Commit & Pull Request Guidelines
Git history uses Conventional Commit-style prefixes such as `feat:`, `fix:`, `refactor(content):`, and `chore:`. Keep subject lines concise and use an optional scope for content changes.

PRs should include:
- A clear summary of content or config changes.
- Screenshots for visible UI/visual changes (e.g., theme, layout, covers).
- Links to related issues if applicable.

## Security & Content Safety
Do not commit real credentials, private keys, or wallet addresses. Use placeholders like `Config.PRIVATE_KEY` in examples. Avoid sensitive terms in content as noted in `CLAUDE.md` (e.g., prefer “预测市场” over gambling terms).
