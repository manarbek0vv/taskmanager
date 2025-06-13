import { Outlet } from "react-router"
import TasksHeader from "../components/TasksHeader"

const Tasks = () => {

    return (
        <div className={`flex flex-col gap-5 overflow-hidden px-5 w-full h-full py-8`}>
            <TasksHeader />
            <Outlet />
        </div>
    )
}

export default Tasks