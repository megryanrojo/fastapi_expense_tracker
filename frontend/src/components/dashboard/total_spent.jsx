import { useState, useEffect } from "react";

function TotalSpent({ user }) {
    const [totalSpent, setTotalSpent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function getExpenses() {
            setError(null);
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/v1/expenses/total",
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
                    setError(data.detail || "Failed to load total expenses.");
                    return;
                }

                setTotalSpent(data.total_expenses);
            } catch (err) {
                setError("Could not reach the server.");
            }
        }

        getExpenses();
    }, [user]);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col gap-2">
            <h1 className="text-zinc-400 font-medium text-sm">Total Expenses</h1>

            {error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : totalSpent === null ? (
                <div className="h-9 w-32 bg-zinc-800 rounded animate-pulse" />
            ) : (
                <p className="text-zinc-100 font-bold text-3xl tabular-nums">
                    ₱{totalSpent.toLocaleString()}
                </p>
            )}
        </div>
    );
}

export default TotalSpent;