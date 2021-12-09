import React from "react";
import "./style.css"

export function SingleOption({ order, value, className,onOptionClick }) {
    return (
        <button className={`option ${className}`} onClick={() => onOptionClick(value)}>
            <span>{'ABCD'[order]}</span>
            <p>{value}</p>
        </button>
    );
}
