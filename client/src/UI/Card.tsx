import { FC } from "react"

interface BarProps {
    color: string;
    children: string;
    count: number
}

const Card: FC<BarProps> = ({ color, children, count }) => {

    return (
        <div className={`flex gap-3 items-center`}>
            <div className={`rounded-md w-[6px] h-[20px] ${color}`} />

            <span className={`flex gap-[6px] text-[14px] font-['PoppinsRegular'] text-gray-500`}>
                <span className={`text-black font-['PoppinsBold']`}>{count}</span>

                {children}
            </span>
        </div>
    )
}

export default Card