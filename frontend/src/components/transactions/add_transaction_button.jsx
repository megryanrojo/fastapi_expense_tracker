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
            className={`px-4 py-2 mb-4 rounded ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            disabled={isButtonDisabled}
            onClick={() => {
                const modal = document.getElementById("transaction-modal");
                if (modal) {
                    modal.style.display = "block";
                }
            }}
        >
            Add Transaction
        </button>
    );
}

export default AddTransactionButton;

