# Developer Guide

This repository contains starter application templates for the Stackloom CLI.
Each template folder is a runnable app with its own `.loom/blueprint.json` file.

## Repository structure

- `mern/` — the primary MERN starter template used by default.
- `README.md` — repository-level usage and template overview.
- `CHANGELOG.md` — release notes for the templates repository.
- `DEVELOPER.md` — this guide.
- `package.json` — root metadata for template release versioning.

## Adding a new template

1. Create a new template directory, e.g. `next/`.
2. Add a runnable application scaffold inside the template directory.
3. Include `.loom/blueprint.json` describing `roots`, `paths`, and `anchors`.
4. Verify the template can be installed and run locally.
5. Add documentation entries in `README.md`.
6. Update `CHANGELOG.md` before publishing template releases.

## Versioning and releases

- The root package version is used to track template repository releases.
- Use semantic versioning: patch for docs/fixes, minor for new templates or backward-compatible enhancements, major for breaking blueprint or compatibility changes.
- Tag releases using the repository name and version if needed, e.g. `mern-v1.0.0` for the MERN template release.

## Recommended validation

- Confirm the template includes `.loom/blueprint.json`.
- Validate generated template structure using the CLI's template validation logic.
- Run `pnpm install` and `pnpm dev` in the template's app directories to ensure they boot.

## Publishing notes

This repository is not currently published as an npm package, but root versioning is tracked via `package.json`.
For release automation, add CI that checks `CHANGELOG.md`, `package.json`, and template blueprint compatibility.
