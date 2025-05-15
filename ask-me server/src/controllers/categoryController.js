const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/categories.json');

const getAllCategories = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const categories = JSON.parse(data);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בטעינת הקטגוריות', error });
    }
};

const getCategoryById = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const categories = JSON.parse(data);
        const id = parseInt(req.params.id);

        const category = categories.find(cat => cat.id === id);

        if (!category) {
            return res.status(404).json({ message: 'הקטגוריה לא נמצאה' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בטעינת הקטגוריה', error });
    }
};

module.exports = { getAllCategories, getCategoryById };
