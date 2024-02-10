'use client'

import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { Loader } from "lucide-react"

const FormSchema = z.
    object({
        companyName: z.string().min(1, 'Company Name is required'),
        tinNumber: z.string().min(1, 'TIN required').min(10, "TIN must be 10 digits").max(10, "TIN must be 10 digits"),
        registrationNumber: z.string().min(1, 'Commercial Registration number is required'),
        licenseNumber: z.string().min(1, 'Business License number is required'),
    })

const RegisterForm = () => {

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            companyName: '',
            tinNumber: '',
            registrationNumber: '',
            licenseNumber: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {

        try {
            setIsSubmitting(true);

            const response = await fetch('/api/company/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    companyName: values.companyName,
                    tinNumber: values.tinNumber,
                    registrationNumber: values.registrationNumber,
                    licenseNumber: values.licenseNumber
                })
            })

            if (response.ok) {
                console.log('succeeded')
                router.refresh();
                router.push('/pages/protected/dashboards');
                toast({
                    title: "success",
                    description: 'Company registered successfully'
                })
            }
            else {
                console.log('error happened')
                toast({
                    title: 'Oops',
                    description: 'something went wrong, please try again later',
                    variant: 'destructive'
                })
            }
        } catch (error) {
            console.log('error occurred')
            toast({
                title: "Error",
                description: "an Error occurred, please try again later",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col relative justify-center items-center">
            <Card>
                <CardHeader className="mb-6">
                    <CardTitle className="text-xl text-center mb-4">Register Your Company</CardTitle>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tinNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>TIN Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="registrationNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Commercial Registration Number Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="licenseNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business License Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full mt-12" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className='flex space-x-2'>
                                        <Loader className='mr-2 h-4 w-4 animate-spin mt-1' />
                                        Registering
                                    </div>

                                ) : ('Register')}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </div>
    )
}

export default RegisterForm