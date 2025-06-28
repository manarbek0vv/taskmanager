import { Dispatch, FC, useState } from "react";
import { TaskDto } from "../dto/index.dto"

interface AttachmentsProps {
    data: TaskDto;
    setData: Dispatch<React.SetStateAction<TaskDto>>;
}

const Attachments: FC<AttachmentsProps> = ({ data, setData }) => {
    const [value, setValue] = useState('');

    const addAttachment = () => {
        if (!value.length) return
        if (!data.attachments.some(attachment => attachment === value)) {
            setData(prev => ({ ...prev, attachments: [...prev.attachments, value] }));
            setValue('');
        }
    }

    const removeAttachment = (title: string) => {
        setData(prev => ({ ...prev, attachments: prev.attachments.filter(t => t !== title) }));
    }

    return (
        <div className={`flex flex-col gap-3`}>
            <span className={`text-[14px] font-['PoppinsMedium']`}>Attachments</span>

            {
                data.attachments.map(title =>
                    <div key={title} className={`relative flex gap-3 w-full font-['PoppinsMedium'] transition-colors text-[16px] outline-0 rounded-[5px] px-4 py-2 bg-gray-100 border-1 border-zinc-200`}>
                        <img className={`size-6`} src="/icons/gray-clip-icon.png" />
                        <span className={`text-gray-800`}>{title}</span>

                        <img onClick={() => removeAttachment(title)} src="/icons/trash-icon.png" className={`z-100 cursor-pointer size-[26px] right-2 top-[50%] translate-y-[-50%] absolute`} />
                    </div>
                )
            }

            <div className={`relative flex w-full gap-4 max-[500px]:flex-col`}>
                <img className={`left-4 top-[50%] max-[500px]:translate-y-[-40px] translate-y-[-50%] absolute size-6`} src="/icons/gray-clip-icon.png" />

                <input value={value} onChange={(e) => setValue(e.target.value)} className={`pl-13 grow-1 transition-colors focus:border-gray-400 text-[16px] outline-0 rounded-[5px] px-3 py-2 bg-gray-50 border-1 border-zinc-200`} placeholder="Add File Link" />

                <button onClick={addAttachment} className={`text-gray-800 hover:bg-gray-300 cursor-pointer shrink-0 grow-0 font-['PoppinsMedium'] transition-colors focus:border-gray-300 text-[16px] outline-0 rounded-[5px] px-4 py-2 bg-gray-100 border-1 border-zinc-200`}>+ Add</button>
            </div>
        </div>
    )
}

export default Attachments