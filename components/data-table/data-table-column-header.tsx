"use client";

import {
  type Column,
  type RowData,
  type SortDirection,
  type SortingState,
  Subscribe,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import * as React from "react";

import type { DataTableFeatures } from "@/lib/data-table-features";

import { useDirection } from "@/components/ui/direction";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon, EyeOffIcon } from "lucide-react";

// Source: https://github.com/sadmann7/tablecn/blob/2d74ac5827aa7abf60e334759e38cf7cdcb24d54/src/registry/bases/base/components/data-table/data-table-column-header.tsx
// Upstream: sadmann7/tablecn@2d74ac5827aa7abf60e334759e38cf7cdcb24d54
// Copied: 2026-11-04
// Licence: MIT (see THIRD_PARTY.md)
// Local change: imports rewritten from tablecn's registry paths to shadcn aliases; cn from "@/lib/utils" instead of the cn package; IconPlaceholder replaced with the lucide-react icons it resolves to.

interface DataTableColumnHeaderProps<
  TData extends RowData,
  TValue,
> extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<DataTableFeatures, TData, TValue>;
  label: string;
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  label,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{label}</div>;
  }

  return (
    <Subscribe
      source={column.table.store}
      selector={(state) => ({
        isVisible: state.columnVisibility[column.id] !== false,
        sortDirection: getSortDirection(state.sorting, column.id),
      })}
    >
      {(headerState) => (
        <DataTableColumnHeaderMenu
          column={column}
          label={label}
          className={className}
          isVisible={headerState.isVisible}
          sortDirection={headerState.sortDirection}
          {...props}
        />
      )}
    </Subscribe>
  );
}

interface DataTableColumnHeaderMenuProps<
  TData extends RowData,
  TValue,
> extends DataTableColumnHeaderProps<TData, TValue> {
  isVisible: boolean;
  sortDirection: SortDirection | "none";
}

function DataTableColumnHeaderMenu<TData extends RowData, TValue>({
  column,
  label,
  className,
  isVisible,
  sortDirection,
  ...props
}: DataTableColumnHeaderMenuProps<TData, TValue>) {
  const dir = useDirection();

  function onSortDirectionChange(direction: SortDirection) {
    if (sortDirection === direction) {
      column.clearSorting();
      return;
    }

    column.toggleSorting(direction === "desc", true);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "-ms-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:ring-1 focus:ring-ring focus:outline-none data-[state=open]:bg-accent rtl:flex-row-reverse [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        {label}
        {column.getCanSort() &&
          (sortDirection === "desc" ? (
            <ChevronDownIcon />
          ) : sortDirection === "asc" ? (
            <ChevronUpIcon />
          ) : (
            <ChevronsUpDownIcon />
          ))}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        dir={dir}
        align="start"
        className="w-28 data-closed:fill-mode-forwards"
      >
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              className="[&_svg]:text-muted-foreground"
              checked={sortDirection === "asc"}
              onClick={() => onSortDirectionChange("asc")}
            >
              <ChevronUpIcon />
              Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="[&_svg]:text-muted-foreground"
              checked={sortDirection === "desc"}
              onClick={() => onSortDirectionChange("desc")}
            >
              <ChevronDownIcon />
              Desc
            </DropdownMenuCheckboxItem>
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuCheckboxItem
            className="[&_svg]:text-muted-foreground"
            checked={!isVisible}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOffIcon />
            Hide
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getSortDirection(
  sorting: SortingState,
  columnId: string,
): SortDirection | "none" {
  const sort = sorting.find((sort) => sort.id === columnId);
  if (!sort) return "none";
  return sort.desc ? "desc" : "asc";
}
