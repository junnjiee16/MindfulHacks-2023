import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    ChakraProvider,
    Center,
    VStack
} from "@chakra-ui/react";
import { TaskListing } from "../components/TaskListing";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { getTodos, popToTop } from "../apiCalls"
import { FocusTimer } from "../components/FocusTimer";

export function TaskPlannerPage() {
    const [todos, setTodos] = useState("");
    const [firstID, setFirstID] = useState(1);

    const handleGetTodos = async () => {


        const res = await getTodos();
        console.log(res.data);

        setTodos(res.data);

    }

    const handlePopTop = async (id) => {
        const res = await popToTop(id);
    }

    useEffect(() => {
        // 👇️ only runs once
        handleGetTodos();
    }, [firstID]);

    return (
            <Box marginStart={"20em"}>
                {todos == "" ? "Loading" : <FocusTimer data={todos} id={firstID}></FocusTimer>}
                <Flex columnGap={"2em"}>
                    <Box fontWeight={"bold"} fontSize={"1.6em"} mb="1.4em">Planner</Box>
                    <CreateTaskModal />
                </Flex>

                {todos == "" ? "No tasks" :
                    todos.map((item, idx) => {
                        // if (idx == 0) {
                        //     setFirstID(item.id);
                        // }
                        return <TaskListing title={item.task} duration={item.time} emoji={item.emoji} id={item.id} popTop={handlePopTop} firstID={firstID} setFirstID={setFirstID} />
                    })
                }
            </Box>
    )
}
