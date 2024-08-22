"use client";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface FigmaProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const pulseAnimation = keyframes`
  0% {transform: scale(1);}
  50% {transform: scale(1.1);}
  100% {transform: scale(1);}
`;

const Figma: React.FC<FigmaProps> = ({
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
      title="Figma"
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
            animation={`${pulseAnimation} 1.5s infinite`}
          >
            🎨
          </Text>
          <Text fontSize="30" fontWeight="bold" color={textColor}>
            "Design inspiration is on the way!"
          </Text>
          <Text fontSize="20" mt="2" color={textColor}>
            "Figma is warming up, stay tuned to get creative! 🌟"
          </Text>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default Figma;
