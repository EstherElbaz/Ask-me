const path = "http://localhost:5000/api/categories";

export const getAllCategories = async () => {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data;
};

export const getCategoryById = async (id) => {
    const response = await fetch(`${path}/${id}`);
    if(!response.ok){
        throw new Error("שגיאה בטעינת קטגוריה");
    }
    const category = await response.json();
    return category;
}