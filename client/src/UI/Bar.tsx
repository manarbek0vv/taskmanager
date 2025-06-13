import { ChartData, ChartOptions } from "chart.js"
import { useContext } from "react"
import { Bar } from "react-chartjs-2"
import { Context } from "../main";

const BarComponent = () => {
    const { tasks } = useContext(Context);

    const lowTasksCount = tasks.lowTasksCount;
    const mediumTasksCount = tasks.mediumTasksCount;
    const hightTasksCount = tasks.highTasksCount

    const data: ChartData<'bar'> = {
        labels: ['Low', 'Medium', 'High'],
        datasets: [{
            data: [lowTasksCount, mediumTasksCount, hightTasksCount],
            backgroundColor: ['#22c55e', '#f97316', '#ef4444'],
            borderRadius: 10,
        }]
    }

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 12 } } },
            y: { grid: { display: false }, border: { display: false }, beginAtZero: true }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (item) => { const value = item.raw; return `Count: ${value}` }
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
    }

    return (
        <div className={`flex-col gap-4 flex shrink-1 grow-1 rounded-md border-1 border-gray-200 bg-white px-4 py-5`}>
            <h2 className={`shrink-0 grow-0 font-['PoppinsSemiBold'] text-md`}>Task Priority Levels</h2>

            <div className={`shrink-1 grow-1`}>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default BarComponent