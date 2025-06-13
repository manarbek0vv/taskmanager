import { FC } from "react";

interface MiniBarProps {
    color: string;
    children: string;
}

const MiniBar: FC<MiniBarProps> = ({ color, children }) => {

    return (
        <div className="flex gap-2 items-center">
            <div className={`${color} size-3 rounded-[50%]`} />
            
            <span className={`inline-block text-[13px] font-['PoppinsRegular']`}>{children}</span>
        </div>
    )
}

export default MiniBar