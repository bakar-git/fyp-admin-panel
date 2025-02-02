import { ContentLayout } from '@/Components/layout/ContentLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const breadcrumbData = [
        { href: "/expense", label: "Expense List" },
    ];
    return (
        <ContentLayout items={breadcrumbData} >
            hello
        </ContentLayout>
    );
}
