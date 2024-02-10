'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { DataTableColumnHeader } from '../ui/DataTableColumnHeader'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { TableCell } from '../ui/table'

export type listOfBuses = {
    id: number
    plateNumber: string
    seatCapacity: number
    status: string
    formattedCreatedAt: string
}

export const columns: ColumnDef<listOfBuses>[] = [

    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(Value) => table.toggleAllPageRowsSelected(!!Value)}
                aria-label='select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(Value) => row.toggleSelected(!!Value)}
                aria-label='select row'
            />
        )
    },

    {
        accessorKey: 'plateNumber',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Plate Number' />
        )
    },

    {
        accessorKey: 'seatCapacity',
        header: 'Seat Capacity',
        cell: ({ row }) => (
            <div className='px-8'>{row.original.seatCapacity}</div>
        )
    },

    {
        accessorKey: 'status',
        header: 'Status'
    },

    {
        accessorKey: 'formattedCreatedAt',
        header:
            ({ column }) => {
                return (
                    <Button
                        variant={'ghost'}
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Registered on
                        <ArrowUpDown className='ml-2 h-4 w-4' />
                    </Button>
                )
            },
        cell: ({ row }) => (
            <TableCell key={row.id} className='align-middle'>
                {row.original.formattedCreatedAt}
            </TableCell>
        ),
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const listOfBuses = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open Menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Update Bus</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-destructive hover:text-destructive-foreground'>Delete Bus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]