import React from "react";
import HeaderBar from "./HeaderBar.tsx";
import '../Styles/Home.css';
import QuestionsList from "./QuestionsList.tsx";
import CategoriesSection from "./Categories.tsx";
const Home: React.FC = () => {
    return (
        <div dir="rtl" className="home-container">
            <div className="content">
                <HeaderBar></HeaderBar>
                <h2>שאלות ותשובות אחרונות</h2>
                <QuestionsList />
                <h2>שאלות לפי נושאים</h2>
                <CategoriesSection />
              
            </div>
        </div>
    );
};

export default Home;