import { useState, useEffect } from "react";

function RevenueCard({ user }) {
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function getRevenue() {
            setError(null);
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/v1/income/total",
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
                    setError(data.detail || "Failed to load total revenue.");
                    return;
                }

                setTotalRevenue(data.total_income);
            } catch (err) {
                setError("Could not reach the server.");
            }
        }

        getRevenue();
    }, [user]);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col gap-2">
            <h1 className="text-zinc-400 font-medium text-sm">Total Revenue</h1>

            {error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : totalRevenue === null ? (
                <div className="h-9 w-32 bg-zinc-800 rounded animate-pulse" />
            ) : (
                <p className="text-zinc-100 font-bold text-3xl tabular-nums">
                    ₱{totalRevenue.toLocaleString()}
                </p>
            )}
        </div>
    );
}

export default RevenueCard;