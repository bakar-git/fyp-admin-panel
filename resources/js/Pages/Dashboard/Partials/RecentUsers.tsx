import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from '@inertiajs/react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import moment from 'moment'

export interface RecentUserTableData {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

export default function RecentUsers({recentUserTableData}: { recentUserTableData: RecentUserTableData[] }) {
    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>
                        Latest user registrations
                    </CardDescription>
                </div>
                <Link
                    href="/users"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                    View All Users →
                </Link>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentUserTableData.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="flex items-center gap-2">
                                    <span className="font-medium">{user.name}</span>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {moment(user.created_at).fromNow()} 
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
