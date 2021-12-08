import React from "react";
import "./style.css"

export function SingleOption({ number, value, className,onOptionClick }) {
    return (
        <button className={`option ${className}`} onClick={() => onOptionClick(value)}>
            <span>{number}</span>
            <p>{value}</p>
        </button>
    );
}
