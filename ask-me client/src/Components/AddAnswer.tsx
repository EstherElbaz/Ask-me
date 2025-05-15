import React, { useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext.tsx";
import "../Styles/Modal.css";

interface Props {
    questionId: string;
    onClose: () => void;
    onAdd: (newAnswer: {
        text: string;
        userId: string;
        questionId: string;
        creationDate: Date;
    }) => void;
}

const AddAnswer: React.FC<Props> = ({ questionId, onClose, onAdd }) => {
    const [text, setText] = useState("");
    const { user } = useContext(UserContext);

    const handleSubmit = (e: React.FormEvent) => {
        console.log("clicked submit");
        e.preventDefault();
        console.log("text:", text);
        console.log("user:", user);
        if (!text.trim() || !user?.id) {
            console.log("missing data");
            return;
        }


        onAdd({
            text,
            userId: user.id,
            questionId,
            creationDate: new Date(),
        });

        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>הוסף תשובה</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="כתוב את התשובה כאן..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                    />
                    <div className="modal-buttons">
                        <button type="submit">הוסף</button>
                        <button type="button" onClick={onClose}>
                            ביטול
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAnswer;
