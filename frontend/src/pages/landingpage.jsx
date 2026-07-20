import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import LandingPage from "../components/landing_page";
import LoginModal from "../components/login_modal";
import NavBar from "../components/navbar";

const LandingPageRoute = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData !== null) {
            setUser(userData);
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: username, password: password }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                setIsOpen(false);
                setPassword("");
                navigate("/dashboard");
            } else {
                setPassword("");
                alert(data.detail);
            }
        } catch (err) {
            alert("Could not reach the server. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleLogout() {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <>
            <NavBar user={user} handleLogout={handleLogout} setIsOpen={setIsOpen} />
            <LoginModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleSubmit={handleSubmit}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                isSubmitting={isSubmitting}
            />
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </>
    );
};

export default LandingPageRoute;