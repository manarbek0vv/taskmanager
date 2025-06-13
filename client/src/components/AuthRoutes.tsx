import { Navigate, Route, Routes } from "react-router"
import Signup from "../pages/Signup"
import Login from "../pages/Login"

const AuthRoutes = () => {

    return (
        <Routes>
            <Route path="*" element={<Navigate to="/signup" />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
        </Routes>
    )
}

export default AuthRoutes