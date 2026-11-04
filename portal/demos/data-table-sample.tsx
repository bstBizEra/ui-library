"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { CalendarIcon, CircleDashedIcon, TextIcon } from "lucide-react"
import { useMemo } from "react"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Badge } from "@/components/ui/badge"
import { useDataTable } from "@/hooks/use-data-table"
import type { DataTableFeatures } from "@/lib/data-table-features"

// Synthetic sample data: invented invoices, not real customers.
type Invoice = { id: string; customer: string; status: "paid" | "pending" | "overdue"; amount: number; issued: Date }

const CUSTOMERS = ["Vientiane Coffee", "Mekong Logistics", "Luang Prabang Crafts", "Pakse Agro", "Savan Motors", "Nam Ngum Energy", "Lao Silk House"]
const STATUSES = ["paid", "pending", "overdue"] as const

export const INVOICES: Invoice[] = Array.from({ length: 47 }, (_, i) => ({
  id: `INV-${String(1001 + i)}`,
  customer: CUSTOMERS[(i * 3) % CUSTOMERS.length],
  status: STATUSES[(i * 7) % 3],
  amount: 150_000 + ((i * 937_000) % 9_850_000),
  issued: new Date(Date.UTC(2026, 9, 1 + (i % 31))),
}))

const kip = new Intl.NumberFormat("en", { maximumFractionDigits: 0 })
const column = createColumnHelper<DataTableFeatures, Invoice>()

const columns = column.columns([
  column.accessor("id", {
    id: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} label="Invoice" />,
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
    enableHiding: false,
  }),
  column.accessor("customer", {
    id: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} label="Customer" />,
    meta: { label: "Customer", placeholder: "Search customers…", variant: "text", icon: TextIcon },
    enableColumnFilter: true,
  }),
  column.accessor("status", {
    id: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} label="Status" />,
    cell: ({ row }) => (
      <Badge variant={row.original.status === "overdue" ? "destructive" : "outline"} className="capitalize">
        {row.original.status}
      </Badge>
    ),
    meta: {
      label: "Status",
      variant: "multi-select",
      options: STATUSES.map((s) => ({ label: s[0].toUpperCase() + s.slice(1), value: s })),
      icon: CircleDashedIcon,
    },
    enableColumnFilter: true,
  }),
  column.accessor("amount", {
    id: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} label="Amount (LAK)" />,
    cell: ({ row }) => <span className="tabular-nums">{kip.format(row.original.amount)}</span>,
    meta: { label: "Amount", variant: "number", filter: "range", min: 0, max: 10_000_000, unit: "₭" },
    enableColumnFilter: true,
  }),
  column.accessor("issued", {
    id: "issued",
    header: ({ column }) => <DataTableColumnHeader column={column} label="Issued" />,
    cell: ({ row }) => row.original.issued.toISOString().slice(0, 10),
    meta: { label: "Issued", variant: "date", icon: CalendarIcon },
    enableColumnFilter: true,
  }),
])

export function DataTableSample({ rows }: { rows: "none" | "all" }) {
  const data = useMemo(() => (rows === "none" ? [] : INVOICES), [rows])
  const { table } = useDataTable({ columns, data, mode: "client", getRowId: (r) => r.id })
  return (
    <div className="w-full">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  )
}
