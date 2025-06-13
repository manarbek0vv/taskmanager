import { FC } from "react";

interface AttachmentsItemProps {
    attachment: string;
    index: number;
}

const AttachmentsItem: FC<AttachmentsItemProps> = ({ attachment, index }) => {

    return (
        <div key={attachment} className={`flex items-center gap-3 w-full font-['PoppinsMedium'] transition-colors text-[16px] outline-0 rounded-[5px] px-4 py-2 bg-gray-100 border-1 border-zinc-200`}>
            <span className={`font-['PoppinsMedium'] text-gray-500`}>{String(index + 1).padStart(2, '0')}</span>
            <span className={`font-['PoppinsSemiBold'] grow text-gray-800`}>{attachment}</span>
            <a href={attachment} target="_blank" className={`h-full flex items-center`}><img className={`size-5`} src="/icons/external-link.png" /></a>
        </div>
    )
}

export default AttachmentsItem