import { useState } from "react"
import { Box, Flex, Spacer, Checkbox, Center, Button } from "@chakra-ui/react"
import { textToEmoji } from "../apiCalls"

export function TaskListing({ title, duration }) {
    return (
        <Flex p="10px">
            <Checkbox></Checkbox>
            <Flex direction={"column"} ms="1.3em" rowGap={"0.3em"}>
                <Box fontWeight={"bold"} fontSize={"1.1em"}>{title}</Box>
                <Box color={"gray"} fontSize={"0.9em"}>Duration: {duration}</Box>

            </Flex>

            <Button onClick={() => {
                console.log('Hi there!');
            }} ml = "200px">Start Focus</Button>
        </Flex>
    )
}
