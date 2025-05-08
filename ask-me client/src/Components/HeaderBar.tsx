import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext.tsx';
import '../Styles/HeaderBar.css';
import AdminArea from './Admin.tsx';

const HeaderBar: React.FC = () => {

    const { user, setUser } = useContext(UserContext);
    console.log(user)
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [date, setDate] = useState(new Date);

    const isAdmin = user?.role == 'admin';

    const handleLogout = () => {
        setUser(null);
        console.log("התנתקת בהצלחה.");
        navigate("/");
    };

    return (
        <div className="header-bar">
            <span>שלום {user?.fullName}</span>
            {/* <span>{date.toString()}</span> */}
            <div className={`button-group ${menuOpen ? 'open' : ''}`}>
                <button onClick={handleLogout}>התנתק</button>
                <button onClick={() => navigate("/profile")}>פרופיל</button>
                {isAdmin && (
                    <button onClick={() => navigate("/admin")}>
                        לעמוד הניהול
                    </button> )}
            </div>
            <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
        </div>
    );
};

export default HeaderBar;
