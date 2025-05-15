import React from "react";
import HeaderBar from "./HeaderBar.tsx";
import '../Styles/Home.css';
import QuestionsList from "./QuestionsList.tsx";
import CategoriesSection from "./Categories.tsx";
import LatestQuestions from "./LastQuestions.tsx";
const Home: React.FC = () => {
    return (
        <div dir="rtl" className="home-container">
            <div className="content">
                <HeaderBar/>
                <LatestQuestions/>
                <input placeholder="🔍"style={{margin:"2%"}}/>
                <CategoriesSection />
              
            </div>
        </div>
    );
};

export default Home;