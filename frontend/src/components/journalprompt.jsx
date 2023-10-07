import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function Journalprompt({ arrayOfQuestions, selectedDate }) {
  const toast = useToast();
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


  // const submitAnswers = async (answerArray) => {
  //   try {
  //     console.log("Submitting :", answerArray);
  //     console.log("Submitting answers:", answerArray);
  //     const response = await fetch("http://127.0.0.1:5000/journal", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ answerArray }),
  //     });

  //     if (response.ok) {
  //       console.log("Answers submitted successfully!");
  //     } else {
  //       console.error("Error submitting answers:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


  function submitAnswers(answerArray) {

    // setStr(idList.map(Number).toString());

    // console.log(str)
    const requestBody = {
      questions: arrayOfQuestions,
      answers: answerArray,
      date: selectedDate,
    };
    console.log(requestBody);
    axios
      .post(
        "http://127.0.0.1:5000/journal",
        requestBody
      )
      .then(
        (response) => {
          if (response.status === 200) {
            // setDisplay("");
            toast({
              title: `Thanks for journaling!`,
              description: "Please refresh the page / close this alert",
              status: "success",
              duration: 9000,
              isClosable: true,
              onCloseComplete: () => {
                window.location.reload();
              },
            });
          }
        },
        (error) => {
          toast({
            title: `Error`,
            description: `Sorry ${error.response.data.message} . Journal failed`,
            status: "error",
            duration: 100000,
            isClosable: true,
            onCloseComplete: () => {
              window.location.reload();
            },
          });
        }
      );
  }

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
