import { Navigate, Route, Routes } from "react-router"
import Dashboard from "../pages/Dashboard"
import Container from "./Container"
import Tasks from "../pages/Tasks"
import { useContext, useEffect } from "react"
import { Context } from "../main"
import { Role } from "../definitions/interfaces"
import CreateTask from "../pages/CreateTask"
import TeamMembers from "../pages/TeamMembers"
import TasksList from "./TasksList"
import PendingTasksList from "./PendingTasksList"
import InProgressTasksList from "./InProgressTasksList"
import CompletedTasksList from "./CompletedTasksList"
import UpdateTask from "./UpdateTask"
import ChangeTask from "../pages/ChangeTask"

const MainRoutes = () => {
    const { auth, tasks } = useContext(Context);

    useEffect(() => {
        tasks.findTasks(auth.user.roomId);
    }, [])

    return (
        <Routes>
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/" element={<Container />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tasks" element={<Tasks />}>
                    <Route path="" element={<TasksList />} />
                    <Route path="pending" element={<PendingTasksList />} />
                    <Route path="inprogress" element={<InProgressTasksList />} />
                    <Route path="completed" element={<CompletedTasksList />} />
                </Route>
                {
                    auth.user.role === Role.ADMIN &&
                    <>
                        <Route path="update-task/:taskId" element={<UpdateTask />} />
                        <Route path="create-task" element={<CreateTask />} />
                        <Route path="team-members" element={<TeamMembers />} />
                    </>
                }
                {
                    auth.user.role === Role.USER &&
                    <Route path="change-task/:taskId" element={<ChangeTask />} />
                }
            </Route>
        </Routes>
    )
}

export default MainRoutes