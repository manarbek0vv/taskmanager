import { useContext, useEffect, useState } from "react"
import { TaskDto } from "../dto/index.dto"
import { IError, Priority } from "../definitions/interfaces"
import { Context } from "../main"
import ErrorSerivce from "../services/error.service"
import Notifications from "../components/Notifications"
import { useParams } from "react-router"
import { getStringFormattedDate } from "../tools"
import ChecklistItem from "../components/ChecklistItem"
import AttachmentsItem from "../components/AttachmentsItem"

const ChangeTask = () => {
    const { auth, tasks } = useContext(Context);
    const { taskId } = useParams() as { taskId: string };
    const [state, setState] = useState<{ loading: boolean, error: IError | null, success: string | null }>({ loading: false, error: null, success: null, })
    const [data, setData] = useState<TaskDto>({
        title: '',
        description: '',
        priority: Priority.LOW,
        attachments: [],
        dueDate: '',
        checkItems: [],
        assignTo: [],
    })

    const changeTask = async () => {
        try {
            setState(prev => ({ ...prev, error: null }))
            setState(prev => ({ ...prev, success: null }))
            setState(prev => ({ ...prev, loading: true }))
            const createdTask = await tasks.changeTask(auth.user.roomId, taskId, data);
            if (!createdTask) throw Error();
            setState(prev => ({ ...prev, error: null }));
            tasks.findTasks(auth.user.roomId);
        } catch (error) {
            setState(prev => ({ ...prev, error: ErrorSerivce.getError(error) }))
        } finally {
            setState(prev => ({ ...prev, loading: false }))
        }
    }

    const uploadTask = async () => {
        const task = ((await tasks.findOneTask(auth.user.roomId, taskId)).data);
        setData(task)
    }

    let status: 'Pending' | 'In Progress' | 'Completed';
    if ((data.checkItems.every(checkItem => !checkItem.completed))) status = 'Pending';
    else if (data.checkItems.some(checkItem => checkItem.completed) && data.checkItems.some(checkItem => !checkItem.completed)) status = 'In Progress';
    else status = 'Completed';

    const statusColor = status === 'Pending' ? 'bg-purple-100 text-purple-500 border-purple-200' : status === 'In Progress' ? 'bg-sky-100 text-sky-500 border-sky-200' : 'bg-green-100 text-green-500 border-green-200'

    useEffect(() => {
        uploadTask();
    }, [])

    useEffect(() => {
        if (!data.checkItems.length) return
        changeTask();
    }, [data])

    return (
        <>
            <Notifications error={state.error} success={state.success} />

            <div className={`[scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar-width]:hidden px-5 max-w-250 w-full h-full overflow-y-auto overflow-x-hidden py-8`}>
                <div className={`flex flex-col gap-4 w-full rounded-md border-1 border-gray-200 bg-white px-4 py-5`}>
                    <div className={`w-full flex justify-between gap-4 items-center text-[22px]`}>
                        <h1 className={`text-xl font-['PoppinsSemiBold']`}>{data.title}</h1>

                        <div className={`font-['PoppinsMedium'] text-[13px] border-1 px-2 py-0.5 rounded-md ${statusColor}`}>
                            {status}
                        </div>
                    </div>

                    <div className={`font-['PoppinsMedium'] text-[16px] flex gap-0 flex-col`}>
                        <p className={`text-gray-500`}>Description</p>
                        <p className={`text-black`}>{data.description}</p>
                    </div>

                    <div className={`flex justify-between items-center pr-[20%] font-['PoppinsMedium'] text-[16px] gap-0 max-[650px]:flex-col max-[650px]:gap-3 max-[650px]:items-start`}>
                        <div className={`flex flex-col gap-0`}>
                            <span className={`text-gray-500 block`}>Priority</span>
                            <span className={`text-black block`}>{data.priority.charAt(0).toUpperCase() + data.priority.slice(1).toLowerCase()}</span>
                        </div>
                        <div className={`flex flex-col gap-0`}>
                            <span className={`text-gray-500 block`}>Due Date</span>
                            <span className={`text-black block`}>{getStringFormattedDate(data.dueDate)}</span>
                        </div>
                        <div className={`flex flex-col gap-0`}>
                            <span className={`text-gray-500 block`}>Assigned To</span>
                            <div className={`relative size-8 bg-gray-300 rounded-[50%]`}>
                                {
                                    data.assignTo.slice(0, 3).map((user, index) =>
                                        <div key={user.email} style={{ left: index * 20 }} className={`overflow-hidden bottom-0 border-1 border-zinc-100 absolute size-8 bg-green-gray-300 rounded-[50%]`}>
                                            {user.avatar && <img className="w-full rounded-[50%] h-full object-cover" src={`${import.meta.env.VITE_API_URL}${user.avatar}`} />}
                                        </div>
                                    )
                                }
                                {
                                    data.assignTo.length > 3 &&
                                    <div style={{ left: 3 * 20 }} className={`cursor-pointer flex justify-center items-center text-black font-['PoppinsSemiBold'] size-8 rounded-[50%] bg-gray-100 absolute overflow-hidden`}>
                                        {data.assignTo.length === 4 ? '+' : `+${data.assignTo.length - 3}`}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={`font-['PoppinsMedium'] text-[16px] flex flex-col gap-4 items-start`}>
                        <span className={`text-gray-500`}>Todo Checklist</span>

                        <div className={`flex flex-col gap-6 pl-2`}>
                            {
                                data.checkItems.map(item =>
                                    <ChecklistItem key={item.title} item={item} setData={setData} />
                                )
                            }
                        </div>
                    </div>

                    <div className={`font-['PoppinsMedium'] w-full text-[16px] flex flex-col gap-4 items-start`}>
                        <span className={`text-gray-500`}>Attachments</span>

                        <div className={`flex flex-col gap-6 pl-2 w-full`}>
                            {
                                data.attachments.map((attachment, index) =>
                                    <AttachmentsItem key={attachment} attachment={attachment} index={index} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeTask