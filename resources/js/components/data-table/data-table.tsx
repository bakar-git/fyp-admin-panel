import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useMemo, useState, ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, PlusIcon } from "lucide-react"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuPortal,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Edit, Trash2 } from 'lucide-react' // For icons

export interface DataTableColumnProps<TData> {
    onRowEdit: (row: TData) => void;
    onRowDelete: (row: TData) => void;
}

interface DataTableProps<TData> {
    getColumns: ({ onRowEdit, onRowDelete }: DataTableColumnProps<TData>) => ColumnDef<TData>[]
    data: TData[] | null
    tableTitle: string
    onRowEdit: (updatedRow: TData) => void
    onRowDelete: (deletedRow: TData) => void
    onRowCreate: () => void
    topOptions?: ReactNode;
}

export interface DataTableDialogProps<TData> {
    row: TData | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: (updatedRow: TData) => void;
    onCreate: (newRow: TData) => void;
    modalType: 'new' | 'edit';
}

export function DataTable<TData>({
    getColumns,
    data,
    onRowEdit,
    onRowDelete,
    onRowCreate,
    tableTitle,
    topOptions,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})


    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30,
    });

    const RowContextMenu = ({ children, onEdit, onDelete, onCreate }: { children: ReactNode; onEdit: () => void; onDelete: () => void; onCreate: () => void; }) => (
        <ContextMenu>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuPortal>
                <ContextMenuContent>
                    <ContextMenuItem onClick={onCreate} className="text-sm space-x-2">
                        <Plus size={16} />
                        <span>Create New Row</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={onEdit} className="text-sm space-x-2">
                        <Edit className="text-blue-600" size={16} />
                        <span>Edit Row</span>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={onDelete} className="text-sm space-x-2">
                        <Trash2 className="text-red-600" size={16} />
                        <span>Delete Row</span>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenuPortal>
        </ContextMenu>
    );

    const columns = useMemo(() => getColumns({ onRowEdit, onRowDelete }), []);
    const table = useReactTable({
        data : (data || []),
        columns,
        enableMultiSort: true,
        enableFilters: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            pagination,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        columnResizeMode: 'onChange',
    })

    // Calculate column sizes using CSS variables
    const columnSizeVars = useMemo(() => {
        const headers = table.getFlatHeaders();
        const colSizes: { [key: string]: number } = {};

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]!;
            colSizes[`--header-${header.id}-size`] = header.getSize();
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
        }

        return colSizes;
    }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

    const viewOptions = useMemo(() => <DataTableViewOptions table={table} />, [table.getState().columnVisibility]);

    return (
        <div className="mx-auto w-full space-y-5">
            <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">{tableTitle}</h1>
                <div className="flex ml-auto space-x-2">
                    {topOptions && topOptions}
                    {viewOptions}
                    <Button onClick={() => onRowCreate()} variant="default" className="h-8 flex gap-2" size="sm">
                        <PlusIcon className="size-4" />
                        New
                    </Button>
                </div>
            </div>
            <Card>
                <CardContent className="pt-4">
                    <div className="space-y-4">
                        <ScrollArea className="rounded-md border">
                            <Table className="mx-auto" style={{
                                ...columnSizeVars,
                            }}>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow className="bg-accent/50 hover:bg-accent/50" key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead
                                                        key={header.id}
                                                        // className="px-1"
                                                        style={{
                                                            width: `calc(var(--header-${header.id}-size) * 1px)`,
                                                            minWidth: `calc(var(--header-${header.id}-size) * 1px)`,
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                        {/* Resizer */}
                                                        {header.column.getCanResize() ? (
                                                            <div
                                                                onMouseDown={header.getResizeHandler()}
                                                                onTouchStart={header.getResizeHandler()}
                                                                className={cn(
                                                                    "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none",
                                                                    "bg-primary/5 hover:bg-primary/50 active:bg-primary",
                                                                    header.column.getIsResizing() && "bg-primary"
                                                                )}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        ) : (
                                                            <div
                                                                className={cn(
                                                                    "absolute right-0 top-0 h-full w-1",
                                                                    "bg-primary/5",
                                                                )}
                                                            />
                                                        )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <RowContextMenu
                                                key={row.id}
                                                onCreate={() => onRowCreate()}
                                                onEdit={() => onRowEdit(row.original)}
                                                onDelete={() => onRowDelete(row.original)}
                                            >
                                                <TableRow
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                    onDoubleClick={() => onRowEdit(row.original)}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className="py-0"
                                                            style={{
                                                                width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                                                                maxWidth: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                                                            }}
                                                        >
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </RowContextMenu>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <DataTablePagination table={table} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}