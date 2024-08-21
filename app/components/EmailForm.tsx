"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useEmailForm } from "../hooks/useEmailForm";

const EmailForm = () => {
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

  const formBg = useColorModeValue("gray.100", "gray.800");
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box
      maxW="100%"
      height="100%"
      p="2%"
      borderRadius="md"
      bg={formBg}
      color={textColor}
      display="flex"
      flexDirection="column"
    >
      <Text fontSize="lg" mb="2" color={textColor}>
        To: Michelle Lo
      </Text>
      <FormControl id="cc" mb="4">
        <Input
          type="email"
          placeholder="Cc"
          bg={inputBg}
          color={textColor}
          isDisabled
        />
      </FormControl>
      <FormControl id="subject" mb="4">
        <Input
          type="text"
          value={subject}
          onChange={handleSubjectChange}
          bg={inputBg}
          color={textColor}
          placeholder="Subject"
        />
      </FormControl>
      <Text mb="2" color="gray.500">
        From:
      </Text>
      <FormControl id="from-name" mb="4">
        <Input
          type="text"
          value={senderName}
          onChange={handleNameChange}
          bg={inputBg}
          color={textColor}
          placeholder="Your name"
        />
      </FormControl>

      <FormControl id="from" mb="4">
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          bg={inputBg}
          color={textColor}
          placeholder="Your email"
        />
      </FormControl>
      <FormControl id="message" mb="4" flexGrow={1}>
        <Textarea
          value={message}
          onChange={handleMessageChange}
          bg={inputBg}
          color={textColor}
          placeholder="Type your message here..."
          height="200px"
        />
      </FormControl>
      <Button
        type="submit"
        colorScheme="blue"
        isLoading={loading}
        isDisabled={!email || !message || !senderName || !subject}
        onClick={handleSubmit}
        height="48px"
        minHeight="48px"
      >
        Send
      </Button>
    </Box>
  );
};

export default EmailForm;
