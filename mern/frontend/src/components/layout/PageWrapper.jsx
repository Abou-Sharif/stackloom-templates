import { useAppPreset } from "@/hooks/useAppPreset";
import {
  alignClasses,
  maxWidthClasses,
  paddingClasses,
} from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export function PageWrapper({ title, subtitle, actions, className, children }) {
  const { layout } = useAppPreset();
  const content = layout.content || {};

  return (
    <main
      id="main-content"
      className={cn(
        "w-full",
        alignClasses[content.align || "center"],
        maxWidthClasses[content.maxWidth || "6xl"],
        paddingClasses[content.padding || "comfortable"],
        className,
      )}
    >
      {(title || subtitle || actions) && (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            {title ? (
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            ) : null}
            {subtitle ? (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </div>
      )}

      {children}
    </main>
  );
}
