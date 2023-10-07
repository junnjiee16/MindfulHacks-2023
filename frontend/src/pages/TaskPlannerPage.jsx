import { Box } from "@chakra-ui/react";
import { TaskListing } from "../components/TaskListing";

export function TaskPlannerPage() {
    return (
        <Box>
            <Box fontWeight={"bold"} fontSize={"1.6em"} mb="1.4em">Planner</Box>

            <TaskListing title="Hello Task List" duration="1h 30m" />
        </Box>
    )
}