import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2Icon } from "lucide-react";
import { DataTableColumnProps } from "@/components/data-table/data-table";
import { User } from "@/models/user";
import moment from "moment";

export const getColumns = ({ onRowEdit, onRowDelete }: DataTableColumnProps<User>): ColumnDef<User>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        maxSize: 50,
    },
    {
        accessorKey: "name",
        meta: { displayName: "Name" },
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
        accessorKey: "email",
        meta: { displayName: "Email" },
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        size: 200,
    },
    {
        accessorKey: "created_at",
        meta: { displayName: "Joined" },
        header: ({ column }) => <DataTableColumnHeader column={column} title="Joined" />,
        cell: ({ getValue }) => moment(getValue<string>()).format("DD MMM YYYY"),
    },
    {
        accessorKey: "email_verified_at",
        meta: { displayName: "Last Login" },
        header: ({ column }) => <DataTableColumnHeader column={column} title="Last Login" />,
        cell: ({ getValue }) => {
            const value = getValue<string>();
            return value ? moment(value).format("DD MMM YYYY") : "Never";
        },
    },
    {
        accessorKey: "payment_status",
        meta: { displayName: "Payment Status" },
        header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Status" />,
        cell: ({ getValue }) => {
            const value = getValue<string>();
            return (<span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                value === 'active' ? 'bg-primary text-primary-foreground' :
                value === 'inactive' ? 'bg-destructive text-destructive-foreground' :
                'bg-red-100 text-red-700'
            }`}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
            </span>);
        },
    },
    {
        accessorKey: "subscription_end",
        meta: { displayName: "Subscription Ends" },
        header: ({ column }) => <DataTableColumnHeader column={column} title="Subscription Ends" />,
        cell: ({ getValue }) => {
            const value = getValue<number>();
            return value ? moment.unix(value).format("DD MMM YYYY") : "Never";
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex justify-center gap-2">
                    <Button onClick={() => onRowEdit(row.original)} variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => onRowDelete(row.original)} variant="ghost" size="icon">
                        <Trash2Icon className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];
