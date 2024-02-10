import User from '@/components/User';
import UserSignedOut from '@/components/UserSignedOut';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (session?.user) {

    return (
      <main >
        <h1>Home</h1>
        <p>welcome back {session?.user?.name}</p>


        <h2>client session</h2>
        <User />

        <h2>server session</h2>
        {JSON.stringify(session)}
      </main>
    )
  } else {
    return (
      <UserSignedOut />
    )
  }
}
