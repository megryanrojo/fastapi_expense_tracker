import { useState, useEffect } from 'react';

function TransactionModal({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user != null) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [user]);

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
                        {/* Form fields for adding a transaction go here */}
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}