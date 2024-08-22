"use client";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface DocumentProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
  40% {transform: translateY(-20px);}
  60% {transform: translateY(-10px);}
`;

const Document: React.FC<DocumentProps> = ({
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
      title="Document"
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
          <Text
            fontSize="6xl"
            mb="4"
            color={textColor}
            animation={`${bounceAnimation} 2s infinite`}
          >
            📄
          </Text>
          <Text fontSize="30" fontWeight="bold" color={textColor}>
            Your documents are on the way!
          </Text>
          <Text fontSize="20" mt="2" color={textColor}>
            Soon you&apos;ll be reading, writing, and creating... Stay tuned! 📝
          </Text>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default Document;
