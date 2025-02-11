import { ContentLayout } from '@/components/layout/ContentLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const breadcrumbData = [
        { href: "/dashboard", label: "Dashboard" },
    ];
    return (
        <ContentLayout items={breadcrumbData} >
            hello
        </ContentLayout>
    );
}
