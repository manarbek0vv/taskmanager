import { FC, useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal"
import SelectUserItem from "./SelectUserItem"
import { TaskDto } from "../dto/index.dto";
import { IUser } from "../definitions/interfaces";
import { Context } from "../main";
import UsersService from "../services/users.service";

interface SelectUsersProps {
    setIsVisible: (value: React.SetStateAction<boolean>) => void;
    setData: (value: React.SetStateAction<TaskDto>) => void;
    assignTo: Array<{
        fullName: string;
        email: string;
        avatar: string | null
    }>;
}

const SelectUsers: FC<SelectUsersProps> = ({ setIsVisible, setData, assignTo }) => {
    const { auth } = useContext(Context);

    const [teamMembers, setTeamMembers] = useState<IUser[]>([])
    const onClick = () => setIsVisible(false);

    const findUsersInRoom = async () => {
        const users = (await UsersService.findUsersInRoom(auth.user.roomId)).data;
        if (Array.isArray(users)) setTeamMembers(users);
    }

    const resetSelection = () => {
        setData(prev => ({ ...prev, assignTo: [] }));
    };

    useEffect(() => {
        findUsersInRoom();
    }, [])

    return (
        <Modal onClick={onClick}>
            <div onClick={(e) => e.stopPropagation()} className={`h-[80%] overflow-hidden bg-white max-w-130 rounded-md w-full flex flex-col`}>
                <div className={`p-4 flex justify-between gap-8 items-center`}>
                    <h1 className={`font-['PoppinsSemiBold'] text-md`}>Select Users</h1>

                    <img onClick={() => setIsVisible(false)} className={`size-6`} src="/icons/char-x.png" />
                </div>

                <div className={`w-full h-[1px] bg-gray-300`} />

                <div className={`[scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar-width]:hidden overflow-y-auto overflow-x-hidden w-full grow-1 shrink-1 justify-start`}>
                    {teamMembers.map(teamMember => {
                        return <SelectUserItem
                            key={teamMember.id}
                            setData={setData}
                            selectedUser={assignTo.find(user => user.email === teamMember.email)}
                            data={teamMember} />
                    })}
                </div>

                <div className={`px-6 py-4 flex justify-end items-center gap-4`}>
                    <button onClick={resetSelection} className={`transition-colors duration-300 hover:bg-gray-200 border-gray-300 text-gray-700 bg-gray-100 px-3 rounded-lg py-1 text-[14px] font-['PoppinsMedium'] border-1`}>CANCEL</button>
                    <button onClick={() => setIsVisible(false)} className={`transition-colors duration-300 hover:bg-blue-400 bg-blue-500 text-white border-transparent px-3 rounded-lg py-1 text-[14px] font-['PoppinsMedium'] border-1`}>DONE</button>
                </div>
            </div>
        </Modal>
    )
}

export default SelectUsers