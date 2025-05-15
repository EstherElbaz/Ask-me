import React, { useEffect, useState } from "react";
import QuestionItem from "./Question.tsx";
import { useParams } from "react-router-dom";
import { mockQuestions } from "./data.tsx";
import AddQuestion from "./AddQuestion.tsx";
import { getCategoryById } from "../Services/categoriesService.tsx";
import { Category, Question } from "../Models/Models.tsx";

const CategoryPage: React.FC = () => {

  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);

  const id = parseInt(categoryId || '0');

  const [showModal, setShowModal] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = (newQ: { text: string; userId: string; categoryId: number }) => {
    const newQuestion = {
      ...newQ,
      id: Math.random().toString(36).substring(2),
      creationDate: new Date(),
      answers: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const fetchCategory = async () => {
    try {
      const data = await (getCategoryById(id));
      setCategory(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchQuestions = async () => {
    const filtered = mockQuestions.filter((q) => q.categoryId === category!.id);
    setQuestions(filtered);
  }

  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    if (category) {
      fetchQuestions();
    }
  }, [category]);


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
      {questions.length === 0 ? (
        <p style={{ marginTop: '2rem' }}>אין עדיין שאלות בקטגוריה זו.</p>
      ) :
        questions.map((q) => (
          <QuestionItem key={q.id} question={q} />
        ))}

    </div>
  );
};

export default CategoryPage;