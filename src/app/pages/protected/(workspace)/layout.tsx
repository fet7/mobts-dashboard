import Sidebar from "@/components/Sidebar";
import UserSignedOut from "@/components/UserSignedOut";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react"

interface WorkspaceLayoutProps {
    children: ReactNode;
}

const WorkspaceLayout: FC<WorkspaceLayoutProps> = async ({ children }) => {

    const session = await getServerSession(authOptions);

    return (

        <div className="flex container w-screen h-screen justify-between mx-2 mt-24">
            {session?.user ? (<>
                <div className=" w-1/4"><Sidebar /></div>
                <main className=" w-3/4">{children}</main>
            </>) : (
                <UserSignedOut />
            )}
        </div>
    )
}

export default WorkspaceLayout