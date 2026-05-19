import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paginationVariantClasses } from "@/lib/ui-variant-classes";
import { cn } from "@/lib/utils";

function pageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const list = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < list.length; i++) {
    if (i > 0 && list[i] - list[i - 1] > 1) out.push("ellipsis");
    out.push(list[i]);
  }
  return out;
}

/**
 * Accessible pagination bar for data tables and lists.
 */
export function DataPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  rangeStart,
  rangeEnd,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  variant = "numbered",
  selectVariant = "outline",
  className,
}) {
  if (totalItems === 0) return null;

  const variantClass = paginationVariantClasses[variant] || paginationVariantClasses.numbered;
  const showNumbers = variant !== "simple";

  return (
    <nav
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}
      aria-label="Pagination"
    >
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing <span className="font-medium text-foreground">{rangeStart}</span>
        {" – "}
        <span className="font-medium text-foreground">{rangeEnd}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span>
      </p>

      <div className={cn("flex flex-wrap items-center", variantClass)}>
        {onPageSizeChange && (
          <div className="mr-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground" id="page-size-label">
              Rows
            </span>
            <Select value={String(pageSize)} onValueChange={(v) => onPageSizeChange(Number(v))}>
              <SelectTrigger
                variant={selectVariant}
                className="h-8 w-[4.5rem]"
                aria-label="Rows per page"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </Button>

        {showNumbers &&
          pageNumbers(page, totalPages).map((item, i) =>
            item === "ellipsis" ? (
              <span key={`e-${i}`} className="px-1 text-muted-foreground" aria-hidden>
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                variant={item === page ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
              >
                {item}
              </Button>
            ),
          )}

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </nav>
  );
}
