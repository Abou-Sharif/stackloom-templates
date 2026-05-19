import { DataPagination } from "@/components/data/DataPagination";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { useAppPreset } from "@/hooks/useAppPreset";
import { dataDensityClasses, dataGridColumns } from "@/lib/data-display-classes";
import { recordCardVariantClasses } from "@/lib/ui-variant-classes";
import { cn } from "@/lib/utils";

function RecordCard({ columns, row, cardVariant, recordCardVariant, index }) {
  return (
    <Card
      role="listitem"
      variant={cardVariant}
      className={cn("record-card", recordCardVariantClasses[recordCardVariant])}
    >
      <CardContent className="space-y-3 pt-[var(--card-padding)]">
        {columns.map((column) => (
          <div className="record-row flex items-start justify-between gap-4" key={column.key}>
            <span className="text-sm text-muted-foreground">{column.label}</span>
            <span className="text-right text-sm font-medium">{row[column.key]}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function MobileCards({ columns, rows, cardVariant, recordCardVariant, className = "md:hidden" }) {
  return (
    <div className={cn("grid gap-[var(--data-gap)]", className)} role="list">
      {rows.map((row, index) => (
        <RecordCard
          key={row.id || index}
          columns={columns}
          row={row}
          cardVariant={cardVariant}
          recordCardVariant={recordCardVariant}
          index={index}
        />
      ))}
    </div>
  );
}

function DesktopTable({ columns, rows }) {
  return (
    <div className="hidden md:block">
      <Table className="rounded-[var(--radius-card)] border bg-card shadow-[var(--shadow-card)] [border-width:var(--border-width)]">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} scope="col">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id || index}>
              {columns.map((column) => (
                <TableCell key={column.key} className="h-[var(--data-row-height)]">
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function ResponsiveRecordView({ columns = [], rows = [], template = {} }) {
  const preset = useAppPreset();
  const ui = preset.ui || {};
  const cardVariant = ui.card || "default";
  const recordCardVariant = ui.recordCard || "default";
  const paginationVariant = ui.pagination || "numbered";

  const paginationConfig = template.pagination || {};
  const pageSizeDefault = paginationConfig.pageSize ?? 10;
  const paginationEnabled =
    paginationConfig.enabled ?? rows.length > pageSizeDefault;
  const initialPageSize = pageSizeDefault;

  const {
    pageItems,
    page,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
    setPageSize,
    rangeStart,
    rangeEnd,
  } = usePagination(rows, {
    pageSize: initialPageSize,
    initialPage: 1,
  });

  const displayRows = paginationEnabled ? pageItems : rows;
  const density = template.density || "comfortable";

  const paginationBar =
    paginationEnabled && totalItems > 0 ? (
      <DataPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        onPageChange={goToPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={paginationConfig.pageSizeOptions || [5, 10, 20, 50]}
        variant={paginationVariant}
        selectVariant={ui.select || "outline"}
      />
    ) : null;

  if (template.mode === "cards") {
    return (
      <section
        className={cn(
          "space-y-[var(--data-gap)]",
          dataGridColumns[template.columns || "three"],
          dataDensityClasses[density],
        )}
        aria-label="Records"
      >
        <div className={cn("grid", dataGridColumns[template.columns || "three"])}>
          {displayRows.map((row, index) => (
            <RecordCard
              key={row.id || index}
              columns={columns}
              row={row}
              cardVariant={cardVariant}
              recordCardVariant={recordCardVariant}
              index={index}
            />
          ))}
        </div>
        {paginationBar}
      </section>
    );
  }

  return (
    <section
      className={cn("space-y-[var(--data-gap)]", dataDensityClasses[density])}
      aria-label="Records"
    >
      <MobileCards
        columns={columns}
        rows={displayRows}
        cardVariant={cardVariant}
        recordCardVariant={recordCardVariant}
      />
      <DesktopTable columns={columns} rows={displayRows} />
      {paginationBar}
    </section>
  );
}
