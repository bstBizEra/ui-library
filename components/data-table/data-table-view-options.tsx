"use client";

import {
  type ReactTable,
  type RowData,
  Subscribe,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import * as React from "react";

import type { DataTableFeatures } from "@/lib/data-table-features";

import { Button } from "@/components/ui/button";
import { useDirection } from "@/components/ui/direction";
import {
  Faceted,
  FacetedContent,
  FacetedEmpty,
  FacetedGroup,
  FacetedInput,
  FacetedItem,
  FacetedItemIndicator,
  FacetedList,
  FacetedTrigger,
} from "@/components/ui/faceted";
import { Settings2Icon } from "lucide-react";

// Source: https://github.com/sadmann7/tablecn/blob/2d74ac5827aa7abf60e334759e38cf7cdcb24d54/src/registry/bases/base/components/data-table/data-table-view-options.tsx
// Upstream: sadmann7/tablecn@2d74ac5827aa7abf60e334759e38cf7cdcb24d54
// Copied: 2026-11-04
// Licence: MIT (see THIRD_PARTY.md)
// Local change: imports rewritten from tablecn's registry paths to shadcn aliases; cn from "@/lib/utils" instead of the cn package; IconPlaceholder replaced with the lucide-react icons it resolves to.

interface DataTableViewOptionsProps<
  TData extends RowData,
> extends React.ComponentProps<typeof FacetedContent> {
  table: ReactTable<DataTableFeatures, TData, unknown>;
  disabled?: boolean;
}

export function DataTableViewOptions<TData extends RowData>({
  table,
  disabled,
  className,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const dir = useDirection();
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) => column.accessorFn !== undefined && column.getCanHide(),
        ),
    [table],
  );

  return (
    <Subscribe source={table.atoms.columnVisibility}>
      {(columnVisibility) => (
        <Faceted
          multiple
          value={columns
            .filter((column) => columnVisibility[column.id] !== false)
            .map((column) => column.id)}
        >
          <FacetedTrigger
            render={
              <Button
                aria-label="View columns"
                variant="outline"
                className="ms-auto hidden lg:flex"
                disabled={disabled}
              />
            }
          >
            <Settings2Icon className="text-muted-foreground" />
            View
          </FacetedTrigger>
          <FacetedContent
            aria-label="Columns"
            dir={dir}
            align="center"
            className={cn("w-44", className)}
            {...props}
          >
            <FacetedInput placeholder="Search columns..." />
            <FacetedList>
              <FacetedEmpty>No columns found.</FacetedEmpty>
              <FacetedGroup>
                {columns.map((column) => (
                  <FacetedItem
                    key={column.id}
                    value={column.id}
                    onSelect={() => column.toggleVisibility()}
                  >
                    <span className="truncate">
                      {column.columnDef.meta?.label ?? column.id}
                    </span>
                    <FacetedItemIndicator />
                  </FacetedItem>
                ))}
              </FacetedGroup>
            </FacetedList>
          </FacetedContent>
        </Faceted>
      )}
    </Subscribe>
  );
}
