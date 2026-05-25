import { useAppPreset } from "@/hooks/useAppPreset";

const layouts = {
  stacked: {
    Field: ({ label, error, children, className }) => (
      <div className={`space-y-1.5 ${className || ""}`}>
        {label && <label className="text-sm font-medium">{label}</label>}
        {children}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    ),
    Row: ({ children, className }) => <div className={`space-y-4 ${className || ""}`}>{children}</div>,
    Actions: ({ children, className }) => <div className={`flex items-center gap-2 pt-4 ${className || ""}`}>{children}</div>,
  },
  inline: {
    Field: ({ label, error, children, className }) => (
      <div className={`flex items-baseline gap-3 ${className || ""}`}>
        {label && <label className="w-32 shrink-0 pt-2 text-right text-sm font-medium">{label}</label>}
        <div className="flex-1">
          {children}
          {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </div>
      </div>
    ),
    Row: ({ children, className }) => <div className={`space-y-3 ${className || ""}`}>{children}</div>,
    Actions: ({ children, className }) => <div className={`flex items-center gap-2 pl-32 pt-4 ${className || ""}`}>{children}</div>,
  },
  floating: {
    Field: ({ label, error, children, className }) => (
      <div className={`relative ${className || ""}`}>
        <div className="group">
          {children}
          {label && (
            <label className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-150 group-focus-within:top-2 group-focus-within:-translate-y-full group-focus-within:text-xs group-focus-within:text-primary [&:has(~input:not(:placeholder-shown))]:top-2 [&:has(~input:not(:placeholder-shown))]:-translate-y-full [&:has(~input:not(:placeholder-shown))]:text-xs">
              {label}
            </label>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    ),
    Row: ({ children, className }) => <div className={`space-y-5 ${className || ""}`}>{children}</div>,
    Actions: ({ children, className }) => <div className={`flex items-center gap-2 pt-6 ${className || ""}`}>{children}</div>,
  },
  multiColumn: {
    Field: ({ label, error, children, className }) => (
      <div className={`space-y-1.5 ${className || ""}`}>
        {label && <label className="text-sm font-medium">{label}</label>}
        {children}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    ),
    Row: ({ children, className }) => <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className || ""}`}>{children}</div>,
    Actions: ({ children, className }) => <div className={`flex items-center gap-2 pt-6 sm:col-span-2 lg:col-span-3 ${className || ""}`}>{children}</div>,
  },
};

function useFormLayout() {
  const preset = useAppPreset();
  const name = preset?.componentLayouts?.formLayout || "stacked";
  return layouts[name] || layouts.stacked;
}

export function FormField(props) {
  const { Field } = useFormLayout();
  return <Field {...props} />;
}

export function FormRow(props) {
  const { Row } = useFormLayout();
  return <Row {...props} />;
}

export function FormActions(props) {
  const { Actions } = useFormLayout();
  return <Actions {...props} />;
}
