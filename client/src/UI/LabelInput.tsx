import { Dispatch, FC } from "react"
import { TaskDto } from "../dto/index.dto";

interface LabelProps {
    title: string;
    placeholder: string;
    value: string;
    onChange: Dispatch<React.SetStateAction<TaskDto>>
}

const Label: FC<LabelProps> = ({ title, placeholder, value, onChange }) => {

    return (
        <label className={`flex flex-col gap-3`}>
            <span className={`text-[14px] font-['PoppinsMedium']`}>{title}</span>
            <input
                value={value}
                onChange={(e) => onChange(prev => ({ ...prev, title: e.target.value }))}
                className={`transition-colors focus:border-gray-400 text-[16px] outline-0 rounded-[5px] px-3 py-2 bg-gray-50 border-1 border-zinc-200`} placeholder={placeholder} />
        </label>
    )
}

export default Label