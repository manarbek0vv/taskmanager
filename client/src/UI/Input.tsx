import { FC, MouseEventHandler, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
    label: string;
    placeholder: string;
    type?: "text" | "password";
    onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({ label, placeholder, type, onChange }) => {
    const [isHidden, setIsHidden] = useState(true)

    const onClick: MouseEventHandler<SVGElement> = () => setIsHidden(prev => !prev);

    return (
        <label className={`flex flex-col gap-2 items-start relative`}>
            <span className={`text-md inline-block text-gray-700`}>{label}</span>

            {type == 'password' && isHidden && <FaRegEyeSlash onClick={onClick} className="absolute bottom-3 right-3 fill-gray-600" />}
            {type == 'password' && !isHidden && <FaRegEye onClick={onClick} className="absolute bottom-3 right-3 fill-gray-600" />}

            <input onChange={(e) => onChange(e.target.value)} type={isHidden && type == 'password' ? 'password' : 'text'} placeholder={placeholder} className={`${type == 'password' ? 'pr-[36px]' : ''} w-full transition-colors focus:border-gray-500 bg-gray-100 border-1 outline-none border-gray-300 rounded-lg text-md h-auto block px-[10px] py-[8px]`} />
        </label>
    )
}

export default Input