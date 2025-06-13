import { FC, useContext } from "react";
import { ITask, Priority, Role } from "../definitions/interfaces"
import { getStringFormattedDate } from "../tools";
import { Link } from "react-router";
import { Context } from "../main";

interface TaskItemProps {
    task: ITask;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
    const { auth } = useContext(Context);

    let status: 'Pending' | 'In Progress' | 'Completed';
    if ((task.checkItems.every(checkItem => !checkItem.completed))) status = 'Pending';
    else if (task.checkItems.some(checkItem => checkItem.completed) && task.checkItems.some(checkItem => !checkItem.completed)) status = 'In Progress';
    else status = 'Completed';

    const statusColor = status === 'Pending' ? 'bg-purple-100 text-purple-500 border-purple-200' : status === 'In Progress' ? 'bg-sky-100 text-sky-500 border-sky-200' : 'bg-green-100 text-green-500 border-green-200'
    const priorityColor = task.priority === Priority.LOW ? 'border-lime-200 bg-lime-100 text-lime-500' : task.priority === Priority.MEDIUM ? 'border-yellow-200 bg-yellow-100 text-yellow-500' : 'border-red-200 bg-red-100 text-red-500'

    const sideColor = status === 'Pending' ? 'bg-purple-500' : status === 'In Progress' ? 'bg-sky-500' : 'bg-sky-500';

    const doneCheckItemsCount = task.checkItems.filter(item => item.completed).length;
    const fullCheckItemsCount = task.checkItems.length;

    const percentDoneTasks = doneCheckItemsCount === 0 ? '1%' : `${doneCheckItemsCount * 100 / fullCheckItemsCount}%`;

    const linkTo = auth.user.role === Role.ADMIN ? `/update-task/${task.id}` : `/change-task/${task.id}`;

    return (
        <Link to={linkTo} className={`h-full relative py-3 p-4 rounded-md flex flex-col gap-2 bg-white`}>
            <div className={`absolute ${sideColor} max-w-[2px] left-0 bottom-[50%] top-[20%] w-screen`} />

            <div className={`font-['PoppinsMedium'] text-[13px] flex gap-2 items-center`}>
                <div className={`border-1 px-2 py-0.5 rounded-md ${statusColor}`}>
                    {status}
                </div>
                <div className={`${priorityColor} border-1 px-2 py-0.5 rounded-md`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()} Quality</div>
            </div>

            <div className={`flex flex-col gap-1`}>
                <h3 className={`break-all text-ellipsis whitespace-nowrap overflow-hidden font-['PoppinsSemiBold'] text-[16px] text-black`}>{task.title}</h3>
                <p className={`h-9 line-clamp-2 break-all text-ellipsis overflow-hidden font-['PoppinsRegular'] text-[12px] text-gray-500`}>
                    {task.description}
                </p>
                <div className={`flex gap-1 items-center font-['PoppinsMedium'] text-[13px] text-gray-500`}>
                    Task Done:
                    <span className={`block tracking-[3px] font-['PoppinsSemiBold'] text-black`}>
                        {doneCheckItemsCount}/{fullCheckItemsCount}
                    </span>
                </div>
                <div className={`w-full h-[6px] bg-gray-200 rounded-[15px]`}>
                    <div style={{width: percentDoneTasks}} className={`h-[6px] bg-sky-500 rounded-[15px]`} />
                </div>
                <div className={`w-full flex justify-between gap-4 items-center`}>
                    <div className={`flex flex-col gap-0`}>
                        <span className={`font-['PoppinsRegular'] text-[12px] text-gray-500`}>Start Date</span>
                        <span className={`font-['PoppinsMedium'] text-[13px]`}>{getStringFormattedDate(task.createdAt)}</span>
                    </div>
                    <div className={`flex flex-col gap-0`}>
                        <span className={`font-['PoppinsRegular'] text-[12px] text-gray-500`}>Due Date</span>
                        <span className={`font-['PoppinsMedium'] text-[13px]`}>{getStringFormattedDate(task.dueDate)}</span>
                    </div>
                </div>

                <div className={`flex w-full justify-between gap-4 items-center`}>
                    <div className={`relative size-8 bg-gray-300 rounded-[50%]`}>
                        {
                            task.assignTo.slice(0, 3).map((user, index) =>
                                <div key={user.email} style={{ left: index * 20 }} className={`overflow-hidden bottom-0 border-1 border-zinc-100 absolute size-8 bg-green-gray-300 rounded-[50%]`}>
                                    {user.avatar && <img className="w-full rounded-[50%] h-full object-cover" src={`${import.meta.env.VITE_API_URL}${user.avatar}`} />}
                                </div>
                            )
                        }
                        {
                            task.assignTo.length > 3 &&
                            <div style={{ left: 3 * 20 }} className={`cursor-pointer flex justify-center items-center text-black font-['PoppinsSemiBold'] size-8 rounded-[50%] bg-gray-100 absolute overflow-hidden`}>
                                {task.assignTo.length === 4 ? '+' : `+${task.assignTo.length - 3}`}
                            </div>
                        }
                    </div>

                    {
                        !!task.attachments.length && <div className={`px-2 rounded-md py-0.5 pr-3 bg-blue-100 flex gap-1 items-center text-[14px] font-['PoppinsMedium']`}>
                            <img className={`size-5`} src="/icons/blue-clip-icon.png" />
                            {task.attachments.length}
                        </div>
                    }
                </div>
            </div>
        </Link>
    )
}

export default TaskItem