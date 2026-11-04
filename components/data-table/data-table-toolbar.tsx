"use client";

import {
  type Column,
  type ReactTable,
  type RowData,
  Subscribe,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import * as React from "react";

import type { DataTableFeatures } from "@/lib/data-table-features";

import {
  getColumnSelectOptions,
  getFilterVariant,
} from "@/lib/data-table-utils";
import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableSliderFilter } from "@/components/data-table/data-table-slider-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { XIcon } from "lucide-react";

// Source: https://github.com/sadmann7/tablecn/blob/2d74ac5827aa7abf60e334759e38cf7cdcb24d54/src/registry/bases/base/components/data-table/data-table-toolbar.tsx
// Upstream: sadmann7/tablecn@2d74ac5827aa7abf60e334759e38cf7cdcb24d54
// Copied: 2026-11-04
// Licence: MIT (see THIRD_PARTY.md)
// Local change: imports rewritten from tablecn's registry paths to shadcn aliases; cn from "@/lib/utils" instead of the cn package; IconPlaceholder replaced with the lucide-react icons it resolves to.

interface DataTableToolbarProps<
  TData extends RowData,
> extends React.ComponentProps<"div"> {
  table: ReactTable<DataTableFeatures, TData, unknown>;
}

export function DataTableToolbar<TData extends RowData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table],
  );

  function onReset() {
    table.resetColumnFilters(true);
    table.resetJoinOperator(true);
  }

  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {columns.map((column) => (
          <DataTableToolbarFilter key={column.id} column={column} />
        ))}
        <Subscribe
          source={table.atoms.columnFilters}
          selector={(filters) => filters.length > 0}
        >
          {(isFiltered) =>
            isFiltered && (
              <Button
                aria-label="Reset filters"
                variant="outline"
                onClick={onReset}
              >
                <XIcon />
                Reset
              </Button>
            )
          }
        </Subscribe>
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} align="end" />
      </div>
    </div>
  );
}

interface DataTableToolbarFilterProps<TData extends RowData> {
  column: Column<DataTableFeatures, TData>;
}

function DataTableToolbarFilter<TData extends RowData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  const columnMeta = column.columnDef.meta;
  if (!columnMeta?.variant) return null;

  const title = columnMeta.label ?? column.id;
  const placeholder = columnMeta.placeholder ?? columnMeta.label;
  const filterVariant = getFilterVariant(columnMeta);

  switch (filterVariant) {
    case "text":
      return (
        <DataTableFilterInput
          column={column}
          placeholder={placeholder}
          className="w-40 lg:w-56"
        />
      );

    case "number":
      return (
        <DataTableFilterInput
          column={column}
          type="number"
          inputMode="numeric"
          placeholder={placeholder}
          unit={columnMeta.variant === "number" ? columnMeta.unit : undefined}
          className="w-30"
        />
      );

    case "range":
      return <DataTableSliderFilter column={column} title={title} />;

    case "date":
    case "date-range":
      return (
        <DataTableDateFilter
          column={column}
          title={title}
          multiple={filterVariant === "date-range"}
        />
      );

    case "select":
    case "multi-select":
      return (
        <DataTableFacetedFilter
          column={column}
          title={title}
          options={getColumnSelectOptions(columnMeta)}
          multiple={filterVariant === "multi-select"}
        />
      );

    default:
      return null;
  }
}

interface DataTableFilterInputProps<
  TData extends RowData,
> extends React.ComponentProps<"input"> {
  column: Column<DataTableFeatures, TData>;
  unit?: string;
}

function DataTableFilterInput<TData extends RowData>({
  column,
  type = "text",
  unit,
  className,
  ...props
}: DataTableFilterInputProps<TData>) {
  return (
    <Subscribe
      source={column.table.atoms.columnFilters}
      selector={() => column.getFilterValue()}
    >
      {(filterValue) => {
        const inputProps = {
          type,
          ...props,
          value: readFilterInputValue(filterValue),
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            column.setFilterValue(event.target.value || undefined),
        };

        if (!unit) return <Input {...inputProps} className={className} />;

        return (
          <InputGroup className={className}>
            <InputGroupInput {...inputProps} />
            <InputGroupAddon align="inline-end">
              <InputGroupText>{unit}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        );
      }}
    </Subscribe>
  );
}

function readFilterInputValue(value: unknown) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.join(",");
  }

  return "";
}
