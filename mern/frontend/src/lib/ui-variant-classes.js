/** Tailwind class maps for `ui-variants.js` keys — consumed by Card, AppModal, Select, pagination. */

export const cardVariantClasses = {
  default:
    "rounded-[var(--radius-card)] border bg-card text-card-foreground shadow-[var(--shadow-card)] [border-width:var(--border-width)]",
  outline:
    "rounded-[var(--radius-card)] border-2 border-border/80 bg-transparent text-card-foreground",
  elevated:
    "rounded-[var(--radius-card)] border-0 bg-card text-card-foreground shadow-[var(--shadow-panel)]",
  glass:
    "rounded-[var(--radius-card)] border border-white/20 bg-card/80 text-card-foreground shadow-lg backdrop-blur-md dark:border-white/10",
  stat:
    "rounded-[var(--radius-card)] border bg-gradient-to-br from-card to-muted/40 text-card-foreground shadow-[var(--shadow-card)] [border-width:var(--border-width)]",
  soft:
    "rounded-[var(--radius-card)] border-0 bg-muted/50 text-card-foreground shadow-none",
};

export const modalContentClasses = {
  centered:
    "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
  wide:
    "fixed left-1/2 top-1/2 z-50 grid w-[min(100vw-2rem,56rem)] max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
  compact:
    "fixed left-1/2 top-1/2 z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-3 border bg-background p-4 shadow-md duration-200 sm:rounded-md",
  sheet:
    "fixed inset-x-0 bottom-0 z-50 grid max-h-[85vh] gap-4 border-t bg-background p-6 shadow-lg duration-200 sm:rounded-t-xl",
};

export const selectTriggerClasses = {
  outline:
    "flex h-[var(--control-height)] w-full items-center justify-between rounded-[var(--radius-input)] border border-input bg-background px-[var(--input-px)] text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  minimal:
    "flex h-9 w-full items-center justify-between border-b border-input bg-transparent px-1 text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary",
  soft:
    "flex h-[var(--control-height)] w-full items-center justify-between rounded-[var(--radius-input)] border-0 bg-muted px-[var(--input-px)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  pill:
    "flex h-9 w-full items-center justify-between rounded-full border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
};

export const paginationVariantClasses = {
  numbered: "gap-1",
  compact: "gap-0.5 text-xs",
  simple: "gap-2",
};

export const recordCardVariantClasses = {
  default: "",
  compact: "[&_.record-row]:py-1.5",
  media: "overflow-hidden",
  interactive:
    "transition-shadow hover:shadow-[var(--shadow-panel)] focus-within:ring-2 focus-within:ring-ring",
};
