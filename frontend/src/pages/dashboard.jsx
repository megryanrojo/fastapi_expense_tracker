import {useState, useEffect} from 'react';
import NavBar from '../components/navbar';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    function getUserData() {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData !== null) {
            setUser(userData);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    function handleLogout() {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <div className='min-h-screen bg-zinc-950 text-white'>
            <p></p>
        </div>
    )
}
export default Dashboard;