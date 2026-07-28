import { useState, useEffect } from "react";

function TransactionButton({ user }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    useEffect(() => {
        if (user && user.role === "admin") {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [user]);

    return (
        <button
            className={`px-4 py-2 rounded-md text-white ${isButtonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={isButtonDisabled}
            onClick={() => {
                if (!isButtonDisabled) {
                    // Logic to add a transaction goes here
                    console.log("Add Transaction button clicked");
                }
            }}
        >
            Add Transaction
        </button>
    );
}

export default AddTransactionButton;

