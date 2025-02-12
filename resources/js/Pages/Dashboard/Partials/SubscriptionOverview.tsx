import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export interface SubscriptionOverviewData {
    totalSubscribers: number;
    activeSubscriptions: number;
    monthlyRecurringRevenue: number;
    retentionRate: number;
}

export default function SubscriptionOverview({ subscriptionData }: { subscriptionData: SubscriptionOverviewData }) {
    return (
        <Card>
            <CardHeader className="border-b py-5">
                <CardTitle>Subscription Overview</CardTitle>
                <CardDescription>Monthly subscription metrics</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Active Subscriptions</div>
                        <div className="text-sm text-gray-600">{subscriptionData.activeSubscriptions}</div>
                    </div>
                    <Progress 
                        value={(subscriptionData.activeSubscriptions / subscriptionData.totalSubscribers) * 100} 
                        className="h-2 bg-gray-100" 
                    />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="text-sm font-medium">Monthly Revenue</div>
                    <div className="text-xl font-bold">${subscriptionData.monthlyRecurringRevenue}</div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="text-sm font-medium">Retention Rate</div>
                    <div className="text-xl font-bold">{subscriptionData.retentionRate}%</div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="text-sm font-medium">Total Subscribers</div>
                    <div className="text-xl font-bold">{subscriptionData.totalSubscribers}</div>
                </div>
            </CardContent>
        </Card>
    )
}
