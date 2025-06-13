import { FC } from "react"
import { Link } from "react-router";

interface TaskHeaderItemProps {
    item: { title: string; path: string, count: number };
    pathname: string;
}

const TaskHeaderItem: FC<TaskHeaderItemProps> = ({ item, pathname }) => {

    const wrapperColor = pathname === item.path ? 'border-blue-500' : 'border-transparent';
    const textColor = pathname === item.path ? 'text-blue-500' : 'text-gray-500'
    const countColor = pathname === item.path ? 'bg-blue-500 text-zinc-100' : 'bg-gray-200 text-gray-500'

    return (
        <Link to={item.path} className={`${wrapperColor} cursor-pointer text-[13px] font-['PoppinsMedium'] items-center flex gap-2 px-4 py-1 border-b-3`}>
            <span className={`block ${textColor}`}>{item.title}</span>
            <span className={`${countColor} block px-[10px] py-0.5 rounded-[45%]`}>{item.count}</span>
        </Link>
    )
}

export default TaskHeaderItem