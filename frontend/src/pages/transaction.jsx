import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import SideBar from "../components/side_bar";
import TransactionTable from "../components/transactions/transaction_table"

const TransactionPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="min-h-screen bg-zinc-950 text-white">
            <NavBar user={user} handleLogout={handleLogout} handleSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

                <TransactionTable user={user} />
            </div>
        </div>
    )

}
export default TransactionPage;