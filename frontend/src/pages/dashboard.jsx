import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/side_bar";
import DashboardNav from "../components/dashboard_nav";
import TotalSpent from "../components/dashboard/total_spent";
import RevenueCard from "../components/dashboard/revenue";
import NetBalance from "../components/dashboard/net_balance";
import ExpenseSummaryByCategory from "../components/dashboard/expense_summary_by_cat";
import MonthlyCashFlow from "../components/dashboard/cash_flow";

const Dashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    function getUserData() {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData !== null) {
            setUser(userData);
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    function handleLogout() {
        navigate("/");
        setUser(null);
        localStorage.removeItem("user");
    }

    function handleSidebarToggle() {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <DashboardNav
                user={user}
                handleLogout={handleLogout}
                handleSidebarToggle={handleSidebarToggle}
            />
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <TotalSpent user={user} />
                    <RevenueCard user={user} />
                    <NetBalance user={user} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ExpenseSummaryByCategory user={user} />
                    <MonthlyCashFlow user={user} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;