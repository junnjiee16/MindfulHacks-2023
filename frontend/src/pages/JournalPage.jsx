import { Box, Button, Flex, Text } from '@chakra-ui/react';

export function JournalPage() {
    return (
        <Box
            width = "800px"
            height = "800px">

            {/* Header with the title */}
            <Text fontSize="xl" fontWeight="bold" mb="4">
                Journal
            </Text>
            {/* Grey box body */}
            <Box bg="gray.100" p="4" borderRadius="md">

                <Flex justifyContent="space-between" alignItems="center">
                    <Text>DD/MM/YYYY</Text>
                    <Button colorScheme="teal" size="sm">
                        Filter
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}