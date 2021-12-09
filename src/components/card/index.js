import React from "react";
import "./style.css";
import { default as logo } from "../../assets/images/undraw_the_world_is_mine.svg";
export function Card({ children, displayHeaderImage = false }) {
    return (
        <div className="card_container">
            <h2 className="heading_outer">Country Quiz</h2>
            <div className="card">
                {displayHeaderImage && (
                    <div className="header_image">
                        <img src={logo} alt="" />
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
