import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Link } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import LogoV1 from '@/components/LogoV1';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <Head title="Forgot Password" />
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <LogoV1 />
                    POSTIFY
                </a>
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Forgot Password</CardTitle>
                            <CardDescription>
                                Enter your email to reset password
                                {status && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        {status}
                                    </div>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            placeholder="name@example.com"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && (
                                            <span className="text-sm text-red-500">{errors.email}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button type="submit" className="w-full" disabled={processing}>
                                            Email Password Reset Link
                                        </Button>
                                        <Link
                                            href={route('login')}
                                            className="text-center text-sm underline-offset-4 hover:underline"
                                        >
                                            Back to Login
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                        By clicking continue, you agree to our <Link href={route('terms-of-service')}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
