import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  Textarea,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import { useEmailForm } from "../hooks/useEmailForm";
import {
  AiOutlineMail,
  AiOutlinePaperClip,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineSend,
} from "react-icons/ai";

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
  const {
    senderName,
    email,
    subject,
    message,
    loading,
    handleNameChange,
    handleEmailChange,
    handleSubjectChange,
    handleMessageChange,
    handleSubmit,
  } = useEmailForm();
  const toast = useToast();

  const bg = useColorModeValue("gray.900", "gray.800");
  const borderColor = useColorModeValue("gray.600", "gray.700");
  const textColor = useColorModeValue("white", "gray.200");
  const inputBg = useColorModeValue("gray.800", "gray.600");
  const formBg = useColorModeValue("gray.700", "gray.900");
  const iconColor = useColorModeValue("gray.400", "gray.500");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

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
        <Flex
          align="center"
          mt="4"
          mb="4"
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor={borderColor}
          pt="2"
        >
          <HStack spacing="4">
            <IconButton
              icon={<AiOutlineBold />}
              size="sm"
              color={iconColor}
              aria-label="Bold"
              variant="ghost"
            />
            <IconButton
              icon={<AiOutlineItalic />}
              size="sm"
              color={iconColor}
              aria-label="Italic"
              variant="ghost"
            />
            <IconButton
              icon={<AiOutlineUnderline />}
              size="sm"
              color={iconColor}
              aria-label="Underline"
              variant="ghost"
            />
            <IconButton
              icon={<AiOutlinePaperClip />}
              size="sm"
              color={iconColor}
              aria-label="Attach"
              variant="ghost"
            />
          </HStack>
          <Box flex="1" />

          <IconButton
            icon={<AiOutlineSend />}
            size="sm"
            mb="2"
            colorScheme="blue"
            aria-label="Send"
          />
        </Flex>

        <Input
          placeholder="To: Michelle Lo"
          bg={inputBg}
          color={textColor}
          isDisabled
        />

        <Input
          placeholder="Cc:"
          border="none"
          bg={formBg}
          mb="2"
          color={textColor}
          _focus={{ boxShadow: "none" }}
          isDisabled
        />
        <Input
          placeholder="Subject:"
          border="none"
          bg={formBg}
          color={textColor}
          _focus={{ boxShadow: "none" }}
        />

        <Box borderBottom={`1px solid ${borderColor}`} p="1rem" mb="4" pb="2">
          <Textarea
            placeholder="Type your message here..."
            border="none"
            bg="transparent"
            color={textColor}
            resize="none"
            height="250px"
            _focus={{ boxShadow: "none" }}
          />
        </Box>
      </Box>
    </MacWindow>
  );
};

export default MailWindow;
