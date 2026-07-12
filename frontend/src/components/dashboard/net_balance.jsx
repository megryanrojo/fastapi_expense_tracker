import { useState, useEffect } from "react";

function NetBalance({ user }) {
    const [netBalance, setNetBalance] = useState(0);

    useEffect(() => {
        if (!user) return;

        async function GetNetBalance() {

            const response = await fetch(
                'http://127.0.0.1:8000/api/v1/users/me/net-balance',

                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.access_token}`,
                    }
                }
            )

            const data = await response.json()

            if (response.ok) {
                console.log(data);
                setNetBalance(data.net_balance);
            } else {
                alert(data.detail);
            }
    
        }
        GetNetBalance();
    }, [user]);

    return (
        <div className="bg-zinc-800 flex flex-col gap-2 p-5 border border-zinc-500">
            <h1 className="text-zinc-400 font-bold text-md">Net Balance</h1>
            <p className="text-white font-bold text-2xl">₱{netBalance.toLocaleString()}</p>
        </div>
    )


}
export default NetBalance;