import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

function MonthlyCashFlow({ user }) {
    const [incomeCashFlowData, setIncomeCashFlowData] = useState(null);
    const [expenseCashFlowData, setExpenseCashFlowData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function getExpenseCashFlow() {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/v1/expenses/expense-cash-flow",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.access_token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.detail || "Failed to load expense cash flow.");
                    return;
                }

                setExpenseCashFlowData({
                    labels: data.map((obj) => obj.month),
                    datasets: [
                        {
                            label: "Expenses",
                            data: data.map((obj) => obj.total_amount),
                            borderColor: "rgb(248, 113, 113)", // red-400
                            backgroundColor: "rgba(248, 113, 113, 0.15)",
                            borderWidth: 2,
                            tension: 0.3,
                            pointRadius: 3,
                            pointBackgroundColor: "rgb(248, 113, 113)",
                            fill: true,
                        },
                    ],
                });
            } catch (err) {
                setError("Could not reach the server.");
            }
        }

        async function getIncomeCashFlow() {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/v1/income/cash-flow",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.access_token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.detail || "Failed to load income cash flow.");
                    return;
                }

                setIncomeCashFlowData({
                    labels: data.map((obj) => obj.month),
                    datasets: [
                        {
                            label: "Income",
                            data: data.map((obj) => obj.total_amount),
                            borderColor: "rgb(74, 222, 128)", // green-400
                            backgroundColor: "rgba(74, 222, 128, 0.15)",
                            borderWidth: 2,
                            tension: 0.3,
                            pointRadius: 3,
                            pointBackgroundColor: "rgb(74, 222, 128)",
                            fill: true,
                        },
                    ],
                });
            } catch (err) {
                setError("Could not reach the server.");
            }
        }

        getExpenseCashFlow();
        getIncomeCashFlow();
    }, [user]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "rgb(212, 212, 216)", // zinc-300
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    padding: 16,
                },
            },
            tooltip: {
                backgroundColor: "rgb(39, 39, 42)", // zinc-800
                titleColor: "rgb(250, 250, 250)",
                bodyColor: "rgb(212, 212, 216)",
                borderColor: "rgb(63, 63, 70)",
                borderWidth: 1,
                padding: 10,
                cornerRadius: 6,
            },
        },
        scales: {
            x: {
                ticks: { color: "rgb(161, 161, 170)" }, // zinc-400
                grid: { color: "rgb(39, 39, 42)" }, // zinc-800, subtler than zinc-700
            },
            y: {
                ticks: { color: "rgb(161, 161, 170)" },
                grid: { color: "rgb(39, 39, 42)" },
            },
        },
    };

    const isLoading = !incomeCashFlowData || !expenseCashFlowData;

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-zinc-100 font-semibold text-base">Monthly Cash Flow</h2>
                {!isLoading && !error && (
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400" /> Income
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-400" /> Expenses
                        </span>
                    </div>
                )}
            </div>

            {error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : isLoading ? (
                <div className="h-64 flex flex-col justify-end gap-2 animate-pulse px-2">
                    <div className="flex items-end gap-2 h-full">
                        {[40, 65, 30, 80, 50, 70].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-zinc-800 rounded-t"
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                    <p className="text-zinc-500 text-sm text-center">Loading data...</p>
                </div>
            ) : (
                <div className="h-64">
                    <Line
                        data={{
                            labels: incomeCashFlowData.labels,
                            datasets: [
                                ...incomeCashFlowData.datasets,
                                ...expenseCashFlowData.datasets,
                            ],
                        }}
                        options={chartOptions}
                    />
                </div>
            )}
        </div>
    );
}

export default MonthlyCashFlow;