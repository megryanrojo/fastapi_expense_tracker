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
                    console.log(data)
                }

            } catch {

            }
        }

        getIncomeData()
        }, [user]); 
        
}
export default TransactionTable;