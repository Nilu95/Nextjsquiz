"use client";
import { checkAnswer } from "./action";
import React, { useEffect, useState } from "react";
import { rightAnswer } from "./action";

// https://www.educative.io/answers/how-to-shuffle-an-array-in-javascript
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ClientComponent = ({ quizData }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (quizData) {
      const combinedAnswers = quizData.map((question) => [
        ...question.incorrectAnswers,
        question.correctAnswer,
      ]);
      const shuffled = combinedAnswers.map((answers) => shuffleArray(answers));
      setShuffledAnswers(shuffled);
    }
  }, [quizData]);

  const handleAnswerSelection = (index, answer) => {
    setSelectedAnswers((prevState) => {
      const updatedSelectedAnswers = [...prevState];
      updatedSelectedAnswers[index] = answer;
      return updatedSelectedAnswers;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedAnswers);
    const resulting = await rightAnswer(selectedAnswers, quizData);
    setResult(resulting);
  };

  return (
    <>
    <div className="heading">
    <h1>Niloy's Next.js Quizz app</h1><br/>
    </div>
      <form onSubmit={handleSubmit}>
        {shuffledAnswers.map((answers, index) => {
          const question = quizData[index];
          return (
            <div key={index}>
              <h1>
                {index + 1}.{question.question.text}
              </h1>
              <ul>
                {answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    <input
                      type="radio"
                      name={`question_${index}`}
                      value={answer}
                      onChange={() => handleAnswerSelection(index, answer)}
                      checked={selectedAnswers[index] === answer}
                    />
                    <label htmlFor={`question_${index}_${answerIndex}`}>
                      {answer}
                    </label>
                  </li>
                ))}
              </ul>
              <br />
            </div>
          );
        })}
        <div className="button-container">
          <button type="submit">Check Answers</button>
        </div>
      </form>
      <h1>Your score is {result}/10</h1>
    </>
  );
};

export default ClientComponent;
