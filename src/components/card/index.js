import React from "react";
import "./style.css"
export function Card({ children }) {
    return (
        <div className="card_container">
            <h2 className="heading_outer">Country Quiz</h2>
            <div className="card">{children}</div>
        </div>
    );
}
