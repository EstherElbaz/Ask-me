import React from "react";
import '../Styles/Form.css';


const MentorReq = () => {

    return (
        <div>
            <form action="/upload" method="post" encType="multipart/form-data" className="form">
            <h3>הרשם כמנטור</h3>
            <h4>תאר בקצרה את הרקע המקצועי שלך</h4>
            <input type="textBox"></input>
                <label htmlFor="fileUpload">בחר קובץ:</label>
                <input type="file" id="fileUpload" name="myFile" />
                <button type="submit">העלה</button>
            </form>
        </div>
    )

}

export default MentorReq;