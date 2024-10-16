import { useState } from "react";
import { resultInitialState } from "./constants";

export const Quiz = ({ questions }) => {
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);

    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (selectedAnswer, index) => {
        setAnswerIdx(index);
        if (correctAnswer === selectedAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    };

    const onClickNext = () => {
        setAnswerIdx(null);
        setResult((prev) => 
            answer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswer: prev.correctAnswer + 1,
                }
                : {
                    ...prev,
                    wrongAnswer: prev.wrongAnswer + 1,
                }
        );
        
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            alert('Quiz Finished!');
            setCurrentQuestion(0);
            setResult(resultInitialState);
        }
        setAnswer(null);
    };

    return (
        <div className="quiz-container">
            <>
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-questions">/{questions.length}</span>
                <h2>{question}</h2>
                <ul>
                    {choices.map((choice, index) => (
                        <li
                            onClick={() => onAnswerClick(choice, index)}
                            key={choice}
                            className={answerIdx === index ? 'selected-answer' : null}
                        >
                            {choice}
                        </li>
                    ))}
                </ul>
                <div className="footer">
                    <button onClick={onClickNext} disabled={answerIdx === null}>
                        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                    </button>
                </div>
            </>
        </div>
    );
};

export default Quiz;
