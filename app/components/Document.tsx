"use client";
import { useState, useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Button,
  Textarea,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";

interface DocumentProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const Document: React.FC<DocumentProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState<string>("");

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
        <Box
          ref={editorRef}
          width="100%"
          height="300px"
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
          mb="4"
        ></Box>
        <Button colorScheme="blue" mb="4">
          Run Code
        </Button>
        <Textarea
          value={output}
          readOnly
          placeholder="Output will appear here..."
          bg={useColorModeValue("gray.200", "gray.600")}
          color={textColor}
          width="100%"
          height="150px"
        />
      </Box>
    </MacWindow>
  );
};

export default Document;
