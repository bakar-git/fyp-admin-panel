import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LogoV1 from '@/components/LogoV1';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Head title="Email Verification" />
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center h-14">
                        <LogoV1 className="size-20" />
                        <h1 className="font-bold">POSTIFY</h1>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Email Verification
                    </h2>
                </div>

                <div className="text-sm text-gray-600">
                    Thanks for signing up! Before getting started, could you verify
                    your email address by clicking on the link we just emailed to
                    you? If you didn't receive the email, we will gladly send you
                    another.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="text-sm font-medium text-green-600">
                        A new verification link has been sent to the email address
                        you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="flex items-center justify-between">
                        <Button type="submit" disabled={processing}>
                            Resend Verification Email
                        </Button>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
