import TaskItem from "./TaskItem"
import { useContext, useEffect, useState } from "react";
import { ITask } from "../definitions/interfaces";
import TasksService from "../services/tasks.service";
import { Context } from "../main";

const InProgressTasksList = () => {
    const { auth } = useContext(Context);
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        TasksService.findInProgressTasks(auth.user.roomId)
            .then(res => setTasks(res.data));
    }, [])

    return (
        <>
            {
                !tasks.length &&
                <div className="text-center w-full p-8 font-['PoppinsMedium'] text-2xl">No Tasks</div>
            }
            <div className={`overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar-width]:hidden overflow-y-auto gap-4 auto-rows-auto grid grid-cols-3 w-full`}>
                {tasks.map(task =>
                    <TaskItem task={task} key={task.id} />
                )}
            </div>
        </>
    )
}

export default InProgressTasksList