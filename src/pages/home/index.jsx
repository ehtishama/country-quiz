import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts/main.jsx";
import { QuestionCard } from "../../components/question_card/index.js";
import { ResultCard } from "../../components/result_card/index.js";
import { getRandom, shuffle } from "../../lib/helper.js";
import { useCountries } from "../../lib/useCountries.js";

export const Home = () => {
    // state
    const countries = useCountries();
    const [question, setQuestion] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setQuestion(generateQuestion(countries));
    }, [countries]);

    if (countries === null || question === null) return "Loading... Please wait";

    const { country, capital, possibleOptions, flag } = question;

    const onOptionClick = (option) => {
        // do something with option
        setShowAnswer(true);

        setTimeout(() => {
            if (option === country) {
                setScore(score + 1);
                setShowAnswer(false);
                setQuestion(generateQuestion(countries));
            } else {
                setGameOver(true);
            }
        }, 1000);
    };

    const restartGame = () => {
        setScore(0);
        setShowAnswer(false);
        setQuestion(generateQuestion(countries));
        setGameOver(false);
    };
    return (
        <Layout>
            {gameOver ? (
                <ResultCard score={score} onTryAgain={restartGame} />
            ) : (
                <QuestionCard
                    country={country}
                    capital={capital}
                    options={possibleOptions}
                    onOptionClick={onOptionClick}
                    showAnswer={showAnswer}
                    flag={flag} // could be null
                />
            )}
        </Layout>
    );
};

// helper functions that generates a random question
// from a given array of countries
const generateQuestion = (countries) => {
    if (countries === null) return null;

    // select a random country
    const someCountry = countries[getRandom(0, countries.length)];
    if (!someCountry || !someCountry.capital) generateQuestion(countries);

    const capital = someCountry.capital[0];

    // select somePossible options
    const possibleOptions = [someCountry.name.common];
    for (let i = 0; i < 3; i++) {
        const randomCountry = countries[getRandom(0, countries.length)];
        if (possibleOptions.includes(randomCountry.name.common)) {
            i--;
            continue;
        }
        possibleOptions.push(randomCountry.name.common);
    }

    // shuffle options
    shuffle(possibleOptions);

    return {
        country: someCountry.name.common,
        capital,
        possibleOptions,
        flag: getRandom(0, 2) ? someCountry.flags.svg : null,
    };
};
