import { useEffect, useState } from "react";
import QuestionItem from "./Question.tsx";
import { useParams } from "react-router-dom";
import { Question } from "../Models/Models";
import { mockQuestions } from "./data.tsx";

const QuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetched = mockQuestions.find((q) => q.id === id); 
    setQuestion(fetched || null);
  }, [id]);

  if (!question) return <p>שאלה לא נמצאה</p>;

  return (
    <div style={{ padding: "20px" }}>
      <QuestionItem question={question} />
    </div>
  );
};

export default QuestionPage;