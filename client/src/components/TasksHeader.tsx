import { useLocation } from "react-router"
import TaskHeaderItem from "./TaskHeaderItem";
import { useContext } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const TasksHeader = observer(() => {
    const { tasks } = useContext(Context);
    const { pathname } = useLocation();

    const items = [
        { title: 'All', path: '/tasks', count: tasks.tasks.length },
        { title: 'Pending', path: '/tasks/pending', count: tasks.pendingTasksCount },
        { title: 'In Progress', path: '/tasks/inprogress', count: tasks.inProgressTasksCount },
        { title: 'Completed', path: '/tasks/completed', count: tasks.completedTasksCount },
    ]

    return (
        <div className={`flex justify-between items-center gap-8 max-[1160px]:flex-col`}>
            <h1 className={`text-2xl text-start font-['PoppinsSemiBold']`}>My Tasks</h1>

            <div className={`max-[768px]:w-full flex items-center gap-4 max-[768px]:justify-between max-[550px]:flex-col`}>
                <div className={`flex items-center gap-1 max-[510px]:gap-0`}>
                    {
                        items.map(item =>
                            <TaskHeaderItem key={item.path} item={item} pathname={pathname} />
                        )
                    }
                </div>

                <button className={`max-[550px]:hidden cursor-pointer text-[13px] font-['PoppinsMedium'] border-gray-100 border-1 rounded-md gap-2 flex items-center px-3 py-2 bg-lime-200`}>
                    <img className={`size-4`} src="/icons/document-icon.png" />
                    Download report
                </button>
            </div>
        </div>
    )
})

export default TasksHeader