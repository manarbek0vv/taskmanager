import { FC } from "react"
import Notification from "../UI/Notification"
import ErrorMark from "../UI/ErrorMark";
import { observer } from "mobx-react-lite";
import CheckMark from "../UI/CheckMark";
import { IError } from "../definitions/interfaces";

interface NotificationsProps {
    error: IError | null;
    success: string | null
}

const Notifications: FC<NotificationsProps> = observer(({ error, success }) => {

    return (
        <>
            {
                error &&
                <Notification>
                    <ErrorMark />
                    <h1>
                        {
                            error.errors ?
                                error.errors[0].message :
                                error.message
                        }
                    </h1>
                </Notification>
            }

            {
                success &&
                <Notification>
                    <CheckMark />
                    <h1>{success}</h1>
                </Notification>
            }
        </>
    )
})

export default Notifications