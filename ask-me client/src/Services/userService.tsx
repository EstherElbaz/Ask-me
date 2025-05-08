const path = "http://localhost:5000/api/users";

export const checkUser = async (email, password) => {
    try {
        const response = await fetch(`${path}/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password}), 
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
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
