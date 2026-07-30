import { useState, useEffect } from 'react';

function TransactionModal({ user, buttonPressed, amount, description }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [IsButtonPressed, setIsButtonPressed] = useState(false);

    useEffect(() => {
        if (user != null && buttonPressed == true) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [user]);

    return (
        <div
            id="transaction-modal"
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? 'block' : 'hidden'}`}
        >
            <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">New Transaction</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-zinc-400 mb-1.5">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-zinc-400 mb-1.5">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add Transaction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default TransactionModal;