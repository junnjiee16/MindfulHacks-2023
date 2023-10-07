import { useState } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { textToEmoji } from '../apiCalls'

export function CreateTaskModal() {

    const [title, setTitle] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [taskName, setTaskName] = useState("");
    // in minutes
    const [taskTimeLimit, setTaskTimeLimit] = useState(0);

    const handleTextChange = (input) => setTitle(input.target.value);

    const predictEmoji = async () => {
        console.log('Calling predictEmoji');
        const res = await textToEmoji(title);
        console.log(res);
    }

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your Task!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name of Task</FormLabel>
                            <Input onChange={e => { handleTextChange(e); predictEmoji() }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Minutes</FormLabel>
                            <NumberInput step={5} defaultValue={15} min={10} max={600}
                                onChange={() => {
                                    console.log(`Hello?`);

                                }}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Time Limit</FormLabel>
                            <Input />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' onClick={() => {
                            console.log(`Task Created!!`)
                            setTaskName("");
                            setTaskTimeLimit(0);
                        }}>Create Task</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}