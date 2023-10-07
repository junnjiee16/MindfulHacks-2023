import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    ChakraProvider
} from "@chakra-ui/react";
import { TaskListing } from "../components/TaskListing";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { getTodos } from "../apiCalls"

export function TaskPlannerPage() {
    const [todos, setTodos] = useState("");

    const handleGetTodos = async () => {
        const res = await getTodos();
        console.log(res.data)
        setTodos(res.data);
    }

    useEffect(() => {
        // 👇️ only runs once
        handleGetTodos();
    }, []);

    return (
        <Box p="10px">
            <Flex columnGap={"2em"}>
                <Box fontWeight={"bold"} fontSize={"1.6em"} mb="1.4em">Planner</Box>
                <CreateTaskModal />
            </Flex>

            {todos == "" ? "No tasks" :
                todos.map((item, idx) => {
                    return <TaskListing title={item.task} duration={item.time} emoji={item.emoji} id={idx} />
                })
            }
        </Box>
    )
}