import { Link } from "react-router"
import Input from "../UI/Input"
import Button from "../UI/Button"
import { useContext, useState } from "react"
import { SignupDto } from "../dto/index.dto"
import { Context } from "../main"
import Avatar from "../components/Avatar"

const Signup = () => {
    const [data, setData] = useState<SignupDto>({
        fullName: '', email: '', password: '', inviteToken: '', avatar: null,
    })
    const { auth } = useContext(Context);

    return (
        <div className={`w-full h-full flex gap-0`}>
            <div className={`flex w-[60%] flex-col gap-15 items-start px-8 py-8 justify-between max-[1250px]:w-full max-[1250px]:px-20 max-[600px]:px-8`}>
                <h1 className={`text-lg font-['PoppinsSemiBold'] text-black`}>Task Manager</h1>

                <div className="w-full h-full flex items-center">
                    <div className={`w-full flex flex-col gap-8`}>
                        <div className={`w-full flex flex-col gap-2`}>
                            <h2 className={`text-xl font-['PoppinsSemiBold'] text-black`}>Create an Account</h2>
                            <p className={`text-md text-gray-700 font-['PoppinsRegular']`}>
                                Join us today by entering your details below
                            </p>
                        </div>

                        <Avatar setData={setData} />

                        <form className={`w-full grid grid-cols-2 grid-rows-2 gap-5`}>
                            <Input onChange={(value) => setData(prev => ({ ...prev, fullName: value }))} label="Full Name" placeholder="John" />
                            <Input onChange={(value) => setData(prev => ({ ...prev, email: value }))} label="Email Address" placeholder="john@gmail.com" />
                            <Input onChange={(value) => setData(prev => ({ ...prev, password: value }))} label="Password" placeholder="Min 8 Characters" type="password" />
                            <Input onChange={(value) => setData(prev => ({ ...prev, inviteToken: value }))} label="Invite Token" placeholder="6 Digit Code" />
                            <Button onClick={() => auth.signup(data)} className="h-[50px] col-start-1 col-end-3" >Sign Up</Button>
                        </form>

                        <p className={`text-md font-['PoppinsMedium']`}>Already have an account? <Link to="/login" className={`underline text-blue-700`}>Login</Link></p>
                    </div>
                </div>
            </div>

            <div className={`bg-blue-400 w-[40%] h-full max-[1250px]:hidden`}></div>
        </div>
    )
}

export default Signup