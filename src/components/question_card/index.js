import React, { useState } from "react";
import { Card } from "../card";
import { SingleOption } from "./single_option";
import "./style.css";

export function QuestionCard({
    showAnswer,
    country,
    options,
    capital,
    onOptionClick,
    flag = null,
}) {
    const [selectedOption, setSelectedOption] = useState(null);

    const __onOptionClick = (option) => {
        setSelectedOption(option);
        onOptionClick(option);
    };
    return (
        <Card>
            {flag && (
                <>
                    <div className="flag-container">
                        <img src={flag} alt={"Flag to guess"} />
                    </div>
                    <h2 className="heading">
                        Which country does this flag belongs to?
                    </h2>
                </>
            )}

            {!flag && (
                <h2 className="heading">
                    {capital} is the capital of which country
                </h2>
            )}

            {options.map((option) => (
                <SingleOption
                    value={option}
                    key={option}
                    onOptionClick={__onOptionClick}
                    className={getClassName(
                        country,
                        selectedOption,
                        option,
                        showAnswer
                    )}
                />
            ))}
        </Card>
    );
}

function getClassName(correct, selected, option, showAnswer) {
    if (!showAnswer) return "";

    if (option === selected) {
        if (option === correct) {
            return "success";
        } else return "danger";
    }
    if (option === correct) return "success";

    return "";
}
