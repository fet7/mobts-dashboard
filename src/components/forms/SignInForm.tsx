'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { signInSchema } from '@/schemas/userSignIn.schema';
import { Loader } from 'lucide-react';


// const FormSchema = z.object({
//     email: z.string().min(1, 'Email required').email('Invalid Email'),
//     password: z
//         .string()
//         .min(1, 'Password required')
//         .min(8, 'Password must be at least 8 characters'),
// });

const SignInForm = () => {

    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {

        try {
            setIsSubmitting(true);

            const signInData = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (signInData?.error) {
                toast({
                    title: 'Oops!',
                    description: 'something went wrong, please try again',
                    variant: 'destructive'
                })

            } else {
            router.push('/');
            toast({
                title: 'success',
                description: 'Signed in successfully!'
            });
            router.refresh();
        }

        } catch (error) {
            toast({
                title: 'Oops!',
                description: 'something went wrong, please try again',
                variant: 'destructive'
            })
        } finally {
            setIsSubmitting(false);

        }
    };

    return (
        <div className="relative flex flex-col justify-center items-center overflow-hidden">
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle className='mb-4'>
                        Sign In
                    </CardTitle>
                    <Separator className='' />
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='email' autoComplete='off' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='password' autoComplete='off' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <CardDescription className='flex items-center '>
                                <Link href='/sign-in' className='text-blue-500 hover:underline text-sm'>forgot password?</Link>
                            </CardDescription>
                            <Button type="submit" className="w-full mt-12 " disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className='flex space-x-2'>
                                        <Loader className="mr-2 h-4 w-4 animate-spin mt-1" />
                                        Signing in
                                    </div>
                                ) : ('Sign in')}
                            </Button>
                            <p className="text-center text-sm font-light mt-2">
                                If you Don&apos;t have an account, please&nbsp;
                                <Link className="text-blue-500 hover:underline font-medium" href={'/pages/auth/sign-up'}>
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}

export default SignInForm