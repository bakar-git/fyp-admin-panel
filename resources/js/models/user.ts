export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    email_verified_at?: string | null;
    updated_at?: string;
    password?: string;
}
