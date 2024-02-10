'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useToast } from '../ui/use-toast';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { signUpSchema } from '@/schemas/userSignUp.schema';
import { Loader } from 'lucide-react';

const SignUpForm = () => {

    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {

        try {

            setIsSubmitting(true);

            const response = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                })
            })

            if (response.ok) {
                router.refresh();
                router.push('/pages/auth/sign-in');
                toast({
                    title: 'Success',
                    description: 'Signed up successfully!'
                })

            }
            else {
                toast({
                    title: 'Oops',
                    description: "signing up failed, please try again",
                    variant: 'destructive'
                })
            }
        } catch (error) {
            toast({
                title: 'Oh!',
                description: "Something went wrong, please try again.",
                variant: 'destructive'
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="relative flex flex-col justify-center items-center overflow-hidden">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-center mb-4">
                        Create an account
                    </CardTitle>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='space-y-2'>

                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete='off' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input{...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input{...field} type='email' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input{...field} type='password' autoComplete='off' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input{...field} type='password' autoComplete='off' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='flex space-x-2 items-center text-sm mt-12'>
                                <Checkbox />
                                <p>I agree to <Link href='' className='text-blue-500 hover:underline text-sm'>terms</Link> and <Link href='' className='text-blue-600 hover:underline text-sm'>conditions</Link></p>
                            </div>
                            <Button type='submit' className='w-full mt-4' disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className='flex space-x-2'>
                                        <Loader className="mr-2 h-4 w-4 animate-spin mt-1" />
                                        Signing up
                                    </div>
                                ) : ('Sign up')}
                            </Button>

                            <p className='font-light text-sm text-center mt-2'>Do you have an account? please&nbsp;
                                <Link href='/pages/auth/sign-in' className='text-blue-500 hover:underline font-medium'>
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}

export default SignUpForm