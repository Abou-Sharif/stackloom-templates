/**
 * Component layout variants — each component has multiple structural designs
 * that change JSX arrangement, not just CSS values.
 *
 * Set via `loom customize component set <component> <variant>`.
 * Variant source files live in `src/variants/<Component>/<variant>.jsx`.
 */
export const componentLayouts = {
  sidebar: {
    default: {
      label: "Default sidebar",
      desc: "Slide-over on mobile, inline on desktop, configurable left/right side",
      file: "default.jsx",
    },
    mini: {
      label: "Mini sidebar",
      desc: "Icon-only collapsed state (4rem), expand labels on hover",
      file: "mini.jsx",
    },
    floating: {
      label: "Floating sidebar",
      desc: "Detached card with shadow, rounded corners, not attached to edge",
      file: "floating.jsx",
    },
    drawer: {
      label: "Drawer sidebar",
      desc: "Always overlay (desktop too), slides in from side like a drawer",
      file: "drawer.jsx",
    },
  },
  navbar: {
    default: {
      label: "Default navbar",
      desc: "Sticky top bar, brand left, nav center or end, auth controls right",
      file: "default.jsx",
    },
    floating: {
      label: "Floating navbar",
      desc: "Detached from top edge, rounded, shadow, centered content",
      file: "floating.jsx",
    },
    minimal: {
      label: "Minimal navbar",
      desc: "Thin bar with just logo + user menu — no nav links in bar",
      file: "minimal.jsx",
    },
    centered: {
      label: "Centered logo navbar",
      desc: "Logo centered prominently, nav links below or in sidebar",
      file: "centered.jsx",
    },
  },
  footer: {
    default: {
      label: "Default footer",
      desc: "Border-top with brand name, configurable alignment",
      file: "default.jsx",
    },
    minimal: {
      label: "Minimal footer",
      desc: "Thin line and small copyright text only",
      file: "minimal.jsx",
    },
    detailed: {
      label: "Detailed footer",
      desc: "Multi-column layout with links, social icons, and legal text",
      file: "detailed.jsx",
    },
  },
  card: {
    elevated: {
      label: "Elevated card",
      desc: "White background with shadow, rounded corners",
      file: "elevated.jsx",
    },
    glass: {
      label: "Glass card",
      desc: "Frosted glass with backdrop-blur, semi-transparent background",
      file: "glass.jsx",
    },
    bordered: {
      label: "Bordered card",
      desc: "Clean border with no shadow, flat design",
      file: "bordered.jsx",
    },
    stat: {
      label: "Stat card",
      desc: "Large value display, subtle gradient, minimal surrounding chrome",
      file: "stat.jsx",
    },
    flat: {
      label: "Flat card",
      desc: "No border, no shadow, just spacing and background tint",
      file: "flat.jsx",
    },
  },
  modal: {
    centered: {
      label: "Centered modal",
      desc: "Standard centered dialog with overlay, max-w-lg",
      file: "centered.jsx",
    },
    wide: {
      label: "Wide modal",
      desc: "Wider dialog for forms and data-heavy content",
      file: "wide.jsx",
    },
    sheet: {
      label: "Sheet modal",
      desc: "Bottom sheet that slides up — mobile-first interaction",
      file: "sheet.jsx",
    },
    compact: {
      label: "Compact modal",
      desc: "Small modal for confirmations, alerts, quick actions",
      file: "compact.jsx",
    },
  },
  formLayout: {
    stacked: {
      label: "Stacked form",
      desc: "Labels above inputs, one column — classic form layout",
      file: "stacked.jsx",
    },
    inline: {
      label: "Inline form",
      desc: "Labels beside inputs on the same row, compact",
      file: "inline.jsx",
    },
    floating: {
      label: "Floating label form",
      desc: "Labels float up inside the input border on focus/input",
      file: "floating.jsx",
    },
    multiColumn: {
      label: "Multi-column form",
      desc: "Grid layout with 2-3 columns for forms with many fields",
      file: "multi-column.jsx",
    },
  },
  dataDisplay: {
    standard: {
      label: "Standard table",
      desc: "Full table with header row, alternating not required",
      file: "standard.jsx",
    },
    dense: {
      label: "Dense table",
      desc: "Compact rows, smaller text, tighter spacing for admin views",
      file: "dense.jsx",
    },
    cardView: {
      label: "Card view",
      desc: "Rows rendered as cards with label-value pairs",
      file: "card-view.jsx",
    },
    striped: {
      label: "Striped table",
      desc: "Alternating row background colors for readability",
      file: "striped.jsx",
    },
  },
  button: {
    solid: {
      label: "Solid button",
      desc: "Filled background, primary color — standard call to action",
      file: "solid.jsx",
    },
    outline: {
      label: "Outline button",
      desc: "Border-only with transparent background",
      file: "outline.jsx",
    },
    ghost: {
      label: "Ghost button",
      desc: "No border or background, minimal hover state",
      file: "ghost.jsx",
    },
    gradient: {
      label: "Gradient button",
      desc: "Gradient background, bold visual presence",
      file: "gradient.jsx",
    },
    pill: {
      label: "Pill button",
      desc: "Fully rounded, larger padding, friendly appearance",
      file: "pill.jsx",
    },
  },
};
