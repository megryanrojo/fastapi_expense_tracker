import { useState, useEffect } from 'react';
import { useNavigate, Router, Routes, Route } from 'react-router-dom';
import LandingPage from "../components/landing_page";
import LoginModal from '../components/login_modal';
import NavBar from "../components/navbar";

import DashBoard from '../pages/dashboard';

const LandingPageRoute = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=> {
        const userData = JSON.parse(localStorage.getItem("user"))

        if (userData !== null) {
        setUser(userData)
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(username, password);

        const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/login",

        {
            method: "POST",
            headers: {
            "content-Type": "application/json"
            },
            body: JSON.stringify({name: username, password: password})
        }
    )

    const data = await response.json();

    if (response.ok) {

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));

      setIsOpen(false);
      navigate("/dashboard");
    } else {
        alert(data.detail);
      }
    }

    function handleLogout() {
      setUser(null)
      localStorage.removeItem("user")

      navigate("/")
    }

    return (

        <>
            <NavBar
                user={user} 
                handleLogout={handleLogout} 
                setIsOpen={setIsOpen}
            />
            <LoginModal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                handleSubmit={handleSubmit} 
                username={username} 
                password={password} 
                setUsername={setUsername} 
                setPassword={setPassword}
            />
            <Routes>
                <Route path='/' element={<LandingPage/>}></Route>
            </Routes>

        </>
    )
}
export default LandingPageRoute;