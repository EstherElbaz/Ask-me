import React, { useContext, useState } from "react";
import "../Styles/Question.css"
import { Question } from "../Models/Models";
import { UserContext } from "../Contexts/UserContext.tsx";
import AddAnswer from "./AddAnswer.tsx";

interface Props {
    question: Question;
}

const QuestionItem: React.FC<Props> = ({ question }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const { user } = useContext(UserContext);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [answers, setAnswers] = useState(question.answers || []);

    const handleAddAnswer = (newAnswer) => {
        const fullAnswer = {
            ...newAnswer,
            id: `temp-${Date.now()}`,
            createdBy: user?.fullName || "מנטור",
        };
        setAnswers([...answers, fullAnswer]);
    };

    return (
        <div className="question-item">
            <div className="question-header" onClick={() => setShowAnswer(!showAnswer)}>
                <div className="question-main-line">
                    <div className="question-with-arrow">
                        <span className={`arrow ${showAnswer ? 'open' : ''}`}>▶</span>
                        <p className="question-text">
                            <strong>שאלה:</strong> {question.text}
                        </p>
                    </div>
                    <p className="answer-count">
                        {question.answers.length === 0 ? 'עדיין אין תשובות' : `${question.answers.length} תשובות`}
                    </p>
                </div>
            </div>
            <div className={`answer ${showAnswer ? 'show' : ''}`}>
                {answers.length === 0 ? (
                    <p className="no-answers">אין עדיין תשובות לשאלה זו.</p>
                ) : (
                    <div className="answers-list">
                        {answers.map((ans) => (
                            <div key={ans.id} className="answer-card">
                                <p>{ans.text}</p>
                                <small>
                                    ענה: {ans.createdBy} | {new Date(ans.creationDate).toLocaleDateString()}
                                </small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {user?.role === "mentor" || user?.role === "admin" && (
                <>
                    <button style={{
                        marginTop: '2rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                        onClick={() => setShowAnswerModal(true)}>הוסף תשובה</button>
                </>
            )}
            {showAnswerModal && (
                <AddAnswer
                    questionId={question.id}
                    onClose={() => setShowAnswerModal(false)}
                    onAdd={handleAddAnswer}
                />
            )}
        </div>
    );
};

export default QuestionItem;