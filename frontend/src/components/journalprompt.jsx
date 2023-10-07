import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Textarea,
  Text,
} from "@chakra-ui/react";

export function Journalprompt({ arrayOfQuestions }) {
  const [answer, setAnswer] = useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < arrayOfQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerArray((prevAnswerArray) => [...prevAnswerArray, answer]);
      setAnswer(""); // Clear the answer for the next question
    } else {
      const updatedAnswerArray = [...answerArray, answer];
      // Handle submitting the answers, e.g., by sending them to an API
      submitAnswers(updatedAnswerArray); // Call the function to submit answers
    }
  };

  useEffect(() => { 
    // This effect will run after each render, including the first render
  }, [answerArray]); // Re-run the effect whenever answerArray changes


  const submitAnswers = async (answerArray) => {
    try {
      console.log("Submitting answers:", answerArray);
      console.log("Submitting answers:", answerArray);
      const response = await fetch("https://example.com/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answerArray }),
      });

      if (response.ok) {
        console.log("Answers submitted successfully!");
      } else {
        console.error("Error submitting answers:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Today
      </Heading>
      <Box p="40px" color="white" mt="4" bg="gray.500" rounded="md" shadow="md">
        <Text >{arrayOfQuestions[currentQuestionIndex]}</Text>
        <Textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Write your answer here..."
          h="200px"
          size="lg"
          mt="10"
        />
        <Button
          onClick={handleNextQuestion}
          mt="4"
          colorScheme="teal"
        >
          {currentQuestionIndex < arrayOfQuestions.length - 1
            ? "Next"
            : "Submit"}
        </Button>
      </Box>
    </>
  );
}
