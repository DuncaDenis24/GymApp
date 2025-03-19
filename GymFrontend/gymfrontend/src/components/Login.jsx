import React, { useState, useEffect } from "react";
import "../styles/Login.css"; // Import CSS

const Login = () => {
    const [isTabActive, setIsTabActive] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
    const [isAdmin, setIsAdmin] = useState(false); // Toggle between user and admin login

    // Input states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [adminCode, setAdminCode] = useState(""); // Admin secret code

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabActive(!document.hidden);
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSignUp) {
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            console.log("Signing up with:", { name, surname, phone, email, password });
        } else if (isAdmin) {
            if (adminCode !== "GYM123") {  // Example hardcoded admin code
                alert("Invalid admin code!");
                return;
            }
            console.log("Admin logging in with:", { email, password, adminCode });
        } else {
            console.log("User logging in with:", { email, password });
        }
    };

    return (
        <div className={`login-container ${isTabActive ? "" : "inactive"}`}>
            <h2>{isSignUp ? "Sign Up" : isAdmin ? "Admin Login" : "User Login"}</h2>
            <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />

                        <label>Surname:</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Enter your surname" required />

                        <label>Phone:</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required />
                    </>
                )}

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />

                {isSignUp && (
                    <>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
                    </>
                )}

                {isAdmin && (
                    <>
                        <label>Admin Code:</label>
                        <input type="password" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} placeholder="Enter admin code" required />
                    </>
                )}

                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
            </form>

            <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-text">
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </p>

            {!isSignUp && (
                <p onClick={() => setIsAdmin(!isAdmin)} className="toggle-text">
                    {isAdmin ? "Switch to User Login" : "Login as Administrator"}
                </p>
            )}
        </div>
    );
};

export default Login;
