import React, { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext.tsx";
import '../Styles/Form.css';
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Services/userService.tsx";

const LoginForm: React.FC = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("in login", email, password);
            const user = await checkUser(email, password);
            console.log("User logged in:", user);
            setUser(user);
            navigate("/home");

        } catch (err) {
            setError("שגיאה בהתחברות. בדוק את הפרטים.");
            <p>אין לך חשבון? <button onClick={() => navigate("/register")}>לחץ כאן להרשמה</button></p>

        }
    };

    return (
        <div className="form-container" dir="rtl">
            <h2>התחברות</h2>
            <form onSubmit={handleLogin} className="form">
                <div className="input-group">
                    <label>אימייל</label>
                    <input
                        // type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>סיסמה</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p className="input-group">אין לך חשבון? <button onClick={() => navigate("/register")}
                    style={{ borderBlockEndColor: "3b82f6", background: "none", }}>לחץ כאן להרשמה</button></p>

                {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
                <button type="submit" className="submit-btn">התחברות</button>
            </form>
        </div>
    );
};

export default LoginForm;