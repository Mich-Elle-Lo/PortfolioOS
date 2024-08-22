"use client";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface FinderProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const rotateAnimation = keyframes`
  0% {transform: rotate(0deg);} 
  100% {transform: rotate(360deg);}
`;

const Finder: React.FC<FinderProps> = ({
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
      title="Finder"
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
            animation={`${rotateAnimation} 3s infinite linear`}
          >
            🔄
          </Text>
          <Text fontSize="30" fontWeight="bold" color={textColor}>
            Finder is under construction!
          </Text>
          <Text fontSize="20" mt="2" color={textColor}>
            Stay tuned for updates! 🚀
          </Text>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default Finder;
