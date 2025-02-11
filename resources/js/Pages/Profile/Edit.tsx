import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { ContentLayout } from '@/components/layout/ContentLayout';

export default function Edit({
    status,
}: PageProps<{ status?: string }>) {
    const breadcrumbData = [
        { href: "/dashboard", label: "Dashboard" },
    ];
    return (
        <ContentLayout items={breadcrumbData} >
            <Head title="Profile" />

            <div className="mx-auto max-w-3xl space-y-6">
                <UpdateProfileInformationForm
                    status={status}
                />

                <UpdatePasswordForm />

                <DeleteUserForm />
            </div>
        </ContentLayout>
    );
}
