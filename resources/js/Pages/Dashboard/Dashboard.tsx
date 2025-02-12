import { ContentLayout } from '@/components/layout/ContentLayout';
import EarningsChart, { EarningsChartData } from '@/Pages/Dashboard/Partials/EarningsChart';
import SubscriptionOverview, { SubscriptionOverviewData } from '@/Pages/Dashboard/Partials/SubscriptionOverview';
import { Head } from '@inertiajs/react';
import RecentUsers, { RecentUserTableData } from './Partials/RecentUsers';
import { PageProps } from '@/types';

export default function Dashboard({ 
    earningsChartData, 
    recentUserTableData,
    subscriptionData 
}: PageProps<{ 
    earningsChartData: EarningsChartData[], 
    recentUserTableData: RecentUserTableData[],
    subscriptionData: SubscriptionOverviewData
}>) {
    const breadcrumbData = [
        { href: "/dashboard", label: "Dashboard" },
    ];
    return (
        <ContentLayout items={breadcrumbData} >
            <div className='grid gap-4 md:grid-cols-3'>
                <div className='md:col-span-2'>
                    <Head title="Dashboard" />
                    <EarningsChart earningsChartData={earningsChartData} />
                </div>
                <div>
                    <SubscriptionOverview subscriptionData={subscriptionData} />
                </div>
                <div className='md:col-span-3'>
                    <RecentUsers recentUserTableData={recentUserTableData} />
                </div>
            </div>
        </ContentLayout>
    );
}
