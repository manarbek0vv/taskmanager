import { FC } from "react";
import { IUser } from "../definitions/interfaces"
import Checkbox from "../UI/Checkbox"
import { TaskDto } from "../dto/index.dto";

interface SelectUserItemProps {
    selectedUser: {
        fullName: string;
        email: string;
        avatar: string | null;
    } | undefined;
    data: IUser;
    setData: (value: React.SetStateAction<TaskDto>) => void;
}

const SelectUserItem: FC<SelectUserItemProps> = ({ selectedUser, data, setData }) => {

    return (
        <>
            <div className={`flex gap-4 items-center py-5 px-6`}>
                <div className={`size-8 rounded-[50%] bg-gray-300`}>
                    {data.avatar && <img className="w-full rounded-[50%] h-full object-cover" src={`${import.meta.env.VITE_API_URL}${data.avatar}`} />}
                </div>

                <div className={`grow-1 shrink-1 flex flex-col justify-between`}>
                    <span className={`font-['PoppinsMedium']`}>{data.fullName}</span>
                    <span className={`font-['PoppinsRegular'] text-[12px] text-gray-500`}>{data.email}</span>
                </div>

                <Checkbox setData={setData} selectedUser={selectedUser} data={data} />
            </div>

            <div className={`w-full max-h-[1px] h-screen bg-gray-300`} />
        </>
    )
}

export default SelectUserItem