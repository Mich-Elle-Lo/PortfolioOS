"use client";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  useColorModeValue,
  Flex,
  Button,
  Textarea,
  Box,
  useToast,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import { motion } from "framer-motion";

interface CodeEditorProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const outputBg = useColorModeValue("gray.200", "gray.800");

  const [code, setCode] = useState<string>("// Write your code here");
  const editorTheme = useColorModeValue("vs-light", "vs-dark");
  const [output, setOutput] = useState<string>("");
  const toast = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        runCode(code);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code]);

  const runCode = (code: string) => {
    let capturedOutput = "";
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      capturedOutput += args.join(" ") + "\n";
    };

    try {
      // ⚠️ This is not safe for production — sandbox if needed
      eval(code);
      setOutput(capturedOutput || "No output.");
      toast({
        title: "Code executed.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (error: string | any) {
      setOutput(`❌ Error: ${error.message}`);
      toast({
        title: "Execution error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      console.log = originalLog;
    }
  };

  return (
    <MacWindow
      title="Code Editor"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Flex direction="column" bg={bg} width="100%" height="100%">
        <Editor
          height="50%"
          defaultLanguage="javascript"
          defaultValue={code}
          theme={editorTheme}
          onChange={(value) => setCode(value || "")}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
            autoIndent: "full",
            wordWrap: "on",
            fontSize: 14,
            minimap: { enabled: false },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            tabCompletion: "on",
          }}
        />

        <motion.div
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            colorScheme="blue"
            pt="1"
            pb="1"
            borderRadius={0}
            onClick={() => runCode(code)}
            w="100%"
            height="40px"
          >
            ▶️ Run Code (Ctrl+Enter)
          </Button>
        </motion.div>

        <Textarea
          value={output}
          readOnly
          placeholder="Output will appear here..."
          bg={outputBg}
          color={textColor}
          fontFamily="monospace"
          fontSize="sm"
          p={4}
          borderRadius={0}
          resize="none"
          flex={2}
        />
      </Flex>
    </MacWindow>
  );
};

export default CodeEditor;
