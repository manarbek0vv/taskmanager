import DoughnutComponent from "../UI/Doughnut"
import BarComponent from "../UI/Bar"
import DashboardHeader from "../components/DashboardHeader"

const Dashboard = () => {

    return (
        <div className={`[scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar-width]:hidden flex flex-col gap-5 px-5 w-full h-full overflow-y-auto overflow-x-hidden py-8`}>
            <DashboardHeader />

            <div className={`max-[850px]:grid-rows-2 max-[850px]:grid-cols-1 w-full grid grid-rows-1 grid-cols-2 gap-5 `}>
                <DoughnutComponent />
        
                <BarComponent />
            </div>

            {/* <div className={`gap-4 flex flex-col w-full rounded-md border-1 border-gray-200 bg-white px-4 py-5`}>
                <div className={`w-full flex gap-4 justify-between items-center`}>
                    <h1 className={`font-['PoppinsSemiBold'] text-md`}>Recent Tasks</h1>

                    <button className={`cursor-pointer flex gap-3 rounded-md items-center px-3 py-1 bg-gray-200 font-['PoppinsMedium'] text-[14px]`}>
                        <Link to="/tasks" className={`block`}>See All</Link>

                        <FaArrowRight className={`size-3`} />
                    </button>
                </div>

                <div className={`gap-2 w-full flex flex-col px-4`}>
                    <div className={`text-[14px] font-['PoppinsMedium'] w-full flex gap-0 items-center`}>
                        <span className={`flex justify-start w-[46%]`}>Name</span>
                        <span className={`flex justify-start w-[18%]`}>Status</span>
                        <span className={`flex justify-start w-[18%]`}>Priority</span>
                        <span className={`flex justify-start w-[18%]`}>Created On</span>
                    </div>

                    <div className={`w-full h-0.5 bg-gray-200`} />

                    <div className={`text-[14px] font-['PoppinsRegular'] w-full flex gap-0 items-center`}>
                        <span className={`flex justify-start w-[46%]`}>Develop Product Review System</span>
                        <span className={`flex justify-start w-[18%]`}>Pending</span>
                        <span className={`flex justify-start w-[18%]`}>Low</span>
                        <span className={`flex justify-start w-[18%]`}>17th Mar 2025</span>
                    </div>
                    <div className={`w-full h-0.5 bg-gray-200`} />

                    <div className={`text-[14px] font-['PoppinsRegular'] w-full flex gap-0 items-center`}>
                        <span className={`flex justify-start w-[46%]`}>Develop Product Review System</span>
                        <span className={`flex justify-start w-[18%]`}>Pending</span>
                        <span className={`flex justify-start w-[18%]`}>Low</span>
                        <span className={`flex justify-start w-[18%]`}>17th Mar 2025</span>
                    </div>
                    <div className={`w-full h-0.5 bg-gray-200`} />

                    <div className={`text-[14px] font-['PoppinsRegular'] w-full flex gap-0 items-center`}>
                        <span className={`flex justify-start w-[46%]`}>Develop Product Review System</span>
                        <span className={`flex justify-start w-[18%]`}>Pending</span>
                        <span className={`flex justify-start w-[18%]`}>Low</span>
                        <span className={`flex justify-start w-[18%]`}>17th Mar 2025</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Dashboard