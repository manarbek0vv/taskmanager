import { FC, useContext, useEffect, useState } from "react";
import { ITask, IUser } from "../definitions/interfaces"
import UsersService from "../services/users.service";
import { Context } from "../main";

interface TeamMembersItemProps {
    user: IUser;
}

const TeamMembersItem: FC<TeamMembersItemProps> = ({ user }) => {
    const { auth } = useContext(Context);
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        UsersService.findUsersTasks(auth.user.roomId, user.id)
            .then(res => setTasks(res.data));
    }, [])

    const pendingTasksCount = tasks.filter(task => task.checkItems.every(checkItem => !checkItem.completed)).length;
    const inProgressTasksCount = tasks.filter(task => (task.checkItems.some(checkItem => checkItem.completed) && task.checkItems.some(checkItem => !checkItem.completed))).length;
    const completedTasksCount = tasks.filter(task => task.checkItems.every(checkItem => checkItem.completed)).length;

    return (
        <div className={`py-3 p-4 rounded-md flex flex-col gap-4 bg-white`}>
            <div className={`flex items-center gap-3`}>
                <div className={`size-10 grow-0 shrink-0 overflow-hidden rounded-[50%] bg-gray-300`}>
                    {user.avatar && <img className="w-full rounded-[50%] h-full object-cover" src={`${import.meta.env.VITE_API_URL}${user.avatar}`} />}
                </div>

                <div className={`grow-1 shrink-1 flex flex-col gap-0`}>
                    <h3 className={`font-['PoppinsSemiBold'] text-[16px] text-black`}>{user.fullName}</h3>
                    <p className={`font-['PoppinsRegular'] text-[12px] text-gray-500`}>
                        {user.email}
                    </p>
                </div>
            </div>

            <div className={`flex items-center gap-2`}>
                <div className={`px-3 py-2 rounded-md bg-gray-100 grow-1 flex flex-col gap-0 font-['PoppinsMedium']`}>
                    <span className={`max-[600px]:text-[10px] text-[12px] text-purple-800`}>{pendingTasksCount}</span>
                    <span className={`whitespace-nowrap max-[600px]:text-[10px] text-[12px] text-purple-800`}>Pending</span>
                </div>
                <div className={`px-3 py-2 rounded-md bg-gray-100 grow-1 flex flex-col gap-0 font-['PoppinsMedium']`}>
                    <span className={`max-[600px]:text-[10px] text-[12px] text-sky-600`}>{inProgressTasksCount}</span>
                    <span className={`whitespace-nowrap max-[600px]:text-[10px] text-[12px] text-sky-600`}>In Progress</span>
                </div>
                <div className={`px-3 py-2 rounded-md bg-gray-100 grow-1 flex flex-col gap-0 font-['PoppinsMedium']`}>
                    <span className={`max-[600px]:text-[10px] text-[12px] text-green-600`}>{completedTasksCount}</span>
                    <span className={`whitespace-nowrap max-[600px]:text-[10px] text-[12px] text-green-600`}>Completed</span>
                </div>
            </div>
        </div>
    )
}

export default TeamMembersItem