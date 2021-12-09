import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts/main.jsx";
import { QuestionCard } from "../../components/question_card/index.js";
import { ResultCard } from "../../components/result_card/index.js";
import { getRandom, shuffle } from "../../lib/helper.js";
import { useCountries } from "../../lib/useCountries.js";

export const Home = () => {
    // state
    const countries = useCountries();
    const [question, setQuestion] = useState({
        someCountry: null,
        itsCapital: null,
        possibleOptions: null,
        correct: null,
    });

    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setQuestion(generateQuestion(countries));
    }, [countries]);

    if (countries === null || question.someCountry === null) return "";

    const { someCountry, itsCapital, possibleOptions } = question;

    const onOptionClick = (option) => {
        // do something with option
        setShowAnswer(true);

        setTimeout(() => {
            if (option === someCountry.name.common) {
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
                    country={someCountry}
                    capital={itsCapital}
                    options={possibleOptions}
                    onOptionClick={onOptionClick}
                    showAnswer={showAnswer}
                    flag={getRandom(0, 2) ? someCountry.flags.svg : null}
                />
            )}
        </Layout>
    );
};

const generateQuestion = (countries) => {
    if (countries === null)
        return {
            someCountry: null,
            itsCapital: null,
            possibleOptions: null,
        };
    // select a random country
    const someCountry = countries[getRandom(0, countries.length)];
    if (!someCountry || !someCountry.capital) generateQuestion(countries);
    const itsCapital = someCountry.capital[0];

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
        someCountry,
        itsCapital,
        possibleOptions,
    };
};
