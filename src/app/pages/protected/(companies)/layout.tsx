import SideNav from "@/components/SideNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react"

interface CompanyLayoutProps {
    children: ReactNode;
}

const CompanyLayout: FC<CompanyLayoutProps> = async ({ children }) => {

    const session = await getServerSession(authOptions);

    return (
        <main>
            {session?.user ? (
                <SideNav />
            ) : ('')}

            <div className=" p-10 rounded-md">{children}</div>
        </main>
    )
}

export default CompanyLayout