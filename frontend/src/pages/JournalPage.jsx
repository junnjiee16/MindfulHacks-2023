import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Input,
  Heading,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

import { MdCheckCircle, MdSettings } from "react-icons/md";

import { Journalprompt } from "../components/journalprompt";

export function JournalPage() {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    async function fetchDataList() {
      try {
        const requestUrl = "http://127.0.0.1:5000/journal";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setDataList(responseJSON);
      } catch {
        console.log("failed to fetch data list");
      }
    }
    fetchDataList();
  }, []);

  const { isOpen, onToggle } = useDisclosure();

  const [startButtonVisible, setStartButtonVisible] = useState(true);
  const [journalQuestionVisible, setJournalQuestionVisible] = useState(false);
  const [selectedDayJournal, setSelectedDayJournal] = useState("");
  const [selectedDate, setSelectedDate] = useState(Date.now());


  useEffect(() => {
    console.log(selectedDate);
    dataList.filter((data) => {
      if (data.date === selectedDate.split("T")[0]) {
        setSelectedDayJournal({
          answers: data.answers,
          date: data.date,
          id: data._id,
          questions: data.questions,
        });
        setStartButtonVisible(!startButtonVisible);
        setJournalQuestionVisible(false)
      } else if (
        (data.date !== selectedDate.split("T")[0]) &
        (startButtonVisible === false)
      ) {
        setStartButtonVisible(!startButtonVisible);
      }
    });

    
  }, [selectedDate]);


  

  const handleStartButtonClick = () => {
    onToggle();
    setJournalQuestionVisible(true);
  };

  return (
    <Box width="100em" height="10em">
      {/* Header with the title */}
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Journal
      </Text>
      {/* Grey box body */}
      <Box bg="gray.100" p="4" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Input
          defaultValue={Date.now()}
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Flex>
      </Box>

      {/* Conditionally render Start button based on startButtonVisible state */}
      {startButtonVisible && (
        <Box
          margin="auto"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Heading mb="4">
            You haven't done any of the prompts today, start with a new prompt!
          </Heading>
          <Button onClick={handleStartButtonClick} colorScheme="teal">
            Start
          </Button>
        </Box>
      )}

      {/* Conditionally render Start button based on startButtonVisible state */}
      {!startButtonVisible && (
        <Box
          margin="auto"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Heading mb="4">
            You have finished journaling! This was your response
          </Heading>

          <h2>Date: {selectedDayJournal.date}</h2>

          <div>
            <h3>Journal Entries:</h3>
            <List spacing={3}>
              {selectedDayJournal.questions.map((question, index) => (
                <ListItem key={index}>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <strong>Question:</strong> {question} <br />
                  <strong>Answer:</strong> {selectedDayJournal.answers[index]}
                </ListItem>
              ))}
            </List>
          </div>

          {/* Map over the selectedDayJournal object and render each response */}
        </Box>
      )}

      {/* Conditionally render JournalPrompt based on isOpen state */}
      {journalQuestionVisible && (
        <Journalprompt
          arrayOfQuestions={[
            "What are my biggest strengths and weaknesses??",
            "How did I manage my time effectively today?",
            "What are my biggest triggers for distraction?",
          ]}
          selectedDate={selectedDate} // Pass the selectedDate as a prop
        />
      )}
    </Box>
  );
}
