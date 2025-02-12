import { useEffect, useState } from 'react';
import { getColumns } from './columns';
import { UserDialog } from './user-dialog';
import { toast } from 'sonner';
import { DataTable } from '@/components/data-table/data-table';
import { User } from '@/models/user';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';

export default function Index({allUsers} : PageProps<{ allUsers: User[] }>) {
    const breadcrumbData = [
        { href: "/users", label: "All Users" },
    ];

    const [selectedRow, setSelectedRow] = useState<User | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"new" | "edit">('new');

    const handleRowEdit = async (updatedRow: User) => {
        try {
            const data = {
                name: updatedRow.name,
                email: updatedRow.email,
                ...(updatedRow.password ? { password: updatedRow.password } : {})
            };
            
            router.put(route('users.update', {id: updatedRow.id}), data, {
                onError: (error) => {
                    console.log("Error Updating User", error);
                    toast.error("Error Updating User");
                },
                onSuccess: () => {
                    toast.success("User updated successfully");
                    router.reload({only: ['allUsers']});
                }
            });
        } catch (error) {
            console.log("Error", error);
            toast.error("Some Error Occurred");
        }
    };

    const handleRowDelete = async (deletedRow: User) => {
        try {
            router.delete(route('users.destroy', {id: deletedRow.id}), {
                onError: (error) => {
                    console.log("Error Deleting User", error);
                    toast.error("Error Deleting User");
                },
                onSuccess: () => {
                    toast.success("User deleted successfully");
                    router.reload({only: ['allUsers']});
                }
            });
        } catch (error) {
            console.log("Error", error);
            toast.error("Some Error Occurred");
        }
    };

    const handleRowCreate = async (newRow: User) => {
        try {
            const data = {
                name: newRow.name,
                email: newRow.email,
                password: newRow.password
            };
            
            router.post(route('users.store'), data, {
                onError: (error) => {
                    console.log("Error Creating User", error);
                    toast.error("Error Creating User");
                },
                onSuccess: () => {
                    toast.success("User created successfully");
                    router.reload({only: ['allUsers']});
                }
            });
        } catch (error) {
            console.log("Error", error);
            toast.error("Some Error Occurred");
        }
    };

    const handleRowEditRequest = (row: User) => {
        setSelectedRow(row);
        setModalType("edit");
        setModalOpen(true);
    };

    const handleRowCreateRequest = () => {
        const newRow: User = {
            id: Date.now(),
            name: "",
            email: ""
        };
        setSelectedRow(newRow);
        setModalType("new");
        setModalOpen(true);
    };

    return (
        <ContentLayout items={breadcrumbData}>
            <DataTable 
                data={allUsers} 
                onRowEdit={handleRowEditRequest} 
                onRowCreate={handleRowCreateRequest} 
                onRowDelete={handleRowDelete} 
                getColumns={getColumns} 
                tableTitle='Users List' 
            />
            <UserDialog
                row={selectedRow}
                open={modalOpen}
                onOpenChange={setModalOpen}
                onEdit={handleRowEdit}
                onCreate={handleRowCreate}
                modalType={modalType}
            />
        </ContentLayout>
    );
}
