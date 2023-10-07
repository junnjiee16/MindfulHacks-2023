import { Box, Flex, Center, AbsoluteCenter } from "@chakra-ui/react"

export function HomePage() {
    return (
        <>
            <Flex direction={"column"} height={"100vh"} width={"100vw"} justify={"center"}>
                OwO
                <Box mx={"auto"} fontSize={"4xl"} mb={"40px"} bg={"tomato"} width={"600px"} height={"100px"} textAlign={"center"} >
                    Chatbot
                </Box>
                <Box mx={"auto"} fontSize={"4xl"} mb={"40px"} bg={"tomato"} width={"600px"} height={"100px"} textAlign={"center"} >
                    To-Do List
                </Box>
                <Box mx={"auto"} fontSize={"4xl"} mb={"40px"} bg={"tomato"} width={"600px"} height={"100px"} textAlign={"center"} >
                    Journal
                </Box>
            </Flex>
            
        </>
    )
}