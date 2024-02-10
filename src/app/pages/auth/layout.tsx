import { FC, ReactNode } from "react"

interface AccountsLayoutProps {
    children: ReactNode;
}

const AccountsLayout: FC<AccountsLayoutProps> = ({ children }) => {
    return (
        <div className=" p-10 rounded-md">{children}</div>
    )
}

export default AccountsLayout