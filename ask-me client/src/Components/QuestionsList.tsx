import React from 'react';
import QuestionItem from './Question.tsx';
import { mockQuestions } from './data.tsx';

const QuestionsList: React.FC = () => {
    
    return (
        <div>
            {/* {mockQuestions.slice(0, 3).map((q) => (
                <QuestionItem key={q.id} question={q} />
            ))} */}
        </div>
    );
};

export default QuestionsList;