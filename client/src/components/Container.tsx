import { Outlet } from "react-router"
import Side from "./Side"

const Container = () => {

    return (
        <div className={`bg-gray-100 w-full h-full flex flex-col gap-0`}>
            <div className={`bg-white border-1 border-gray-200 flex w-full px-8 py-4`}>
                <h1 className={`text-lg font-['PoppinsSemiBold'] text-black`}>Task Manager</h1>
            </div>

            <div className={`w-full h-full overflow-hidden flex`}>
                <Side />

                <Outlet />
            </div>
        </div>
    )
}

export default Container