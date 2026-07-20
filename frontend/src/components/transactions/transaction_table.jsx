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
                    "",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.access_token}`
                        }
                        

                    }
                );

                data = await response.json()

                if (response.ok) {
                    
                }

            } catch {

            }
        }

        }
    )   



} 