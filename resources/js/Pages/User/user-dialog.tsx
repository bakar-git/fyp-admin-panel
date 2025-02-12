import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DataTableDialogProps } from "@/components/data-table/data-table";
import { User } from "@/models/user";

export function UserDialog({ row, open, onOpenChange, onEdit, onCreate, modalType }: DataTableDialogProps<User>) {
    const [formData, setFormData] = useState<User | null>(row);

    useEffect(() => {
        setFormData(row);
    }, [open]);

    if (!row || !formData) return null;

    const handleSave = () => {
        if (formData) {
            modalType === 'new' ? onCreate(formData) : onEdit(formData);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{modalType === 'new' ? "New User" : "Edit User"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name">Name</label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="password">Password</label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password || ''}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="col-span-3"
                            placeholder={modalType === 'edit' ? "Leave empty to keep current password" : "Enter password"}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>{modalType === 'new' ? "Create" : "Update"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
