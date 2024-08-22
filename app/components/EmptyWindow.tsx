"use client";

import { Box, Text, useColorModeValue, Flex, Spinner } from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface EmptyWindowProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const EmptyWindow: React.FC<EmptyWindowProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <MacWindow
      title="Coming Soon!"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box
        bg={bg}
        p="4"
        borderRadius="md"
        boxShadow="md"
        width="100%"
        height="100%"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Flex direction="column" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mb="4"
          />
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            This feature is under construction!
          </Text>
          <Text fontSize="md" mt="2" color={textColor}>
            Please check back later.
          </Text>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default EmptyWindow;
