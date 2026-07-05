import {useState, useEffect} from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import SideBar from '../components/side_bar';
import DashboardNav from '../components/dashboard_nav';
import LandingPage from '../components/landing_page';
import TotalSpent from '../components/dashboard/total_spent';


const Dashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);


    function getUserData() {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData !== null) {
            console.log(userData.name)
            setUser(userData);
        } else {
            navigate("/")
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
            <>
            <div className='min-h-screen bg-zinc-950 text-white'>
                <DashboardNav 
                    user={user} 
                    handleLogout={handleLogout}
                    handleSidebarToggle={handleSidebarToggle}
                />
                <SideBar 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className='body inline-flex items-center mx-20 my-10 gap-10'>
                    <TotalSpent user={user} />
                </div>
            </div>
        </>
    )
}
export default Dashboard;