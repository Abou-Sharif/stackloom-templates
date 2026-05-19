/**
 * UI variant presets — swap card, modal, select, and pagination personalities
 * via app-preset `ui` (or `loom customize ui set <name>`).
 */
export const uiVariants = {
  /** Balanced SaaS default */
  refined: {
    card: "elevated",
    modal: "centered",
    select: "outline",
    pagination: "numbered",
    recordCard: "default",
  },
  /** Dense operations / admin tables */
  operations: {
    card: "outline",
    modal: "compact",
    select: "minimal",
    pagination: "compact",
    recordCard: "compact",
  },
  /** Editorial / marketing-forward */
  studio: {
    card: "glass",
    modal: "sheet",
    select: "soft",
    pagination: "simple",
    recordCard: "media",
  },
  /** Commerce / catalog */
  commerce: {
    card: "stat",
    modal: "wide",
    select: "pill",
    pagination: "numbered",
    recordCard: "interactive",
  },
  /** Clinical / calm */
  clinic: {
    card: "soft",
    modal: "centered",
    select: "outline",
    pagination: "simple",
    recordCard: "default",
  },
};
