import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_BASE_API_URL;
const PAGE_SIZE = 10;

function TransactionTable({ user }) {
    const [income, setIncome] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!user) return;

        async function getExpenses() {
            try {
                const response = await fetch(`${API_BASE}/api/v1/expenses`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.access_token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.detail || "Failed to load expenses.");
                    return;
                }

                const expenseList = Array.isArray(data) ? data : data.data;

                if (!Array.isArray(expenseList)) {
                    console.error("Unexpected expenses response shape:", data);
                    setError("Unexpected response from server.");
                    return;
                }

                setExpenses(expenseList.map((item) => ({ ...item, type: "expense" })));
            } catch (err) {
                console.error("getExpenses error:", err);
                setError("Could not reach the server.");
            }
        }

        async function getIncome() {
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
                    setError(data.detail || "Failed to load income.");
                    return;
                }

                const incomeList = Array.isArray(data) ? data : data.data;

                if (!Array.isArray(incomeList)) {
                    console.error("Unexpected income response shape:", data);
                    setError("Unexpected response from server.");
                    return;
                }

                setIncome(
                    incomeList.map((item) => ({ ...item, id: item.income_id, type: "income" }))
                );
            } catch (err) {
                console.error("getIncome error:", err);
                setError("Could not reach the server.");
            }
        }

        setError(null);
        getIncome();
        getExpenses();
    }, [user]);

    const isLoading = !income || !expenses;

    // Merge both lists and sort newest-first once both have loaded
    const transactions = isLoading
        ? []
        : [...income, ...expenses].sort(
              (a, b) => new Date(b.date_created) - new Date(a.date_created)
          );

    const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));

    // Clamp current page if the data shrinks (e.g. after a refetch)
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [totalPages, currentPage]);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = transactions.slice(startIndex, startIndex + PAGE_SIZE);

    function goToPage(page) {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">Transactions</h2>

            {error ? (
                <p className="text-red-400 text-sm">{error}</p>
            ) : isLoading ? (
                <div className="flex flex-col gap-2 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 bg-zinc-800 rounded" />
                    ))}
                </div>
            ) : transactions.length === 0 ? (
                <p className="text-zinc-500 text-sm">No transactions yet.</p>
            ) : (
                <>
                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="px-4 py-2 text-zinc-400 text-xs font-medium">Date</th>
                                    <th className="px-4 py-2 text-zinc-400 text-xs font-medium">Title</th>
                                    <th className="px-4 py-2 text-zinc-400 text-xs font-medium">Type</th>
                                    <th className="px-4 py-2 text-zinc-400 text-xs font-medium text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageItems.map((transaction) => {
                                    const isIncome = transaction.type === "income";
                                    return (
                                        <tr
                                            key={`${transaction.type}-${transaction.id}`}
                                            className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-colors"
                                        >
                                            <td className="px-4 py-2 text-zinc-100 whitespace-nowrap">
                                                {new Date(transaction.date_created).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 text-zinc-100">{transaction.title}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                                                        isIncome
                                                            ? "bg-green-950/40 text-green-400"
                                                            : "bg-red-950/40 text-red-400"
                                                    }`}
                                                >
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td
                                                className={`px-4 py-2 text-right font-medium tabular-nums ${
                                                    isIncome ? "text-green-400" : "text-red-400"
                                                }`}
                                            >
                                                {isIncome ? "+" : "-"}₱
                                                {Number(transaction.amount).toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
                        <p className="text-xs text-zinc-500">
                            Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, transactions.length)} of{" "}
                            {transactions.length}
                        </p>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded-md text-sm text-zinc-300 border border-zinc-700 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Prev
                            </button>

                            <span className="px-3 text-sm text-zinc-400 tabular-nums">
                                {currentPage} / {totalPages}
                            </span>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 rounded-md text-sm text-zinc-300 border border-zinc-700 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TransactionTable;