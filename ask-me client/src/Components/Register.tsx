import React, { useState } from "react";
import MentorReq from "./MentorReq.tsx";
import '../Styles/Form.css';
import { createUser } from "../Services/userService.tsx";
import { useNavigate } from "react-router-dom";

const RegistrationForm: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const setNames = (name) => {
    setFullName(name);
    setUserName(name);
  }

  const handleSubmit = async (e) => {
    const newUser = { fullName, email, userName, password };
    e.preventDefault();
    try {
      console.log("in try")
      const savedUser = await createUser(newUser);
      alert(`User ${savedUser.name} created!`);
      navigate('/login');
    } catch (err) {
      alert("Failed to create user");
    }
  };

  return (
    <div className="form-container" dir="rtl">
      <h2>ברוך הבא</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>שם מלא (לא יוצג)</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setNames(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>אימייל (לא יוצג)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>שם משתמש</label>
          <input
            type="text"

            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>צור את הסיסמה שלך</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="submit-btn">הרשמה</button>
      </form>
      <MentorReq></MentorReq>
    </div>
  );
};

export default RegistrationForm;