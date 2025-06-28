import { FC, useContext } from "react"
import { IconType } from "react-icons";
import { Link } from "react-router";
import { Context } from "../main";

interface NavItemProps {
    Icon: IconType;
    location: string;
    children: string;
    path: string;
}

const NavItem: FC<NavItemProps> = ({ children, Icon, location, path }) => {
    const { auth } = useContext(Context);

    const onClick = () => {
        if (children === "Logout") auth.logout();
    }

    return (
        <Link onClick={onClick} to={path} className={`${location === path ? 'bg-blue-50 border-r-3' : ''} border-0 border-blue-500 items-center p-4 w-full flex gap-2 max-[1050px]:w-auto`}>
            <Icon className={`${location === path ? 'fill-blue-500' : ''} size-[22px]`} />

            <p className={`${location === path ? 'text-blue-500' : ''} text-md font-['PoppinsMedium'] max-[1050px]:hidden`}>{children}</p>
        </Link>
    )
}

export default NavItem