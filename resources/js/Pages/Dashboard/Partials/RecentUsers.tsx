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
    avatar: string;
    paymentStatus: 'paid' | 'pending' | 'failed';
    createdAt: Date;
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
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentUserTableData.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{user.name}</span>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                        user.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                        user.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {user.paymentStatus.charAt(0).toUpperCase() + user.paymentStatus.slice(1)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {moment(user.createdAt).fromNow()} 
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
