import { Link } from "react-router"
import Input from "../UI/Input"
import Button from "../UI/Button"
import { useContext, useState } from "react"
import { Context } from "../main"
import { LoginDto } from "../dto/index.dto"

const Login = () => {
    const [data, setData] = useState<LoginDto>({email: '', password: ''})
    const { auth } = useContext(Context);

    return (
        <div className={`w-full h-full flex gap-0`}>
            <div className={`flex w-[60%] flex-col gap-15 items-start px-8 py-8 justify-between max-[1250px]:w-full`}>
                <h1 className={`text-lg font-['PoppinsSemiBold'] text-black`}>Task Manager</h1>

                <div className="w-[70%] h-full flex items-center max-[1250px]:w-full max-[1250px]:px-20 max-[600px]:px-0">
                    <div className={`w-full flex flex-col gap-8`}>
                        <div className={`w-full flex flex-col gap-2`}>
                            <h2 className={`text-xl font-['PoppinsSemiBold'] text-black`}>Welcome Back</h2>
                            <p className={`text-md text-gray-700 font-['PoppinsRegular']`}>
                                Please enter your details to log in
                            </p>
                        </div>

                        <form className={`w-full grid grid-cols-1 grid-rows-3 gap-5`}>
                            <Input onChange={(value) => setData(prev => ({...prev, email: value}))} label="Email Address" placeholder="john@gmail.com" />
                            <Input onChange={(value) => setData(prev => ({...prev, password: value}))} label="Password" placeholder="Min 8 Characters" type="password" />
                            <Button onClick={() => auth.login(data)} className={'h-[50px]'}>Login</Button>
                        </form>

                        <p className={`text-md font-['PoppinsMedium']`}>Don't have an account? <Link to="/signup" className={`underline text-blue-700`}>SignUp</Link></p>
                    </div>
                </div>
            </div>

            <div className={`bg-blue-400 w-[40%] h-full max-[1250px]:hidden`}></div>
        </div>
    )
}

export default Login