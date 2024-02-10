'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DropdownMenu, Separator } from '@radix-ui/react-dropdown-menu'
import { Popover } from '@radix-ui/react-popover'
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Check, ChevronsUpDown, Dot, Loader, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { cn } from '@/lib/utils'
import BusList from '../BusList'
import { DataTable } from '../busTable/data-table'

const busSchema = z.
    object({
        plateNumber: z.string().min(5, 'It must be at least 5 digits').max(6, 'Maximum 6 digits'),
        seatCapacity: z.number().min(1, 'Seat Capacity is required').max(60, 'the maximum is 60 seats'),
        status: z.string().min(1, 'Status must be selected'),
    })

const statusMenu = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'duty',
        label: 'On Duty',
    },
    {
        value: 'maintenance',
        label: 'On Maintenance',
    },
    {
        value: 'unavailable',
        label: 'Unavailable'
    }
];

export const getStatusColorClass = (status: string) => {
    switch (status) {
        case 'active':
            return 'text-green-400';
        case 'duty':
            return 'text-blue-400';
        case 'maintenance':
            return 'text-orange-300';
        case 'unavailable':
            return 'text-red-400';
        default:
            return '';
    }
};


const BusForm = () => {



    const [showAddForm, setShowAddForm] = React.useState(false);
    const [showUpdateForm, setShowUpdateForm] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const form = useForm<z.infer<typeof busSchema>>({
        resolver: zodResolver(busSchema),
        defaultValues: {
            plateNumber: '',
            seatCapacity: 52,
            status: ''
        },
    });

    const handleAddBusClick = () => {
        setShowAddForm(!showAddForm);
        setShowUpdateForm(false);
    }

    const handleUpdateBusClick = () => {

        setShowUpdateForm(!showUpdateForm);
        setShowAddForm(false);

    }

    const onSubmit = async (values: z.infer<typeof busSchema>) => {

        try {
            setIsSubmitting(true);

            const response = await fetch('/api/bus/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plateNumber: values.plateNumber,
                    seatCapacity: values.seatCapacity,
                    status: values.status
                })
            })

            if (response.ok) {
                console.log('submitted');
                router.refresh();
                toast({
                    title: 'Success',
                    description: 'Bus registered successfully!'
                })
            } else {
                console.log('Bus registration failed');
                toast({
                    title: 'Oops',
                    description: 'Failed to register bus!',
                    variant: 'destructive'
                })
            }
        } catch (error) {
            console.log('fetching error')
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <div className='flex flex-col  justify-center'>
            <Card className='p-22 w-full'>
                <CardHeader>
                    <CardTitle>
                        Bus Settings
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <Separator />

                    <div className=' flex space-x-6'>
                        <Button variant='outline' className='w-32' onClick={handleAddBusClick}>
                            <Plus className='text-xs pr-2' />
                            Add Bus
                        </Button>
                        <Button variant='outline' className='w-32' onClick={() => handleUpdateBusClick()}>
                            <RefreshCw className='text-xs pr-2' />
                            Update Bus
                        </Button>
                        <Button variant='destructive' className='w-32 '>
                            <Trash2 className='text-xs pr-2' />
                            Delete Bus
                        </Button>
                    </div>
                    {showAddForm && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='flex gap-4 -ml-12 left-0 my-10 justify-between'>
                                    <FormField
                                        control={form.control}
                                        name='plateNumber'
                                        render={({ field }) => (
                                            <FormItem className='flex ml-8'>
                                                <FormLabel className='w-full text-center pt-2 m-2'>Plate Number</FormLabel>
                                                <div className='flex flex-wrap'>
                                                    <FormControl>
                                                        <Input {...field} className='h-8 w-32' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='seatCapacity'
                                        render={({ field }) => (
                                            <FormItem className='flex ml-8'>
                                                <FormLabel className='w-full text-left pt-2 m-2 -ml-4'>Seat Capacity</FormLabel>
                                                <div className='flex flex-wrap'>
                                                    <FormControl>
                                                        <Input {...field} className='h-8 w-24 text-right' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='status'
                                        render={({ field }) => (
                                            <FormItem className='flex ml-8'>
                                                <FormLabel className='w-full pt-2 mt-2 mr-12'>Status</FormLabel>
                                                <div className='flex flex-wrap'>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    role='combobox'
                                                                    aria-expanded={open}
                                                                    className={cn(
                                                                        'w-48 -ml-10 h-8',
                                                                        !field.value && 'text-muted-foreground'
                                                                    )}
                                                                >
                                                                    {value
                                                                        ? statusMenu.find((status) => status.value === value)?.label : "Select Status"}
                                                                    <ChevronsUpDown className='ml-6 h-4 w-4 shrink-0 opacity-50' />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className='w-[200px] p-0'>
                                                            <Command>
                                                                <CommandInput placeholder='Select Status...' />
                                                                <CommandEmpty>No Status selected</CommandEmpty>
                                                                <CommandGroup>
                                                                    {statusMenu.map((status) => (
                                                                        <CommandItem
                                                                            value={status.label}
                                                                            key={status.value}
                                                                            onSelect={() => {
                                                                                form.setValue('status', status.value);
                                                                                setValue(status.value);
                                                                                setOpen(false)
                                                                            }}
                                                                            className={getStatusColorClass(status.value)}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    value === status.value ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {status.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' className='w-24 h-8 mt-2 mx-8' disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <div className='flex space-x-2'>
                                                <Loader className='mr-2 h-4 w-4 animate-spin mt-1' />
                                                Saving
                                            </div>

                                        ) : ('Save')}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}

                    {showUpdateForm && (
                        <Form {...form}>
                            <form>
                                <div className='flex left-0 my-10 justify-evenly'>

                                    <FormField
                                        control={form.control}
                                        name='seatCapacity'
                                        render={({ field }) => (
                                            <FormItem className='flex ml-8'>
                                                <FormLabel className='w-full text-center pt-2 m-2'>Seat Capacity</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className='h-8 w-24 text-right' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='status'
                                        render={({ field }) => (
                                            <FormItem className='flex ml-8'>
                                                <FormLabel className='w-full pt-2 mt-2 mr-12'>Status</FormLabel>
                                                <div className='flex flex-wrap'>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    role='combobox'
                                                                    aria-expanded={open}
                                                                    className={cn(
                                                                        'w-48 -ml-10 h-8',
                                                                        !field.value && 'text-muted-foreground'
                                                                    )}
                                                                >
                                                                    {value
                                                                        ? statusMenu.find((status) => status.value === value)?.label : "Select Status"}
                                                                    <ChevronsUpDown className='ml-6 h-4 w-4 shrink-0 opacity-50' />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className='w-[200px] p-0'>
                                                            <Command>
                                                                <CommandInput placeholder='Select Status...' />
                                                                <CommandEmpty>No Status selected</CommandEmpty>
                                                                <CommandGroup>
                                                                    {statusMenu.map((status) => (
                                                                        <CommandItem
                                                                            value={status.label}
                                                                            key={status.value}
                                                                            onSelect={() => {
                                                                                form.setValue('status', status.value);
                                                                                setValue(status.value);
                                                                                setOpen(false)
                                                                            }}
                                                                            className={getStatusColorClass(status.value)}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    value === status.value ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {status.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' className='w-24 h-8 mt-2 mx-8'>Update</Button>
                                </div>
                            </form>
                        </Form>
                    )}
                    <Separator />
                    <div className='mt-8'>
                        <BusList />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default BusForm