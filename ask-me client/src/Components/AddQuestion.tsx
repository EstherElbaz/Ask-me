import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext.tsx";
import "../Styles/Modal.css";
import "../Styles/Question.css";

interface Props {
    categoryId: number;
    onClose: () => void;
    onAdd: (newQuestion: {
        text: string;
        userId: string;
        categoryId: number;
    }) => void;
}

const AddQuestion: React.FC<Props> = ({ categoryId, onClose, onAdd }) => {
    const [text, setText] = useState("");
    const { user } = useContext(UserContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd({
            text,
            userId: user!.id,
            categoryId,
        });
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>הוסף שאלה חדשה</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="כתוב את השאלה כאן..."
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

export default AddQuestion;
