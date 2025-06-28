import { useContext } from "react"
import Navigation from "./Navigation"
import { Context } from "../main"

const Side = () => {
    const { auth: { user } } = useContext(Context);

    return (
        <aside className={`relative bg-white border-t-0 border-gray-200 max-w-[300px] w-full flex flex-col gap-2.5 border-1 max-[1050px]:w-auto`}>
            <div className={`pt-4 w-full items-center flex flex-col gap-1 max-[1050px]:hidden`}>
                <div className={`overflow-hidden bg-gray-100 border-1 border-gray-400 size-20 rounded-[50%]`}>
                    {user.avatar && <img className={`size-20 rounded-[50%]`} src={`${import.meta.env.VITE_API_URL}${user.avatar}`} />}
                </div>
                <div className={`bg-blue-500 rounded-md px-2 py-0.5 font-['PoppinsMedium'] text-[12px] text-zinc-100`}>{user.role}</div>
            </div>

            <div className={`px-4 flex flex-col gap-0 items-center max-[1050px]:hidden`}>
                <p className={`text-[16px] font-['PoppinsSemiBold']`}>{user.fullName}</p>
                <p className="text-[14px] font-['PoppinsMedium'] text-gray-500">{user.email}</p>
            </div>

            <Navigation />
        </aside>
    )
}

export default Side