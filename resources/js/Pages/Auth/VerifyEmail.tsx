import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LogoFull from '@/components/LogoFull';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <Head title="Email Verification" />
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href='/'>
                    <LogoFull />
                </Link>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Email Verification</CardTitle>
                        <CardDescription>
                            Thanks for signing up! Before getting started, could you verify
                            your email address by clicking on the link we just emailed to
                            you?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status === 'verification-link-sent' && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-4">
                                <Button type="submit" className="w-full" disabled={processing}>
                                    Send Verification Email
                                </Button>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
