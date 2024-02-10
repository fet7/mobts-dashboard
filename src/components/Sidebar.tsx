'use client'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { BadgeCent, BadgeCheck, BadgeHelp, BookKey, CalendarCheck, Caravan, FileText, LayoutDashboard, MapPinned, PlaneTakeoff, Route, Ticket, UserCog } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BusMenu = [
    {
        title: 'Dashboard',
        path: '/pages/protected/dashboard',
        icon: <LayoutDashboard />
    },
    {
        title: 'Bus',
        path: '/pages/protected/bus',
        icon: <Caravan />
    },
    {
        title: 'Route',
        path: '/pages/protected/route',
        icon: <Route />
    }, {
        title: 'Schedule',
        path: '/pages/protected/schedule',
        icon: <CalendarCheck />
    }, {
        title: 'Booking',
        path: '/pages/protected/booking',
        icon: <BookKey />
    }, {
        title: 'Ticketing',
        path: '/pages/protected/ticketing',
        icon: <Ticket />
    }, {
        title: 'Check-in',
        path: '/pages/protected/check-in',
        icon: <BadgeCheck />
    }, {
        title: 'Departure',
        path: '/pages/protected/departure',
        icon: <PlaneTakeoff />
    }, {
        title: 'Tracking',
        path: '/pages/protected/tracking',
        icon: <MapPinned />
    }, {
        title: 'Finance',
        path: '/pages/protected/finance',
        icon: <BadgeCent />
    }, {
        title: 'Reports',
        path: '/pages/protected/reports',
        icon: <FileText />
    }, {
        title: 'Manage User',
        path: '/pages/protected/manage-user',
        icon: <UserCog />
    }, {
        title: 'Help',
        path: '/pages/protected/help',
        icon: <BadgeHelp />
    },
]

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <Card className='h-full w-72'>
            <CardHeader className='space-y-6 text-center bg-accent h-32 flex justify-center'>
                <CardTitle>
                    Workspace
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className='mx-0'>
                <div>
                    <ul>
                        {BusMenu.map((menu, index) => (
                            <li key={index} className={`py-4 ${pathname === menu.path ? 'font-bold bg-muted rounded-md' : 'hover:bg-muted rounded-md'} my-1 flex justify-center`}>
                                <Link href={menu.path} className='pl-6  w-full h-3 flex gap-3'>{menu.icon}{menu.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

export default Sidebar