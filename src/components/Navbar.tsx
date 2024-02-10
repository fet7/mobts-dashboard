import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'
import { ModeToggle } from './Toggle'
import { Separator } from './ui/separator'
import Image from 'next/image'

const Navbar = async () => {

    const session = await getServerSession(authOptions);

    return (
        <div className='py-2 fixed w-full z-10 top-0 bg-popover shadow-lg dark:shadow-zinc-900 h-20'>
            <div className='container flex items-center justify-between '>
                <div>

                    <Link href='/' className={`${buttonVariants({ variant: 'link' })} `}>
                        <Image src='/logo-dark.svg' alt='logo' width={150} height={10} className='dark:hidden' />
                        <Image src='/logo-light.svg' alt='logo' width={150} height={10} className='hidden dark:block' />
                    </Link>
                </div>


                <div className='flex space-x-3'>

                    {session?.user ? (
                        <div className='flex gap-4 justify-around'>
                            <Link href='/pages/protected/dashboard' className={`${buttonVariants({ variant: 'ghost' })}`}>Workspace</Link>
                            <Link href='/pages/protected/dashboards' className={`${buttonVariants({ variant: 'ghost' })}`}>Registration Services</Link>
                            <p className='pt-2'>Hello, {session.user.name}</p>
                            <UserAccountNav />

                        </div>
                    ) : (
                            <Link href='/pages/auth/sign-in' className={buttonVariants({ variant: 'outline' })}>Login</Link>
                    )}

                    <ModeToggle />
                </div>

            </div>
            {/* <Separator className='mt-4' /> */}
        </div>
    )
}

export default Navbar