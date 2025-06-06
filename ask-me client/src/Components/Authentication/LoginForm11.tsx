import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext.tsx";
import { checkUser } from "../../Services/userService.tsx";
import logo from "../../assets/logo.png";

const LoginForm: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await checkUser(email, password);
      setUser(user);
      navigate("/home");
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("שגיאה לא צפויה. נסה שוב.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-right animate-fade-in">
        <img src={logo} alt="לוגו" className="w-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-6">התחברות</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition duration-200 shadow-md"
          >
            התחברות
          </button>

          <p className="text-sm mt-3 text-center">
            אין לך חשבון?
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-indigo-600 hover:underline font-semibold ml-1"
            >
              לחץ כאן להרשמה
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;