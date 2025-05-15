import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { mockQuestions } from "./data.tsx";
import "../Styles/Question.css";
import { useNavigate } from "react-router-dom";


const LatestQuestions: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <button className="arrow next">→</button>,
    prevArrow: <button className="arrow prev">←</button>,
  };

  const navigate = useNavigate();

  const handleQuestionClick = (id: string) => {
    navigate(`/question/${id}`);

  }

  return (
    <div className="latest-questions-container">
      <h2>שאלות אחרונות</h2>
      <Slider {...settings}>
        {mockQuestions.map((question) => (
          <div key={question.id} className="category-item"
            onClick={() => handleQuestionClick(question.id)}
            style={{ cursor: 'pointer' }}>
            <p>{question.text}</p>
            <span>{question.creationDate.toLocaleDateString()}</span>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>
              {question.answers.length === 0 ? 'אין תשובות' : `יש ${question.answers.length} תשובות`}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LatestQuestions;