import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LogoV1 from '@/Components/LogoV1';

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
        <div className="flex min-h-screen items-center justify-center">
            <Head title="Confirm Password" />
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center h-14">
                        <LogoV1 className="size-20" />
                        <h1 className="font-bold">POSTIFY</h1>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Confirm Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        This is a secure area of the application. Please confirm your
                        password before continuing.
                    </p>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
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
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <span className="text-sm text-red-500">{errors.password}</span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
