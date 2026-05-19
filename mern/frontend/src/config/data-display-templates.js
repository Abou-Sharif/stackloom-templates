export const dataDisplayTemplates = {
  dashboard: {
    metrics: { columns: "auto", density: "comfortable", align: "start" },
    records: {
      mode: "cardsOnMobile",
      columns: "auto",
      density: "comfortable",
      pagination: { enabled: true, pageSize: 5, pageSizeOptions: [5, 10, 20] },
    },
  },
  denseOps: {
    metrics: { columns: "four", density: "compact", align: "start" },
    records: {
      mode: "tableOnDesktop",
      columns: "two",
      density: "compact",
      pagination: { enabled: true, pageSize: 10, pageSizeOptions: [10, 25, 50] },
    },
  },
  editorial: {
    metrics: { columns: "three", density: "spacious", align: "center" },
    records: {
      mode: "cards",
      columns: "three",
      density: "spacious",
      pagination: { enabled: false },
    },
  },
  commerce: {
    metrics: { columns: "four", density: "comfortable", align: "start" },
    records: {
      mode: "cardsOnMobile",
      columns: "three",
      density: "comfortable",
      pagination: { enabled: true, pageSize: 8, pageSizeOptions: [8, 16, 32] },
    },
  },
};
