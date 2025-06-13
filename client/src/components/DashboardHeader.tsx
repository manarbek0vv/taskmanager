import Card from "../UI/Card"
import { useContext } from "react"
import { Context } from "../main"
import { observer } from "mobx-react-lite";
import { getStringFormattedDate } from "../tools";


const DashboardHeader = observer(() => {
    const { auth, tasks } = useContext(Context);
    const totalTasksCount = tasks.totalTasksCount;
    const pendingTasksCount = tasks.pendingTasksCount;
    const inProgressTasksCount = tasks.inProgressTasksCount;
    const completedTasksCount = tasks.completedTasksCount;

    return (
        <div className={`rounded-md border-1 border-gray-200 bg-white pb-8 pr-35 px-4 py-5 flex flex-col gap-1`}>
            <h1 className={`font-['PoppinsSemiBold'] text-2xl`}>Good Morning! {auth.user.fullName}</h1>
            <p className={`text-md text-gray-500`}>{getStringFormattedDate(new Date().toDateString(), true)}</p>
            <div className={`mt-2 w-full flex justify-between gap-2 items-center`}>
                <Card count={totalTasksCount} color="bg-blue-500">Total Tasks</Card>
                <Card count={pendingTasksCount} color="bg-purple-500">Pending Tasks</Card>
                <Card count={inProgressTasksCount} color="bg-cyan-500">In Progress</Card>
                <Card count={completedTasksCount} color="bg-green-500">Completed Tasks</Card>
            </div>
        </div>
    )
})

export default DashboardHeader