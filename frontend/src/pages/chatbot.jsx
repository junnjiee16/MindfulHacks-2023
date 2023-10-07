import { Box, Text, Flex, Input, VStack, Button } from "@chakra-ui/react"
import { getLLMResponse } from "../apiCalls"
import { useState } from "react"


export function Chatbot() {
    const [todos, setTodos] = useState("");

    const handlePrompt = async () => {
        const res = await getLLMResponse(todos)
        console.log(res.data)
        setTodos(res.data);
    }

    const handleTextChange = (input) => setTodos(input.target.value);

    return (
        <VStack width={"80vw"} height={"80vh"} alignContent={"center"} justifyContent={"center"} direction={"column"}>
            <Flex>
                <Input onChange={(e) => {
                    handleTextChange(e)
                }} placeholder='Ask something...' width={"50vw"} mr={"10px"}/>
                <Button onClick={(todos) => {
                    handlePrompt(todos)
                }} bg={"tomato"}>Enter</Button>
            </Flex>

            <Text textAlign={"left"} width={"55vw"} align={"justify"}>
                <Box></Box>
            </Text>
        </VStack>
    )
}