import React, { useState } from "react";
import "../Styles/Question.css"

interface Props {
    question: {
        id: number;
        question: string;
        answer: string;
        category: string;
        user: string;
        date: string;
    };
}

const QuestionItem: React.FC<Props> = ({ question }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (

        <div className="question-item">
            <div className="question-header" onClick={() => setShowAnswer(!showAnswer)}>
                <span className={`arrow ${showAnswer ? 'open' : ''}`}>▶</span>
                <p className="question-text"><strong>שאלה:</strong> {question.question}</p>
            </div>
            <div className={`answer ${showAnswer ? 'show' : ''}`}>
                <p><strong>תשובה:</strong> {question.answer}</p>
                <small>מאת: {question.user} | תאריך: {question.date}</small>
            </div>
        </div>
    );
};

export default QuestionItem;