import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, mockQuestions } from './data.tsx';
import "../Styles/Categories.css";

const CategoriesSection: React.FC = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (id: number) => {
        navigate(`/category/${id}`);
    };
    return (
        <div className="container">
            {categories.map((cat) => (
                <div key={cat.id}
                    className="category-item"
                    onClick={() => handleCategoryClick(cat.id)}
                    style={{ cursor: 'pointer' }}>
                    {cat.description}

                </div>
            ))}
        </div>
    );
};

export default CategoriesSection;
