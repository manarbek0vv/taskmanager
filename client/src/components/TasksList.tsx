import TaskItem from "./TaskItem"
import { useContext } from "react";
import { Context } from "../main";

const TasksList = () => {
    const { tasks: { tasks } } = useContext(Context);

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

export default TasksList