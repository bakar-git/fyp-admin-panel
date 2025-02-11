import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LogoV1 from '@/components/LogoV1';
import { Link } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Head title="Forgot Password" />
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center h-14">
                        <LogoV1 className="size-20" />
                        <h1 className="font-bold">POSTIFY</h1>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Forgot Password
                    </h2>
                </div>

                <div className="text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email
                    address and we will email you a password reset link that will
                    allow you to choose a new one.
                </div>

                {status && (
                    <div className="text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Back to Login
                        </Link>
                        <Button type="submit" disabled={processing}>
                            Email Password Reset Link
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
