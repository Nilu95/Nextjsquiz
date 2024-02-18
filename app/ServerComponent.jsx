import React from "react";
import ClientComponent from "./ClientComponent";


const fetchData = async () => {
  const response = await fetch("https://the-trivia-api.com/v2/questions");
  const todo = await response.json();

  console.log(todo);
  return todo;
};

const ServerComponent = async () => {
  const quizData = await fetchData();

  return (
    <>
      <ClientComponent quizData={quizData} />
    </>
  );
};

export default ServerComponent;
