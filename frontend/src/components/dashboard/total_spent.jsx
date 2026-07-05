import { useState, useEffect } from "react";

function TotalSpent({ user }) {
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        if (!user) return;

        async function getExpenses() {
            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/expenses/total",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.access_token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(data.total_expenses);
                setTotalSpent(data.total_expenses);
            } else {
                alert(data.detail);
            }
        }

        getExpenses();
    }, [user]);

    return (
        <div className="bg-zinc-800 flex flex-col gap-2 p-5 border border-zinc-500">
            <h1 className="text-zinc-400">Total Expenses</h1>
            <p className="text-zinc-100">₱{totalSpent.toLocaleString()}</p>
        </div>
    );
}

export default TotalSpent;