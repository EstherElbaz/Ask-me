import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Categories.css";
import { Category } from '../Models/Models';
import { getAllCategories } from '../Services/categoriesService.tsx';

const CategoriesSection: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const handleCategoryClick = (id: number) => {
        navigate(`/category/${id}`);
    };
    return (
        <div className="container">
            {
                categories.map((cat) => (
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
