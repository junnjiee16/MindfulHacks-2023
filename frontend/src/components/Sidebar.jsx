import { Link } from 'react-router-dom'
import { Flex } from "@chakra-ui/react"

export function Sidebar() {
    return (
        <Flex direction={"column"} rowGap={"1.5em"} pt="3em" px="2em" fontSize="1.1em">

            <Link to={"/planner"}>
                Planner
            </Link>
            <Link to={"/journal"}>
                Journal
            </Link>
            <div>ADHD Bot</div>
            <div>Resources</div>
        </Flex>
    )
}