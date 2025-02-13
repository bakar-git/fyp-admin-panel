import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import LogoFull from '@/components/LogoFull';

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Head title="Log in" />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href='/'>
          <LogoFull />
        </Link>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login to your Postify account
                {status && (
                  <div className="text-sm font-medium text-green-600">
                    {status}
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={data.email}
                        placeholder="name@example.com"
                        required
                        onChange={(e) => setData('email', e.target.value)}
                      />
                      {errors.email && (
                        <span className="text-sm text-red-500">{errors.email}</span>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" value={data.password} required onChange={(e) => setData('password', e.target.value)} />
                      {errors.password && (
                        <span className="text-sm text-red-500">{errors.password}</span>
                      )}
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={data.remember}
                          onCheckedChange={(checked) =>
                            setData('remember', checked as boolean)
                          }
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm text-gray-400"
                        >
                          Remember me
                        </label>
                      </div>
                      {canResetPassword && (
                        <Link
                          href={route('password.request')}
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                      Login
                    </Button>
                    <div className="text-center">
                      <span className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="underline-offset-4 hover:underline">
                          Register
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our <Link href={route('terms-of-service')}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
