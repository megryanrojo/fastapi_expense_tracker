import { useState, useEffect } from "react";

function NetBalance({ user }) {
    const [netBalance, setNetBalance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function getNetBalance() {
            setError(null);
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/v1/users/me/net-balance",
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
                    setError(data.detail || "Failed to load net balance.");
                    return;
                }

                setNetBalance(data.net_balance);
            } catch (err) {
                setError("Could not reach the server.");
            }
        }

        getNetBalance();
    }, [user]);

    const isPositive = netBalance !== null && netBalance >= 0;

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col gap-2">
            <h1 className="text-zinc-400 font-medium text-sm">Net Balance</h1>

            {error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : netBalance === null ? (
                <div className="h-9 w-32 bg-zinc-800 rounded animate-pulse" />
            ) : (
                <p
                    className={`font-bold text-3xl tabular-nums ${
                        isPositive ? "text-zinc-100" : "text-red-400"
                    }`}
                >
                    {isPositive ? "" : "-"}₱
                    {Math.abs(netBalance).toLocaleString()}
                </p>
            )}
        </div>
    );
}

export default NetBalance;