import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import MiniBar from "./MiniBar";
import { useContext } from "react";
import { Context } from "../main";


const DoughnutComponent = () => {
    const { tasks } = useContext(Context);

    const pendingTasksCount = tasks.pendingTasksCount;
    const inProgressTasksCount = tasks.inProgressTasksCount;
    const completedTasksCount = tasks.completedTasksCount;

    const data: ChartData<'doughnut'> = {
        labels: ["Pending", "In Progress", "Completed"],
        datasets: [{
            data: [pendingTasksCount, inProgressTasksCount, completedTasksCount],
            backgroundColor: ["#ad46ff", "#00b8db", "#00c951"],
            borderWidth: 0,
            hoverBackgroundColor: ["#ad46ff", "#00b8db", "#00c951"],
        }],
    };

    const options: ChartOptions<'doughnut'> = {
        cutout: "70%",
        radius: 120,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw || 0;
                        return `Count: ${value}`;
                    }
                },
                backgroundColor: 'white',
                titleColor: 'purple',
                bodyColor: 'black',
                displayColors: false,
                titleFont: { size: 13 },
                bodyFont: { size: 12, weight: 'bold' },
                borderWidth: 1,
                borderColor: '#ebe6e7'
            }
        },
    };

    return (
        <div className="max-w-full shrink-1 gap-4 flex flex-col items-center grow-1 rounded-md border-1 border-gray-200 bg-white px-4 py-5">
            <h2 className="self-start font-['PoppinsSemiBold'] text-md">
                Task Distribution
            </h2>

            <div className="max-h-[250px] h-100%"> {/* Фиксированный размер для чарта */}
                <Doughnut data={data} options={options} />
            </div>

            <div className="flex gap-6 items-center justify-center max-[450px]:flex-col max-[450px]:gap-3">
                <MiniBar color="bg-purple-500">Pending</MiniBar>
                <MiniBar color="bg-cyan-500">In Progress</MiniBar>
                <MiniBar color="bg-green-500">Completed</MiniBar>
            </div>
        </div>
    );
};

export default DoughnutComponent;