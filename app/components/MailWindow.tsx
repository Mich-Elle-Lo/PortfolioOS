import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Textarea,
  Text,
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
      <Box height="100%" width="100%" overflow="auto">
        <Text
          fontSize="md"
          fontWeight="bold"
          mb="2"
          mt="2"
          textAlign="center"
          color={textColor}
        >
          Got Feedback? Or Need a Developer? 👩🏻‍💻
        </Text>
        <Flex
          align="center"
          justifyContent="center"
          mt="2"
          mb="2"
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor={borderColor}
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
            mt="2"
            colorScheme="blue"
            aria-label="Send"
            onClick={handleSubmit}
            isLoading={loading}
            isDisabled={!email || !message || !senderName || !subject}
          />
        </Flex>

        <Input
          placeholder="To: Michelle Lo"
          color={textColor}
          isDisabled
          mb="1"
          _placeholder={{ color: placeholderColor }}
        />
        <Input
          placeholder="Your name"
          border="none"
          bg={formBg}
          mb="1"
          color={textColor}
          value={senderName}
          onChange={handleNameChange}
          _focus={{ boxShadow: "none" }}
          _placeholder={{ color: placeholderColor }}
        />
        <Input
          placeholder="Your email"
          border="none"
          bg={formBg}
          mb="1"
          color={textColor}
          value={email}
          onChange={handleEmailChange}
          _focus={{ boxShadow: "none" }}
          _placeholder={{ color: placeholderColor }}
        />
        <Input
          placeholder="Subject:"
          border="none"
          bg={formBg}
          color={textColor}
          value={subject}
          onChange={handleSubjectChange}
          _focus={{ boxShadow: "none" }}
          _placeholder={{ color: placeholderColor }}
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
            value={message}
            onChange={handleMessageChange}
            _placeholder={{ color: placeholderColor }}
          />
        </Box>
      </Box>
    </MacWindow>
  );
};

export default MailWindow;
