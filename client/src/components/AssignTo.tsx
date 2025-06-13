import { Dispatch, FC, useState } from "react"
import SelectUsers from "./SelectUsers";
import { TaskDto } from "../dto/index.dto";

interface AssignToProps {
    assignTo: Array<{
        fullName: string;
        email: string;
        avatar: string | null
    }>;
    setData: Dispatch<React.SetStateAction<TaskDto>>;
}

const AssignTo: FC<AssignToProps> = ({ assignTo, setData }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            {isVisible && <SelectUsers assignTo={assignTo} setData={setData} setIsVisible={setIsVisible} />}

            {
                assignTo.length === 0 &&
                <button onClick={() => setIsVisible(true)} className={`flex gap-2 items-center border-zinc-200 mt-[-4px] text-gray-800 hover:bg-gray-300 cursor-pointer font-['PoppinsMedium'] transition-colors text-[12px] outline-0 rounded-[5px] px-2 py-0.5 bg-gray-100 border-1`}>
                    <img className={`size-4`} src='/icons/members-icon.png' />
                    Add Members
                </button>
            }
            {
                assignTo.length !== 0 &&
                <div className={`size-8 rounded-[50%] bg-transparent relative`}>
                    {
                        assignTo.slice(0, 3).map((user, index) => {
                            const left = index * 20;
                            return <div style={{ left }} key={user.email} className={`size-8 rounded-[50%] bg-gray-300 absolute overflow-hidden`}>
                                {user.avatar && <img className="w-full rounded-[50%] h-full object-cover" src={`${import.meta.env.VITE_API_URL}${user.avatar}`} />}
                            </div>
                        })
                    }
                    <div onClick={() => setIsVisible(true)} style={{ left: assignTo.length > 3 ? 60 : assignTo.length * 20}} className={`cursor-pointer flex justify-center items-center text-black font-['PoppinsSemiBold'] size-8 rounded-[50%] bg-gray-100 absolute overflow-hidden`}>
                        {assignTo.length <= 3 ? '+' : `+${assignTo.length - 3}`}
                    </div>
                </div>
            }
        </>
    )
}

export default AssignTo