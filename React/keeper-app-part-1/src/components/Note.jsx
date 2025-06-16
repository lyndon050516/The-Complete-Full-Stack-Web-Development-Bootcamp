import React from "react";

const title = "Note";
const content = "Note content";

function Note() {
    return (
        <div className="note">
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}

export default Note;