import React, { useState } from "react";
import { Box, Button, Flex, Text, useDisclosure,Input } from "@chakra-ui/react";
import { Journalprompt } from "../components/journalprompt";

export function JournalPage() {
  const { isOpen, onToggle } = useDisclosure();

  const [startButtonVisible, setStartButtonVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  const handleStartButtonClick = () => {
    onToggle();
    setStartButtonVisible(false);
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
        <Button onClick={handleStartButtonClick} mt="4" colorScheme="teal">
          Start
        </Button>
      )}

      {/* Conditionally render JournalPrompt based on isOpen state */}
      {isOpen && (
        <Journalprompt
          arrayOfQuestions={[
            "What have you done today that you regretted?",
            "What's 9+10?",
            "INC suk?",
          ]}
          selectedDate={selectedDate} // Pass the selectedDate as a prop
        />
      )}
    </Box>
  );
}
