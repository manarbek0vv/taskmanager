import { FC, ReactNode } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
    children: ReactNode;
    onClick: () => void;
    styles?: string;
}

const Modal: FC<ModalProps> = ({ children, onClick, styles }) => {

    return createPortal(
        <div onClick={onClick} className={`${styles} p-8 flex justify-center items-center fixed inset-0 z-500 bg-[rgba(0,0,0,0.2)]`}>
            {children}
        </div>,
        document.getElementById("modal") as HTMLDivElement
    )
}

export default Modal