import { FC } from "react"

interface ButtonProps {
    children: string;
    className?: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ children , className, onClick }) => {

    return (
        <button onClick={onClick} type="button" className={`${className} hover:bg-blue-500 transition-colors font-['PoppinsRegular'] text-md block py-[8px] w-full rounded-md text-zinc-100 bg-blue-600`}>{children}</button>
    )
}

export default Button