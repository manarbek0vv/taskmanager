import { useContext, useEffect } from "react"
import { Context } from "./main"
import MainRoutes from "./components/MainRoutes";
import AuthRoutes from "./components/AuthRoutes";
import { observer } from "mobx-react-lite";
import Notifications from "./components/Notifications";

const App = observer(() => {
    const { auth } = useContext(Context);

    useEffect(() => {
        auth.checkAuth();
    }, [])
    
    return (
        <>
            <Notifications error={auth.error} success={auth.success} />

            <div className={`w-screen h-screen overflow-hidden`}>
                {
                    auth.isAuth
                        ? <MainRoutes />
                        : <AuthRoutes />
                }
            </div>
        </>
    )
})

export default App