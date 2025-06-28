import { Dispatch, FC, MouseEventHandler, useRef } from "react"
import { TaskDto } from "../dto/index.dto";
import { getFormattedDate } from "../tools";

interface DatePickerProps {
    value: string;
    setData: Dispatch<React.SetStateAction<TaskDto>>;
}

const DatePicker: FC<DatePickerProps> = ({ value, setData }) => {
    const ref = useRef<HTMLInputElement>(null)

    const onClick: MouseEventHandler<HTMLImageElement> = () => {
        if (!ref.current) return;
        ref.current.showPicker();
    }

    return (
        <div className={` max-[600px]:w-full overflow-hidden relative max-w-70 w-screen cursor-pointer items-center flex justify-between rounded-[5px] px-2 py-1 bg-gray-50 border-1 border-zinc-200`}>
            <span className={`select-none text-[15px] font-['PoppinsMedium']`}>{getFormattedDate(value)}</span>
            <input value={value.split('T')[0]} onChange={(e) => setData(prev => ({ ...prev, dueDate: e.target.value }))} type="date" className={`absolute z-100 opacity-1 right-2`} />
            <img onClick={onClick} className={`absolute top-[50%] size-5 right-2 translate-y-[-50%]`} src="/icons/date-picker.png" />
        </div>
    )
}

export default DatePicker