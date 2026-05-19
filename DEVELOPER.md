# Developer Guide

This repository contains starter application templates for the Stackloom CLI.
Each template folder is a runnable app with its own `.loom/blueprint.json` file.

## Repository structure

- `mern/` — the primary MERN starter template used by default.
- `README.md` — repository-level usage, publishing, and template contract overview.
- `CHANGELOG.md` — release notes for the templates repository.
- `DEVELOPER.md` — this guide.
- `package.json` — root metadata for template release versioning.

## Publishing

This repo is published as `stackloom-templates` on npm using the package root.
The package includes the `mern/` template, documentation, and release metadata.

To publish from the repository root:

```bash
npm publish --access public
```

## Adding a new template

1. Create a new template directory, e.g. `next/`.
2. Add a runnable application scaffold inside that directory.
3. Include `.loom/blueprint.json` describing `roots`, `paths`, and `anchors`.
4. Add documentation in both the template's own `README.md` and the root `README.md`.
5. Update `CHANGELOG.md` and root `package.json` version.
6. Tag the release locally, for example `mern-v1.0.0`.

## Template compatibility and CLI connection

Templates in this repo are designed to work with Stackloom CLI commands such as:

- `loom new my-app --template mern`
- `loom generate resource Product --fields "name:string:required;price:number"
- `loom customize theme set clinicSoft`
- `loom customize layout set sidebarWorkspace`
- `loom customize ui set studio`
- `loom customize data set denseOps`

The CLI reads the template contract from `.loom/blueprint.json` and rewrites the
safe `app-preset.js` block for theming, layout, data display, and UI variant
presets without disturbing custom app code.

## Versioning and releases

- The root package version tracks releases of the published templates package.
- Use semantic versioning: patch for docs/fixes, minor for new templates or
  backward-compatible enhancements, major for breaking template contract changes.
- Tag releases using the template pattern, for example `mern-v1.0.0`.

## Recommended validation

- Confirm the template includes `.loom/blueprint.json`.
- Run the Stackloom CLI validation commands after scaffolding:
  - `loom check`
  - `loom doctor`
- Run `pnpm install` and `pnpm dev` in the template app directories to verify
  runtime readiness.
- Use the template's own `CUSTOMIZATION.md` to verify theme and layout presets.

## Accessibility and responsiveness

Templates in this repo follow a mobile-first UI design:

- Keyboard-accessible navigation and action controls.
- Focus-visible styles on interactive elements.
- Live-region announcements for pagination and status feedback.
- Skip link for rapid page navigation.
- Responsive dashboards, cards, tables, and forms.
