"use client";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  keyframes,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface SlackProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
  40% {transform: translateY(-30px);} 
  60% {transform: translateY(-15px);}
`;

const Slack: React.FC<SlackProps> = ({
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
      title="Slack"
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
            💬
          </Text>
          <Text fontSize="30" fontWeight="bold" color={textColor}>
            Whoops, seems like there&apos;s no chatter here... yet!
          </Text>
          <Text fontSize="20" mt="2" color={textColor}>
            Don&apos;t worry, the conversation will pick up soon! 🎉
          </Text>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default Slack;
