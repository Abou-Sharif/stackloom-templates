# stackloom-templates

The starter applications [`stackloom`](https://github.com/Abou-Sharif/stackloom)
scaffolds from. Each subdirectory is a complete, runnable application carrying
a `.loom/blueprint.json` — the architecture contract the CLI reads to generate
into it.

| Template          | Stack                                                                              | Tag       |
| ----------------- | ---------------------------------------------------------------------------------- | --------- |
| [`mern/`](./mern) | Express + MongoDB + Mongoose · React + Vite + Tailwind · refresh-token cookie auth | `mern-v*` |

## Using a template

```bash
# Via the CLI (recommended)
npx stackloom new my-app                 # uses the default (mern) template
loom new my-app --template mern          # explicit

# Or by hand — clone a tagged release tarball
curl -L https://github.com/Abou-Sharif/stackloom-templates/archive/refs/tags/mern-v1.0.0.tar.gz | tar xz
mv stackloom-templates-mern-v1.0.0/mern my-app
cd my-app && pnpm install && pnpm dev
```

## Adding a new template

A template is **any directory with a valid `.loom/blueprint.json`**. The
blueprint declares `roots` (which directories are the app layers), `paths`
(named path templates), and `anchors` (idempotent injection points). The CLI is
architecture-agnostic — it reads the blueprint and generates accordingly.

To add e.g. a Next.js template:

1. Create `next/` with a runnable Next.js app.
2. Author `next/.loom/blueprint.json` declaring the project's roots, paths and
   anchors (see [`mern/.loom/blueprint.json`](./mern/.loom/blueprint.json) for
   a reference).
3. Tag releases as `next-v1.0.0`.

## Repo split context

This repo and the [`stackloom`](https://github.com/Abou-Sharif/stackloom) CLI
were split out of a single monorepo. The split is documented in the CLI repo's
`SPLIT.md`. The CLI and the templates version **independently** — the
blueprint `schemaVersion` is the compatibility gate.

## License

MIT
