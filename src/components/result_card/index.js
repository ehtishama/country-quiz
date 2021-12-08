import React from "react";
import { Card } from "../card";
import { default as resultLogo } from "../../assets/images/undraw_winners.svg";
import "./style.css";

export function ResultCard({ score, onTryAgain }) {
    return (
        <Card>
            <div className="result-card">
                <div className="logo">
                    <img src={resultLogo} alt="" />
                </div>
                <h2 className="heading">Results</h2>
                <p>
                    You got <span className="score">{score}</span> correct answers.
                </p>
                <button className="btn" onClick={onTryAgain}>Try again</button>
            </div>
        </Card>
    );
}
