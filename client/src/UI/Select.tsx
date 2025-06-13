import { Dispatch, FC, useState } from "react";
import { createPortal } from "react-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Priority } from "../definitions/interfaces";
import { CreateTaskDto } from "../dto/index.dto";

interface SelectProps {
    options: Array<{ name: string, value: Priority }>;
    value: Priority;
    setData: Dispatch<React.SetStateAction<CreateTaskDto>>
}

const Select: FC<SelectProps> = ({ options, value, setData }) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <div onClick={() => setIsHidden(prev => !prev)} className={`cursor-pointer relative items-center flex justify-between max-w-70 w-screen rounded-[5px] px-2 py-1 bg-gray-50 border-1 border-zinc-200`}>
            <span className={`select-none text-[15px] font-['PoppinsMedium']`}>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            <RiArrowDropDownLine className={`fill-black size-6`} />

            {!isHidden && createPortal(
                <div onClick={(e) => {}} className={`p-8 flex justify-center items-center fixed inset-0 z-400 bg-transparent`}></div>,
                document.getElementById("modal") as HTMLDivElement
            )}

            {!isHidden &&
                <div className={`z-500 animate-select border-1 border-zinc-200 rounded-[5px] absolute left-0 top-[35px] w-full flex flex-col gap-0`}>
                    {options.map(option =>
                        <div onClick={() => setData(prev => ({ ...prev, priority: option.value }))} key={option.value} className={`transition-colors cursor-pointer hover:bg-gray-200 items-center w-full px-2 py-1 bg-gray-50`}>
                            <span className={`select-none text-[15px] font-['PoppinsMedium']`}>{option.name}</span>
                        </div>
                    )}
                </div>}
        </div>
    )
}

export default Select