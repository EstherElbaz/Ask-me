import React, { JSX, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home.tsx";
import RegistrationForm from "./Components/Authentication/Register.tsx";
import LoginForm from "./Components/Authentication/LoginForm.tsx";
import { UserContext } from "./Contexts/UserContext.tsx";
import AdminArea from "./Components/Admin.tsx";
import PageNotFound from "./Components/PageNotFound.tsx";
import Profile from "./Components/Profile.tsx";
import CategoryPage from "./Components/CategoryPage.tsx";
import QuestionPage from "./Components/QuestionPage.tsx";

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
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/question/:id" element={<QuestionPage />} />
        </Routes>
    
    );
};

export default SiteMap;