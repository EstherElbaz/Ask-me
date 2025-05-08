import React, { JSX, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home.tsx";
import RegistrationForm from "./Components/Register.tsx";
import LoginForm from "./Components/LoginForm.tsx";
import { UserContext } from "./Contexts/UserContext.tsx";
import AdminArea from "./Components/Admin.tsx";
import PageNotFound from "./Components/PageNotFound.tsx";
import Profile from "./Components/Profile.tsx";

const SiteMap: React.FC = () => {
    const { user } = useContext(UserContext);
    const isAdmin = user?.role === "admin";
    const isLoggedIn = !!user;

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={isAdmin ? <AdminArea /> : <Navigate to="*" />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<PageNotFound/>} />

        </Routes>
    );
};

export default SiteMap;
