//TRANSACTION PAGE TO BE FINISHED
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import SideBar from "../components/side_bar";
import TransactionTable from "../components/transactions/transaction_table"
import AddTransactionButton from "../components/transactions/add_transaction_button";
import TransactionModal from "../components/transactions/new_transaction_modal";


const TransactionPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData !== null) {
            setUser(userData);
        } else {
            navigate("/");
        }
    }, []);

    function handleLogout() {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    }
    
    return (
        <div className="flex h-screen">
            <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col">
                <NavBar user={user} onLogout={handleLogout} setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 p-4 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4">Transactions</h1>
                    <AddTransactionButton user={user} />
                    <TransactionTable user={user} />
                    <TransactionModal user={user, buttonPressed}/>
                </div>
            </div>
        </div>
    );

}
export default TransactionPage;