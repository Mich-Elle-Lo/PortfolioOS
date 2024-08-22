"use client";
import {
  Box,
  Text,
  Button,
  Image,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface IntroWindowProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const IntroWindow: React.FC<IntroWindowProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.400, blue.500)",
    "linear(to-r, teal.600, blue.800)"
  );
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <MacWindow
      title="Welcome to My Portfolio"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box
        bg={bgGradient}
        borderRadius="md"
        p="6"
        color={textColor}
        textAlign="center"
        height="100%"
      >
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontSize="75" fontWeight="bold">
            🙋🏻‍♀️
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb="2">
            I&apos;m Michelle. Welcome to my portfolio!
          </Text>
          <Text fontSize="lg" mb="4">
            Welcome to my portfolio, a macOS-inspired playground where you can
            explore my work, interact with the apps, and maybe even get inspired
            along the way.
          </Text>
          <Text fontSize="md" mb="6">
            Feel free to dive in, play around with the different apps in the
            dock, and get a feel for the kind of projects I love to build.
            Whether you&apos;re here to check out my latest work, drop me a
            message, or just explore, I hope you enjoy the experience.
          </Text>
          <Button onClick={onClose} size="lg" colorScheme="teal" boxShadow="md">
            Let&apos;s Explore!
          </Button>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default IntroWindow;
