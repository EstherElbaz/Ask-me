import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext.tsx"
import React from "react";


const Profile = () => {

    const { user } = useContext(UserContext);
    return (
        <div>
            {user && Object.entries(user).map(([key, value]) => (
                <p key={key}>
                    <strong>{key}:</strong> {String(value)}
                </p>
            ))}
        </div>
    )
}

export default Profile;