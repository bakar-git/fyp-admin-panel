import { ContentLayout } from '@/components/layout/ContentLayout';
import EarningsChart, { EarningsChartData } from '@/Pages/Dashboard/Partials/EarningsChart';
import { Head } from '@inertiajs/react';
import RecentUsers, { RecentUserTableData } from './Partials/RecentUsers';
import { PageProps } from '@/types';

export default function Dashboard({ earningsChartData, recentUserTableData } : PageProps<{ earningsChartData: EarningsChartData[], recentUserTableData: RecentUserTableData[] }>) {
    const breadcrumbData = [
        { href: "/dashboard", label: "Dashboard" },
    ];
    return (
        <ContentLayout items={breadcrumbData} >
            <div className='space-y-4'>
                <Head title="Dashboard" />
                <EarningsChart earningsChartData={earningsChartData} />
                <RecentUsers recentUserTableData={recentUserTableData} />
            </div>
        </ContentLayout>
    );
}
