import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import EmailForm from "./EmailForm";

type MailWindowProps = {
  onClose: () => void;
  zIndex: number;
  onClick: () => void;
  initialX: number;
  initialY: number;
};

const MailWindow = ({
  onClose,
  zIndex,
  onClick,
  initialX,
  initialY,
}: MailWindowProps) => {
  const bg = useColorModeValue("gray.900", "gray.800");
  const borderColor = useColorModeValue("gray.600", "gray.700");
  const textColor = useColorModeValue("white", "gray.200");
  const inputBg = useColorModeValue("gray.800", "gray.600");
  const formBg = useColorModeValue("gray.700", "gray.900");

  return (
    <MacWindow
      title="Mail"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box height="100%" width="100%" overflow="auto" p="1rem">
        <Input
          placeholder="To: Michelle Lo"
          bg={inputBg}
          color={textColor}
          isDisabled
        />
      </Box>
      <Box borderBottom={`1px solid ${borderColor}`} p="1rem" mb="4" pb="2">
        <EmailForm />
      </Box>
    </MacWindow>
  );
};

export default MailWindow;
