import { MdLogout, MdOutlineDashboard } from "react-icons/md"
import NavItem from "./NavItem"
import { AiOutlineFileDone, AiOutlineTeam } from "react-icons/ai"
import { RiAddBoxLine } from "react-icons/ri"
import { useLocation } from "react-router"
import { useContext } from "react"
import { Context } from "../main"
import { Role } from "../definitions/interfaces"

const NavigationItemsAdmin = [
    { element: MdOutlineDashboard, title: 'Dashboard', path: '/dashboard' },
    { element: AiOutlineFileDone, title: 'Manage Tasks', path: '/tasks' },
    { element: RiAddBoxLine, title: 'Create Task', path: '/create-task' },
    { element: AiOutlineTeam, title: 'Team Members', path: '/team-members' },
    { element: MdLogout, title: 'Logout', path: '' },
]

const NavigationItemsUser = [
    { element: MdOutlineDashboard, title: 'Dashboard', path: '/dashboard' },
    { element: AiOutlineFileDone, title: 'My Tasks', path: '/tasks' },
    { element: MdLogout, title: 'Logout', path: '' },
]

const Navigation = () => {
    const location = useLocation();
    const { auth } = useContext(Context);

    return (
        <nav className={`mt-4 w-full flex flex-col gap-0`}>
            {
                auth.user.role === Role.ADMIN ?
                    NavigationItemsAdmin.map(item =>
                        <NavItem
                            path={item.path}
                            location={location.pathname}
                            key={item.title}
                            Icon={item.element}
                        >
                            {item.title}
                        </NavItem>
                    )
                    : NavigationItemsUser.map(item =>
                        <NavItem
                            path={item.path}
                            location={location.pathname}
                            key={item.title}
                            Icon={item.element}
                        >
                            {item.title}
                        </NavItem>
                    )
            }
        </nav>
    )
}

export default Navigation