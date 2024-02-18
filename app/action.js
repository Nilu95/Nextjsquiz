"use server";

export const rightAnswer = async (selectedAnswers, quizData) => {
  let answer = 0;
  console.log(selectedAnswers);

  for (let i = 0; i < selectedAnswers.length; i++) {
    const correctAnswer = quizData[i].correctAnswer;
    if (selectedAnswers[i] === correctAnswer) {
      answer++;
    }
  }
  return answer;
};
