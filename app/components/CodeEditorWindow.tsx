"use client";
import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useColorModeValue, Flex, Button, Textarea } from "@chakra-ui/react";
import MacWindow from "./MacWindow";

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
  const [code, setCode] = useState<string>("// Write your code here");
  const editorTheme = useColorModeValue("vs-light", "vs-dark");
  const [output, setOutput] = useState<string>("");

  const runCode = (code: string) => {
    let capturedOutput = "";
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      capturedOutput += args.join(" ") + "\n";
    };

    try {
      eval(code);
      setOutput(capturedOutput || "No Output");
    } catch (error: string | any) {
      setOutput(`Error: ${error.message}`);
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
      <Flex
        direction="column"
        bg={bg}
        borderRadius="md"
        boxShadow="md"
        width="100%"
        height="100%"
      >
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// Write your JavaScript code here"
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

        <Button
          colorScheme="blue"
          pt="1"
          pb="1"
          borderRadius={0}
          onClick={() => runCode(code)}
        >
          Run Code
        </Button>

        <Textarea
          value={output}
          readOnly
          placeholder="Output will appear here..."
          bg={useColorModeValue("gray.200", "gray.600")}
          color={textColor}
          width="100%"
          height="100%"
          borderRadius={0}
          resize={"none"}
        />
      </Flex>
    </MacWindow>
  );
};

export default CodeEditor;
