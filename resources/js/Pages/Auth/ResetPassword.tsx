import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LogoV1 from '@/components/LogoV1';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Head title="Reset Password" />
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center h-14">
                        <LogoV1 className="size-20" />
                        <h1 className="font-bold">POSTIFY</h1>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Reset Password
                    </h2>
                </div>

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
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">{errors.password}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            {errors.password_confirmation && (
                                <span className="text-sm text-red-500">{errors.password_confirmation}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
