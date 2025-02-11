import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LogoV1 from '@/components/LogoV1';
import { GalleryVerticalEndIcon } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

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
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEndIcon className="size-4" />
                    </div>
                    Acme Inc.
                </a>
                <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
            </div>
        </div>
        // <div className="flex min-h-screen items-center justify-center">
        //     <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        //         <div className="text-center">
        //         <div className="flex items-center justify-center h-14">
        //             <LogoV1 className="size-20" />
        //             <h1 className="font-bold">POSTIFY</h1>
        //         </div>
        //             <h2 className="mt-6 text-3xl font-bold text-gray-900">
        //                 Sign in to your account
        //             </h2>
        //         </div>

        //         {status && (
        //             <div className="text-sm font-medium text-green-600">
        //                 {status}
        //             </div>
        //         )}

        //         <form onSubmit={submit} className="mt-8 space-y-6">
        //             <div className="space-y-4">
        //                 <div>
        //                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        //                         Email
        //                     </label>
        //                     <Input
        //                         id="email"
        //                         type="email"
        //                         name="email"
        //                         value={data.email}
        //                         className="mt-1"
        //                         autoComplete="username"
        //                         onChange={(e) => setData('email', e.target.value)}
        //                     />
        //                     {errors.email && (
        //                         <span className="text-sm text-red-500">{errors.email}</span>
        //                     )}
        //                 </div>

        //                 <div>
        //                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        //                         Password
        //                     </label>
        //                     <Input
        //                         id="password"
        //                         type="password"
        //                         name="password"
        //                         value={data.password}
        //                         className="mt-1"
        //                         autoComplete="current-password"
        //                         onChange={(e) => setData('password', e.target.value)}
        //                     />
        //                     {errors.password && (
        //                         <span className="text-sm text-red-500">{errors.password}</span>
        //                     )}
        //                 </div>

        //                 <div className="flex items-center space-x-2">
        //                     <Checkbox
        //                         id="remember"
        //                         checked={data.remember}
        //                         onCheckedChange={(checked) =>
        //                             setData('remember', checked as boolean)
        //                         }
        //                     />
        //                     <label
        //                         htmlFor="remember"
        //                         className="text-sm text-gray-600"
        //                     >
        //                         Remember me
        //                     </label>
        //                 </div>
        //             </div>

        //             <div className="flex items-center justify-between">
        //                 {canResetPassword && (
        //                     <Link
        //                         href={route('password.request')}
        //                         className="text-sm text-gray-600 hover:text-gray-900"
        //                     >
        //                         Forgot your password?
        //                     </Link>
        //                 )}

        //                 <Button type="submit" disabled={processing}>
        //                     Sign in
        //                 </Button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    );
}
