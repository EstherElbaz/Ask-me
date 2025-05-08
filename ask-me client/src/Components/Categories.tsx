import React from 'react';
import CategoryQuestions from './CategoryQuestions.tsx';
import { categories, mockQuestions } from './data.tsx';

const CategoriesSection: React.FC = () => {
    return (
        <div>
            {categories.map((cat) => (
                <CategoryQuestions
                    key={cat}
                    category={cat}
                    questions={mockQuestions.filter(q => q.category === cat)}
                />
            ))}
        </div>
    );
};

export default CategoriesSection;
