import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_BASE_API_URL;

function TransactionTable({ user }) {
    const [transactions, setTransactions] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function getTransactions() {
            setError(null);
            try {
                const response = await fetch(`${API_BASE}/api/v1/income`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.access_token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.detail || "Failed to load transactions.");
                    return;
                }

                setTransactions(data.data);
            } catch (err) {
                setError("Could not reach the server.");
            }
        }

        getTransactions();
    }, [user]);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">Transactions</h2>

            {error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : !transactions ? (
                <div className="flex flex-col gap-2 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 bg-zinc-800 rounded" />
                    ))}
                </div>
            ) : transactions.length === 0 ? (
                <p className="text-zinc-500 text-sm">No transactions yet.</p>
            ) : (
                <div className="overflow-x-auto -mx-6">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="py-2.5 px-6 text-left font-medium text-zinc-500">Date</th>
                                <th className="py-2.5 px-6 text-left font-medium text-zinc-500">Title</th>
                                <th className="py-2.5 px-6 text-right font-medium text-zinc-500">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr
                                    key={transaction.income_id}
                                    className="border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/40 transition-colors"
                                >
                                    <td className="py-2.5 px-6 text-zinc-400">
                                        {new Date(transaction.date_created).toLocaleDateString("en-PH", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="py-2.5 px-6 text-zinc-100">{transaction.title}</td>
                                    <td className="py-2.5 px-6 text-right font-medium tabular-nums text-green-400">
                                        +₱{transaction.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}

                            {/* TODO: merge in expenses once /api/v1/expenses shape is confirmed.
                                Each expense row should get type: "expense", render amount in
                                text-red-400 with a "-" prefix, and both lists get merged + 
                                sorted by date_created before rendering. */}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TransactionTable;