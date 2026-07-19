import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

// shadcn zinc palette (zinc-300 -> zinc-900) for chart segments
const ZINC_COLORS = [
    "rgba(212, 212, 216, 0.9)",  // zinc-300
    "rgba(161, 161, 170, 0.9)",  // zinc-400
    "rgba(113, 113, 122, 0.9)",  // zinc-500
    "rgba(82, 82, 91, 0.9)",     // zinc-600
    "rgba(63, 63, 70, 0.9)",     // zinc-700
    "rgba(39, 39, 42, 0.9)",     // zinc-800
];

function ExpenseSummaryByCategory({ user }) {
    const [expenseData, setExpenseData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function getExpenseSummary() {
            setError(null);
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/v1/expenses/category-summary",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user.access_token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.detail || "Failed to load expense summary.");
                    return;
                }

                setExpenseData({
                    labels: data.map((obj) => obj.name),
                    datasets: [
                        {
                            label: "Total",
                            data: data.map((obj) => obj.total_amount),
                            backgroundColor: ZINC_COLORS,
                            borderColor: "rgb(24, 24, 27)", // zinc-900, gives clean separation between slices
                            borderWidth: 2,
                            hoverOffset: 6,
                        },
                    ],
                });
            } catch (err) {
                setError("Could not reach the server.");
            }
        }

        getExpenseSummary();
    }, [user]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "rgb(212, 212, 216)", // zinc-300
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    padding: 16,
                    font: {
                        size: 12,
                        family: "inherit",
                    },
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
                displayColors: true,
            },
        },
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="text-zinc-100 font-semibold text-base">Spend by Category</h1>
                {expenseData && (
                    <span className="text-xs text-zinc-500">
                        {expenseData.labels.length} categories
                    </span>
                )}
            </div>

            {error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : expenseData ? (
                <div className="relative h-64">
                    <Doughnut data={expenseData} options={chartOptions} />
                </div>
            ) : (
                <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-40 w-40 rounded-full bg-zinc-800 mx-auto" />
                    <p className="text-zinc-500 text-sm text-center">Loading data...</p>
                </div>
            )}
        </div>
    );
}

export default ExpenseSummaryByCategory;