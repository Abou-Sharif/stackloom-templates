# StackLoom MERN — customization guide

This starter is designed so two teams can ship visibly different products from the same scaffold.

## Quick switches (CLI)

Run from the project root (where `frontend/src/config/app-preset.js` exists):

| Command | What it changes |
|--------|------------------|
| `loom customize theme set violetSanctum` | Color tokens, radius, shadows (8 themes) |
| `loom customize theme import --file ./theme.css` | Import a shadcn CSS theme (auto-applied) |
| `loom customize layout set sidebarWorkspace` | Shell: topbar / sidebar / hybrid |
| `loom customize data set denseOps` | Metrics grid + record list density |
| `loom customize ui set studio` | Card, modal, select, pagination personalities |
| `loom customize brand set --name "Acme"` | Brand name / tagline in preset |
| `loom customize font set` | Body + heading fonts (Google Fonts auto-import) |
| `loom customize css --file ./custom.css` | Inject custom CSS rules |

Discovery: `loom customize list-themes`, `list-layouts`, `list-data`, `list-ui`, `list-fonts`.

## Configuration layers

1. **`app-preset.js`** — single source of truth. Pick `presetVariants.*` or edit `appPreset` directly. The CLI rewrites targeted lines here (theme, layout, dataDisplay, ui, brand).
2. **`design-themes.js` / `design-layouts.js`** — token and shell recipes referenced by presets.
3. **`ui-variants.js`** — component personalities (card, modal, select, pagination, record cards).
4. **`data-display-templates.js`** — metrics + records layout, including pagination defaults.
5. **Component-level** — `Card variant=`, `AppModal variant=`, `SelectTrigger variant=`; most pages read `useAppPreset().ui` automatically.

## UI variants

| Preset | Best for | Card | Modal | Select | Pagination |
|--------|----------|------|-------|--------|------------|
| `refined` | SaaS default | elevated | centered | outline | numbered |
| `operations` | Admin / ops | outline | compact | minimal | compact |
| `studio` | Creative | glass | sheet (bottom) | soft | simple |
| `commerce` | Catalog | stat | wide | pill | numbered |
| `clinic` | Healthcare | soft | centered | outline | simple |

Edit `src/lib/ui-variant-classes.js` to tune Tailwind mappings without touching every component.

## Pagination

`ResponsiveRecordView` uses `usePagination` when `template.pagination.enabled` is true, or when row count exceeds `pageSize`. Configure in `data-display-templates.js`:

```js
records: {
  pagination: { enabled: true, pageSize: 10, pageSizeOptions: [10, 25, 50] },
}
```

## What the CLI merges vs what you own

| CLI-safe rewrites | Your files (manual) |
|-------------------|---------------------|
| `theme: designThemes.*` | New pages, routes, API modules |
| `layout: designLayouts.*` | Business components |
| `dataDisplay: dataDisplayTemplates.*` | `ui-variant-classes.js` tweaks |
| `ui: uiVariants.*` | Generated resources under `.loom/` |
| `brand: { name, tagline }` | Backend models beyond scaffold |

Generated resources use `loom resource sync` / `--amend` with merge zones — see StackLoom CLI docs.

## Accessibility

- Skip link in `AppShell` → `#main-content` on `PageWrapper`
- Pagination: `nav`, `aria-current="page"`, live region for counts
- Select: combobox/listbox roles, keyboard activate on items
- Modals: Radix Dialog / Sheet focus trap and titles
- `:focus-visible` uses `var(--focus-ring)` — theme-aware, overridable per appearance recipe
- `::selection` respects `--selection-bg` and `--selection-text` CSS vars
- Scrollbar styling via `--scrollbar-width`, `--scrollbar-track`, `--scrollbar-thumb`
- `prefers-reduced-motion`: all animations/transitions disabled, scroll-behavior set to auto
- `prefers-contrast: more`: border width thickened, focus offset increased

## Making it “not look like the starter”

1. `loom customize font set` — pick a distinctive body + heading font pair (e.g. Instrument Sans + Playfair Display)
2. `loom customize theme import --file ./theme.css` — paste a shadcn theme or use one of the 8 built-ins
3. `loom customize ui set commerce` + `theme set commerceWarm` + `layout set topbarPortal`
4. `loom customize css --css "..."` — inject brand-specific CSS overrides
5. Replace `dashboardCards`, landing copy, and navigation in `app-preset.js`
6. Tweak CSS variables via `loom customize css` or directly in `globals.css`
