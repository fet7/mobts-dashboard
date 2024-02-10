'use client'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BadgePlus, Building2, LayoutDashboard, ListChecks, ListPlus } from 'lucide-react'


const companyMenu = [
    {
        title: 'Dashboard',
        path: '/pages/protected/dashboards',
        icon: <LayoutDashboard />
    },
    {
        title: 'New Registration',
        path: '/pages/protected/register-new',
        icon: <BadgePlus />
    },
    {
        title: 'Followup Tasks',
        path: '/pages/protected/followUps',
        icon: <ListPlus />

    },
    {
        title: 'Registration Tracking',
        path: '/pages/protected/registrationTracking',
        icon: <ListChecks />
    },
    {
        title: 'My Companies',
        path: '/pages/protected/myCompanies',
        icon: <Building2 />
    }
]

const SideNav = () => {

    const pathname = usePathname()

    return (
        <Card className='h-full w-72 top-24 fixed left-0 lg:left-36 md:left-0'>
            <CardHeader className='space-y-6 text-center bg-accent h-32 flex justify-center'>
                <CardTitle>
                    Registration Services
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className='mx-0'>
                <div>
                    <ul>
                        {companyMenu.map((menu, index) => (
                            <li key={index} className={`py-4 ${pathname === menu.path ? 'font-bold bg-muted rounded-md' : 'hover:bg-muted rounded-md'} my-2`}>
                                <Link href={menu.path} className='pl-6  w-full flex gap-3'>{menu.icon}{menu.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

export default SideNav