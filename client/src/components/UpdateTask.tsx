import { useContext, useEffect, useState } from "react"
import AssignTo from "../components/AssignTo"
import Attachments from "../components/Attachments"
import Checklist from "../components/Checklist"
import Button from "../UI/Button"
import DatePicker from "../UI/DatePicker"
import LabelArea from "../UI/LabelArea"
import LabelInput from "../UI/LabelInput"
import Select from "../UI/Select"
import { TaskDto } from "../dto/index.dto"
import { IError, Priority } from "../definitions/interfaces"
import { Context } from "../main"
import ErrorSerivce from "../services/error.service"
import Notifications from "../components/Notifications"
import { useParams } from "react-router"

const UpdateTask = () => {
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

    const updateTask = async () => {
        try {
            setState(prev => ({ ...prev, error: null }))
            setState(prev => ({ ...prev, success: null }))
            setState(prev => ({ ...prev, loading: true }))
            const createdTask = await tasks.updateTask(auth.user.roomId, taskId, data);
            if (!createdTask) throw Error();
            setState(prev => ({ ...prev, success: "Task updated successfully" }))
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

    useEffect(() => {
        uploadTask();
    }, [])

    return (
        <>
            <Notifications error={state.error} success={state.success} />

            <div className={`[scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar-width]:hidden px-5 max-w-250 w-full h-full overflow-y-auto overflow-x-hidden py-8`}>
                <div className={`flex flex-col gap-4 w-full rounded-md border-1 border-gray-200 bg-white px-4 py-5`}>
                    <h1 className={`text-xl font-['PoppinsSemiBold']`}>Update Task</h1>

                    <div className={`flex flex-col gap-5`}>
                        <LabelInput value={data.title} onChange={setData} title="Task Title" placeholder="Title..." />
                        <LabelArea value={data.description} onChange={setData} title="Description" placeholder="Description..." />

                        <div className={`w-full flex gap-4 items-center max-[850px]:flex-col max-[850px]:justify-start`}>
                            <div className={`flex flex-col max-[850px]:w-full gap-3`}>
                                <span className={`text-[14px] font-['PoppinsMedium']`}>Priority</span>
                                <Select
                                    value={data.priority}
                                    setData={setData}
                                    options={[
                                        { name: 'Low', value: Priority.LOW },
                                        { name: 'Medium', value: Priority.MEDIUM },
                                        { name: 'High', value: Priority.HIGH },
                                    ]}
                                />
                            </div>

                            <div className={`max-[850px]:w-full flex flex-col gap-3`}>
                                <span className={`text-[14px] font-['PoppinsMedium']`}>Due Date</span>
                                <DatePicker value={data.dueDate} setData={setData} />
                            </div>

                            <div className={`self-start flex flex-col gap-3`}>
                                <span className={`text-[14px] font-['PoppinsMedium']`}>Assign To</span>
                                <AssignTo setData={setData} assignTo={data.assignTo} />
                            </div>
                        </div>

                        <Checklist data={data} setData={setData} />

                        <Attachments data={data} setData={setData} />
                    </div>

                    <Button onClick={updateTask} className={'h-[50px]'}>Update</Button>
                </div>
            </div>
        </>
    )
}

export default UpdateTask