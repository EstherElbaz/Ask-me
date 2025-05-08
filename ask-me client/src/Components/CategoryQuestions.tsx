import React from "react";
import QuestionItem from "./Question.tsx";

interface Props {
    category: string;
    questions: any[];
  }
  
  const CategoryQuestions: React.FC<Props> = ({ category, questions }) => {
    return (
      <div>
        <h3>{category}</h3>
        {questions.map((q) => (
          <QuestionItem key={q.id} question={q} />
        ))}
      </div>
    );
  };
  
  export default CategoryQuestions;