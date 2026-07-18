import React from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ExpenseSummaryByCategory({ user }) {
    const [expenseData, setExpenseData] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function GetExpenseSummary() {
            const response = await fetch(
                'http://127.0.0.1:8000/api/v1/expenses/category-summary',
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.access_token}`,
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(data);

                const categories = data.map(obj => obj.name);
                const total_amount = data.map(obj => obj.total_amount);

                setExpenseData({
                    labels: categories,
                    datasets: [
                        {
                            label: 'Total',
                            data: total_amount,
                            backgroundColor: [
                                'rgba(250, 250, 249, 0.91)',
                                'rgba(84, 84, 94, 0.72)',
                                'rgba(17, 24, 39, 0.6)',
                                'rgba(12, 12, 13, 0.6)',
                            ],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ]
                })
            } else {
                alert(data.detail);
            }
        }

        GetExpenseSummary();
    } , [user]);

    return (
        <div className="bg-zinc-800 flex flex-col gap-2 p-5 border border-zinc-500">
            <h1 className="text-zinc-400 font-bold text-md">Spend by Category</h1>
            {expenseData ? (
                <Doughnut data={expenseData}/>
            ) : (
                    <p className="text-white font-bold text-2xl">Loading Data...</p>
                )
            }
        </div>
    );
}
export default ExpenseSummaryByCategory;