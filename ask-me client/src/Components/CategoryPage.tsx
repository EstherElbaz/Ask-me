import React, { useState } from "react";
import QuestionItem from "./Question.tsx";
import { useParams } from "react-router-dom";
import { categories, mockQuestions } from "./data.tsx";
import AddQuestion from "./AddQuestion.tsx";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const id = parseInt(categoryId || '0');
  const category = categories.find((c) => c.id === id);

  const [questions, setQuestions] = useState(
    mockQuestions.filter(
      (q) => q.categoryId === Number(category?.id))
  );

  const [showModal, setShowModal] = useState(false);

  const handleAddQuestion = (newQ: { text: string; userId: string; categoryId: number }) => {
    const newQuestion = {
      ...newQ,
      id: Math.random().toString(36).substring(2),
      creationDate: new Date(),
      answers: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{category?.description}</h2>
      <button
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
        onClick={() => setShowModal(true)}
      >
        הוסף שאלה
      </button>
      {showModal && (
        <AddQuestion
          categoryId={id}
          onClose={() => setShowModal(false)}
          onAdd={handleAddQuestion}
        />
      )}
      {questions.map((q) => (
        <QuestionItem key={q.id} question={q} />
      ))}

    </div>
  );
};

export default CategoryPage;
