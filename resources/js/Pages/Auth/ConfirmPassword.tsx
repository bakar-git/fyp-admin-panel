import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LogoFull from '@/components/LogoFull';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <Head title="Confirm Password" />
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href='/'>
                    <LogoFull />
                </Link>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Confirm Password</CardTitle>
                        <CardDescription>
                            This is a secure area of the application. Please confirm your
                            password before continuing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && (
                                        <span className="text-sm text-red-500">{errors.password}</span>
                                    )}
                                </div>

                                <Button type="submit" className="w-full" disabled={processing}>
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
