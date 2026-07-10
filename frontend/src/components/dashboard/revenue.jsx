import { useState, useEffect } from 'react';

function RevenueCard({ user }) {
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        if (!user) return;

        async function getRevenue() {
            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/income/total",
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
                console.log(data.total_income);
                setTotalRevenue(data.total_income);
            } else {
                alert(data.detail);
            }
        }
        
        getRevenue();
    }, [user]);

    return (
        <div className="bg-zinc-800 flex flex-col gap-2 p-5 border border-zinc-500">
            <h1 className="text-zinc-400 font-bold text-md">Total Revenue</h1>
            <p className="text-white font-bold text-2xl">₱{totalRevenue.toLocaleString()}</p>
        </div>
    );


}
export default RevenueCard;