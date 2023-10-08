import { Box, Flex, Spacer, Checkbox, Center } from "@chakra-ui/react"

export function TaskListing({ title, duration, emoji, id, popTop, firstID, setFirstID }) {
    return (
        <Flex alignItems={"center"} px={5} py={4}>
            <Box fontSize={"3em"}>{emoji}</Box>
            <Flex direction={"column"} ms="1.3em" rowGap={"0.3em"}>
                <Box fontWeight={"bold"} fontSize={"1.1em"}>{title}</Box>
                <Flex columnGap={5}>
                    <button onClick={() => { popTop(id); setFirstID(id) }}>{id == firstID ? "Top" : "Move to Top"}</button>
                    <div>Delete</div>
                </Flex>
            </Flex>
            <Box color={"gray"} fontSize={"0.9em"} ms={10}>{duration} mins</Box>
        </Flex>
    )
}
