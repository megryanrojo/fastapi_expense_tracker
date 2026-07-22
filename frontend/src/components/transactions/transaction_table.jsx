import { useState, useEffect } from "react";
import { Chart } from "chart.js";


function TransactionTable({ user }) {
    const [incomeData, setIncomeData] = useState(null);
    const [expenseData, setExpenseData] = useState(null);

    useEffect(() => {
        if (!user) return;

        async function getIncomeData() {
            
            try {
                const response = await fetch( 
                    `${import.meta.env.VITE_BASE_API_URL}/api/v1/income`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.access_token}`
                        }
                        

                    }
                );

                const data = await response.json();

                if (response.ok) {
                    console.log(data["data"]);
                    setIncomeData(data);
                    console.log(incomeData["data"]);
                }

            } catch {

            }
        }

        getIncomeData()
        }, [user]); 

        return (
            <div className="bg-zinc-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Transaction Table</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-zinc-900 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-zinc-700">Date</th>
                                <th className="py-2 px-4 border-b border-zinc-700">Description</th>
                                <th className="py-2 px-4 border-b border-zinc-700">Amount</th>
                                <th className="py-2 px-4 border-b border-zinc-700">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeData && incomeData.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="py-2 px-4 border-b border-zinc-700">{transaction.date}</td>
                                    <td className="py-2 px-4 border-b border-zinc-700">{transaction.description}</td>
                                    <td className="py-2 px-4 border-b border-zinc-700">{transaction.amount}</td>
                                    <td className="py-2 px-4 border-b border-zinc-700">{transaction.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>  
        )
        
}
export default TransactionTable;