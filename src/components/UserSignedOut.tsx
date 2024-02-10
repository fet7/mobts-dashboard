'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const UserSignedOut = () => {

    const router = useRouter();
    useEffect(() => {
        signOut({
            redirect: true,
            callbackUrl: `/pages/auth/sign-in`,

        })
            .then(() => {
                router.push('/pages/auth/sign-in')
            })
            .catch((error) => {
                console.log('Sign put error: ', error);
            })
    }, [router])
    router.refresh();
    return null;
}

export default UserSignedOut
