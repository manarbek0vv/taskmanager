import { ChangeEventHandler, Dispatch, FC, useRef } from "react"
import { CreateTaskDto } from "../dto/index.dto";

interface LabelAreaProps {
    title: string;
    placeholder: string;
    value: string;
    onChange: Dispatch<React.SetStateAction<CreateTaskDto>>
}

const LabelArea: FC<LabelAreaProps> = ({ title, placeholder, value, onChange: setData }) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setData(prev => ({ ...prev, description: e.target.value }));
        if (!ref.current) return;
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }

    return (
        <label className={`flex flex-col gap-3`}>
            <span className={`text-[14px] font-['PoppinsMedium']`}>{title}</span>
            <textarea
                value={value}
                maxLength={500}
                onChange={onChange}
                ref={ref}
                className={`overflow-hidden resize-none transition-colors focus:border-gray-400 text-[14px] outline-0 rounded-[5px] px-3 py-3 bg-gray-50 border-1 border-zinc-200`} placeholder={placeholder} />
        </label>
    )
}

export default LabelArea