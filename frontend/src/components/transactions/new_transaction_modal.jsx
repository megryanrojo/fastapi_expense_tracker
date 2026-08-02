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
        <div id="transaction-modal" className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">New Transaction</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        <input type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default TransactionModal;