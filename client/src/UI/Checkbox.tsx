import { FC } from "react"
import { TaskDto } from "../dto/index.dto";
import { IUser } from "../definitions/interfaces";

interface CheckboxProps {
    selectedUser: {
        fullName: string;
        email: string;
        avatar: string | null;
    } | undefined;
    data: IUser;
    setData: (value: React.SetStateAction<TaskDto>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ selectedUser, setData, data }) => {
    const isChecked = !!selectedUser;

    const handleToggle = () => {
        if (isChecked) {
            setData(prev => ({
                ...prev,
                assignTo: prev.assignTo.filter(({ email }) => email !== data.email),
            }));
        } else {
            setData(prev => ({
                ...prev,
                assignTo: [
                    ...prev.assignTo,
                    { fullName: data.fullName, email: data.email, avatar: data.avatar }
                ]
            }));
        }
    };


    return (
        <div
            onClick={handleToggle}
            className={`${isChecked ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-gray-500'} relative flex justify-center items-center size-4  border-2 rounded-[2px]`}>
            {
                isChecked &&
                <img src="/icons/check-mark-icon.png" className={`size-3`} />
            }
        </div>
    )
}

export default Checkbox