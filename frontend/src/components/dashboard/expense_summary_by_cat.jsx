import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExpenseSummaryByCategory({ user }) {
    const [expenseData, setExpenseData] = useState({});

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
                setExpenseData({
                    labels: categories,
                    datasets: [
                        {
                            label: 'Total Expenses by Category',
                            data: amounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } else {
                alert(data.detail);
            }
        }
    } , [user]);

    return (
        <div className="bg-zinc-800 flex flex-col gap-2 p-5 border border-zinc-500 w-full">
            <h1 className="text-zinc-400 font-bold text-md">Expense Summary by Category</h1>
            <Bar data={expenseData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Expenses by Category' } } }} />
        </div>
    );
}
export default ExpenseSummaryByCategory;