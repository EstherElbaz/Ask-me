import { User } from "../Models/Models";

const path = "http://localhost:5000/api/users";

export const checkUser = async (email: string, password: string): Promise<User> => {
    try {
        const response = await fetch(`${path}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            console.log("תגובה לא תקינה");
            
            switch (response.status) {
                case 404:
                    throw new Error("מייל לא קיים. ");
                case 401:
                    throw new Error("סיסמה שגויה");
                case 500:
                default:
                    throw new Error("שגיאה זמנית בשרת. לא לברוח, נסה שוב מאוחר יותר.");
            }
        }

        const user = await response.json();
        return user;
    } catch (err) {
        console.error('Login error:', err);
        throw err;
    }
}

export const createUser = async (user) => {
    try {
        const res = await fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error("Failed to create user");
        return await res.json();
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
};