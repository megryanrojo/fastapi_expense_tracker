import { useState, useEffect } from 'react';

const [totalSpent, setTotalSpent] = useState(0);

useEffect(() => {
    getExpenses();
}, []);


async function getExpenses() {
    const response = await fetch("http://127.0.0.1:8000/api/v1/expenses",

        {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            },
        }
    )
}

function TotalSpent() {
    return (
        <div className="bg-zinc-800 flex items-left flex-col gap-2 p-5 border border-zinc-500">
            <h1 className='text-zinc-400'>Total Spent</h1>
            <p className='text-zinc-100'>test</p>
        </div>
    )
}
export default TotalSpent; 