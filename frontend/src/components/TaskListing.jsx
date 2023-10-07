import { Box, Flex, Spacer, Checkbox, Center } from "@chakra-ui/react"

export function TaskListing({title, duration}) {
    return (
        <Flex>
            <Checkbox></Checkbox>
            <Flex direction={"column"} ms="1.3em" rowGap={"0.3em"}>
                <Box fontWeight={"bold"} fontSize={"1.1em"}>{title}</Box>
                <Box color={"gray"} fontSize={"0.9em"}>Duration: {duration}</Box>
            </Flex>
        </Flex>
    )
}
