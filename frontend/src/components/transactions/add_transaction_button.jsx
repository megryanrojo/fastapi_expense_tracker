import { useState, useEffect } from "react";

function AddTransactionButton({ user }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    useEffect(() => {
        if (user != null) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [user]);

    return (
        <button
            className={`px-4 py-2 rounded-md text-white ${isButtonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-zinc-900 border border-zinc-800 hover:bg-zinc-600 cursor-pointer"}`}
            disabled={isButtonDisabled}
            onClick={() => {
                if (!isButtonDisabled) {
                    const modal = document.getElementById("transaction-modal");
                    if (modal) {
                        modal.style.display = "block";
                    }
                }
            }}
        >
            + New Transaction
        </button>
    );
}

export default AddTransactionButton;

