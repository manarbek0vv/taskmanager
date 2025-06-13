import { ChangeEvent, Dispatch, FC, useState } from "react";
import { SignupDto } from "../dto/index.dto";

interface AvatarProps {
    setData: Dispatch<React.SetStateAction<SignupDto>>;
}

const Avatar: FC<AvatarProps> = ({ setData }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        setData(prev => ({ ...prev, avatar: file }));

        const reader = new FileReader();
        reader.onload = () => setImageUrl(reader.result as string);
        reader.readAsDataURL(file);
    }


    return (
        <div className={`relative bg-gray-100 size-20 border-1 self-center border-gray-300 rounded-[50%]`}>
            <input onChange={handleFileChange} type="file" className="z-160 opacity-1 absolute bottom-0 right-0 size-6" />
            <div className="z-150 flex justify-center items-center absolute bottom-0 right-0 size-6 rounded-[50%] bg-red-500">
                <img className="size-4" src="/icons/edit-icon.png" alt="" />
            </div>
            {imageUrl && <img className="w-full h-full rounded-[50%] object-cover" src={imageUrl} />}
        </div>
    )
    }

    export default Avatar