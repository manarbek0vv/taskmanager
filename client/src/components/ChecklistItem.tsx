import { Dispatch, FC, SetStateAction } from "react";
import { ICheckItem } from "../definitions/interfaces"
import { TaskDto } from "../dto/index.dto";

interface ChecklistItemProps {
    item: ICheckItem;
    setData: Dispatch<SetStateAction<TaskDto>>;
}

const ChecklistItem: FC<ChecklistItemProps> = ({ item, setData }) => {

    const onToggle = () => {
        setData(prev => ({ ...prev, checkItems: prev.checkItems.map(i => i.title === item.title ? { ...item, completed: !item.completed } : i) }));
    }

    return (
        <div className={`flex items-center gap-3`}>
            <div
                onClick={onToggle}
                className={`${item.completed ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-gray-500'} relative flex justify-center items-center size-4  border-2 rounded-[2px]`}>
                {
                    item.completed &&
                    <img src="/icons/check-mark-icon.png" className={`size-3`} />
                }
            </div>

            <span className={`block text-black`}>{item.title}</span>
        </div>)
}

export default ChecklistItem