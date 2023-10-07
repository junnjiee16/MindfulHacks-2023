import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons"
import { TaskListing } from "../components/TaskListing";
import { CreateTaskModal } from "../components/CreateTaskModal";

export function TaskPlannerPage() {
    return (
        <Box>
            <Flex columnGap={"2em"}>
                <Box fontWeight={"bold"} fontSize={"1.6em"} mb="1.4em">Planner</Box>
                {/* <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Create Task
                    </MenuButton>
                    <MenuList p="2em">
                        <Box></Box>
                        <FormControl>
                            <FormLabel>Task Title</FormLabel>
                            <Input />
                        </FormControl>
                        
                    </MenuList>
                </Menu> */}
                <CreateTaskModal />

            </Flex>

            <TaskListing title="Hello Task List" duration="1h 30m" />
        </Box>
    )
}