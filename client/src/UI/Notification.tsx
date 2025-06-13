import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from 'react-transition-group'
import { Context } from "../main";

interface ModalProps {
    children: ReactNode;
}

const Notification: FC<ModalProps> = ({ children }) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { auth } = useContext(Context);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 1);
        setTimeout(() => setIsVisible(false), 5000);
    }, [])

    return createPortal(
        <CSSTransition onExited={() => auth.setError(null)}
            mountOnEnter unmountOnExit in={isVisible} nodeRef={nodeRef} timeout={300} classNames={"notification"}>
            <div ref={nodeRef} className={`left-[50%] translate-x-[-50%] p-8 top-0 fixed z-[1000]`}>
                <div className={`font-['PoppinsRegular'] text-sm flex gap-2 items-center bg-white px-4 py-2 shadow-sm shadow-gray-400 rounded-lg`}>
                    {children}
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("modal") as HTMLDivElement
    )
}

export default Notification

// import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react"
// import { createPortal } from "react-dom"
// import { CSSTransition } from 'react-transition-group'
// import { Context } from "../main";

// interface ModalProps {
//     children: ReactNode;
// }

// const Notification: FC<ModalProps> = ({ children }) => {
//     const nodeRef = useRef<HTMLDivElement | null>(null);
//     const [isVisible, setIsVisible] = useState(false);
//     const { store } = useContext(Context);

//     useEffect(() => {
//         setTimeout(() => setIsVisible(true), 1);
//         // setTimeout(() => setIsVisible(false), 5000);
//     }, [])

//     return createPortal(
//         <CSSTransition onExited={() => store.setError(null)}
//             mountOnEnter unmountOnExit in={isVisible} nodeRef={nodeRef} timeout={300} classNames={"notification"}>
//             <div ref={nodeRef} className={`items-start flex justify-center p-8 inset-0 fixed z-[-10]`}>
//                 <div className={`font-['PoppinsRegular'] text-sm flex gap-2 items-center bg-white px-4 py-2 shadow-sm shadow-gray-400 rounded-lg`}>
//                     {children}
//                 </div>
//             </div>
//         </CSSTransition>,
//         document.getElementById("modal") as HTMLDivElement
//     )
// }

// export default Notification