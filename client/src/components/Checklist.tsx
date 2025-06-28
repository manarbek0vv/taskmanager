import { Dispatch, FC, useState } from "react";
import { TaskDto } from "../dto/index.dto";

interface CheckListProps {
    data: TaskDto;
    setData: Dispatch<React.SetStateAction<TaskDto>>;
}

const Checklist: FC<CheckListProps> = ({ data, setData }) => {
    const [value, setValue] = useState('');

    const addCheckItem = () => {
        if (!value.length) return
        if (!data.checkItems.some(({ title }) => title === value)) {
            setData(prev => ({ ...prev, checkItems: [...prev.checkItems, { title: value, completed: false }] }));
            setValue('');
        }
    }

    const removeCheckItem = (t: string) => {
        setData(prev => ({ ...prev, checkItems: prev.checkItems.filter(({ title }) => title !== t) }));
    }

    return (
        <div className={`flex flex-col gap-3`}>
            <span className={`text-[14px] font-['PoppinsMedium']`}>TODO Checklist</span>

            {/* <div className={`relative flex gap-3 w-full font-['PoppinsMedium'] transition-colors text-[16px] outline-0 rounded-[5px] px-4 py-2 bg-gray-100 border-1 border-zinc-200`}>
                <span className={`font-['PoppinsRegular'] text-gray-500`}>01</span>
                <span className={`text-gray-800`}>Create Product Card</span>

                <img src="/icons/trash-icon.png" className={`z-100 cursor-pointer size-[26px] right-2 top-[50%] translate-y-[-50%] absolute`} />
            </div>
            <div className={`relative flex gap-3 w-full font-['PoppinsMedium'] transition-colors text-[16px] outline-0 rounded-[5px] px-4 py-2 bg-gray-100 border-1 border-zinc-200`}>
                <span className={`font-['PoppinsRegular'] text-gray-500`}>02</span>
                <span className={`text-gray-800`}>Invite Guests</span>

                <img src="/icons/trash-icon.png" className={`z-100 cursor-pointer size-[26px] right-2 top-[50%] translate-y-[-50%] absolute`} />
            </div> */}

            {
                data.checkItems.map(({ title }, index) =>
                    <div key={title} className={`relative flex gap-3 w-full font-['PoppinsMedium'] transition-colors text-[16px] outline-0 rounded-[5px] px-4 py-2 bg-gray-100 border-1 border-zinc-200`}>
                        <span className={`font-['PoppinsRegular'] text-gray-500`}>{String(index + 1).padStart(2, '0')}</span>
                        <span className={`text-gray-800`}>{title}</span>

                        <img onClick={() => removeCheckItem(title)} src="/icons/trash-icon.png" className={`z-100 cursor-pointer size-[26px] right-2 top-[50%] translate-y-[-50%] absolute`} />
                    </div>
                )
            }

            <div className={`flex w-full gap-4 max-[500px]:flex-col`}>
                <input value={value} onChange={(e) => setValue(e.target.value)} className={`grow-1 transition-colors focus:border-gray-400 text-[16px] outline-0 rounded-[5px] px-3 py-2 bg-gray-50 border-1 border-zinc-200`} placeholder="Enter Task" />

                <button onClick={addCheckItem} className={`text-gray-800 hover:bg-gray-300 cursor-pointer shrink-0 grow-0 font-['PoppinsMedium'] transition-colors focus:border-gray-300 text-[16px] outline-0 rounded-[5px] px-4 py-2 bg-gray-100 border-1 border-zinc-200`}>+ Add</button>
            </div>
        </div>
    )
}

export default Checklist