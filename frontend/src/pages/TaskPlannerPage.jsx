import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    ChakraProvider
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons"
import { TaskListing } from "../components/TaskListing";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { useState } from "react"

export function TaskPlannerPage() {
    const [focusedCard, setFocusedCard] = useState(0);

    const cards = [
        { id: 1, title: 'Hello Task List 1', duration: '1h 30m', selected: false, display: true },
        { id: 2, title: 'Hello Task List 2', duration: '1h 30m', selected: false, display: true },
        { id: 3, title: 'Hello Task List 3', duration: '1h 30m', selected: false, display: true },
        { id: 4, title: 'Hello Task List 4', duration: '1h 30m', selected: false, display: true },
    ];

    const handleCardClick = (cardId) => {
        setFocusedCard(cardId);
    };
    return (
        <Box p="10px">
            <Flex columnGap={"2em"}>
                <Box fontWeight={"bold"} fontSize={"1.6em"} mb="1.4em">Planner</Box>
                <CreateTaskModal />

            </Flex>
            {/* <ChakraProvider> */}
                <TaskListing title="Hello Task List 1" duration="1h 30m" />
                <TaskListing title="Hello Task List 2" duration="1h 30m" />
                <TaskListing title="Hello Task List 3" duration="1h 30m" />
                <TaskListing title="Hello Task List 4" duration="1h 30m" />
             
            {/* </ChakraProvider> */}
          
        </Box>
    )
}