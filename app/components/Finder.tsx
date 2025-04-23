"use client";
import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Icon,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import Resume from "./Resume";
import { FiFolder, FiFileText, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const initialFolders = [
  { id: 1, name: "About Me", type: "file" },
  { id: 2, name: "Projects", type: "folder" },
  { id: 3, name: "Skills", type: "file" },
  { id: 4, name: "Resume.pdf", type: "file" },
];

const projectFiles = [
  { id: 5, name: "DevSpace", type: "file" },
  { id: 6, name: "FitTrack", type: "file" },
];

interface FinderProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const Finder: React.FC<FinderProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const bg = useColorModeValue("whiteAlpha.800", "blackAlpha.600");
  const textColor = useColorModeValue("gray.900", "white");
  const cardBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");

  const [currentFolder, setCurrentFolder] = useState(initialFolders);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Root"]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);

  const openFolder = (item: { id: number; name: string; type: string }) => {
    setClickedId(item.id);
    setTimeout(() => {
      if (item.name === "Projects") {
        setCurrentFolder(projectFiles);
      } else {
        setSelectedFile(item.name);
      }
      setBreadcrumbs([...breadcrumbs, item.name]);
      setClickedId(null);
    }, 300);
  };

  const goBack = () => {
    if (breadcrumbs.length > 1) {
      setSelectedFile(null);
      setCurrentFolder(initialFolders);
      setBreadcrumbs(breadcrumbs.slice(0, -1));
    }
  };

  return (
    <MacWindow
      title="Finder"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box p={4} width="100%" height="100%" bg={bg}>
        <HStack mb={4} spacing={2} alignItems="center">
          {breadcrumbs.length > 1 && (
            <Button onClick={goBack} size="sm" leftIcon={<FiArrowLeft />}>
              Back
            </Button>
          )}
          <Text fontWeight="bold" color={textColor}>
            {breadcrumbs.join(" > ")}
          </Text>
        </HStack>
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="folderView"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Flex wrap="wrap" gap={6} align="center" justifyContent="center">
                {currentFolder.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 1 }}
                    animate={{ scale: clickedId === item.id ? 1.2 : 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      p={4}
                      bg={cardBg}
                      borderRadius="xl"
                      boxShadow="lg"
                      backdropFilter="blur(12px)"
                      transition="all 0.3s ease"
                      cursor="pointer"
                      onClick={() => openFolder(item)}
                      width="150px"
                      textAlign="center"
                    >
                      <Icon
                        as={item.type === "folder" ? FiFolder : FiFileText}
                        w={8}
                        h={8}
                        mb={2}
                        color={textColor}
                      />
                      <Text color={textColor}>{item.name}</Text>
                    </Flex>
                  </motion.div>
                ))}
              </Flex>
            </motion.div>
          ) : (
            <motion.div
              key="fileView"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <VStack spacing={4} alignItems="start">
                <Text color={textColor} fontSize="xl" fontWeight="bold">
                  {selectedFile}
                </Text>
                {selectedFile === "About Me" && (
                  <Text color={textColor} fontSize="md" lineHeight="tall">
                    Hi, I’m Michelle 👋. I’m a{" "}
                    <Text as="span" fontWeight="bold">
                      software engineer
                    </Text>{" "}
                    based in Toronto. I transitioned from a career in{" "}
                    <Text as="span" fontWeight="bold">
                      real estate
                    </Text>{" "}
                    to tech and never looked back. I thrive on creating
                    beautiful, functional applications that people enjoy using.
                    <br />
                    <br />I specialize in full-stack development with a
                    front-end focus and love building interactive user
                    experiences using React, TypeScript, and Framer Motion. When
                    I’m not coding, I’m exploring the outdoors, hitting the gym,
                    or experimenting with new tech.
                  </Text>
                )}
                {selectedFile === "Skills" && (
                  <VStack align="start" spacing={4}>
                    <Text color={textColor} fontSize="lg" fontWeight="bold">
                      Full-Stack Development
                    </Text>
                    <Text color={textColor}>My stack includes:</Text>
                    <VStack align="start" pl={4} spacing={2}>
                      <Text color={textColor}>
                        •{" "}
                        <Text as="span" fontWeight="bold">
                          Frontend:
                        </Text>{" "}
                        React, Next.js, TypeScript, SCSS, Chakra UI, Tailwind
                        CSS
                      </Text>
                      <Text color={textColor}>
                        •{" "}
                        <Text as="span" fontWeight="bold">
                          Backend:
                        </Text>{" "}
                        Node.js, Express.js, Firebase, REST APIs
                      </Text>
                      <Text color={textColor}>
                        •{" "}
                        <Text as="span" fontWeight="bold">
                          Mobile:
                        </Text>{" "}
                        React Native, Expo
                      </Text>
                      <Text color={textColor}>
                        •{" "}
                        <Text as="span" fontWeight="bold">
                          Tools:
                        </Text>{" "}
                        Git, GitHub, VSCode, Postman, Docker
                      </Text>
                    </VStack>

                    <Text
                      color={textColor}
                      fontSize="lg"
                      fontWeight="bold"
                      mt={6}
                    >
                      Currently Learning
                    </Text>
                    <VStack align="start" pl={4} spacing={2}>
                      <Text color={textColor}>
                        • Rust for systems programming
                      </Text>
                      <Text color={textColor}>
                        • Electron for cross-platform apps
                      </Text>
                      <Text color={textColor}>
                        • Python for automation and scripting
                      </Text>
                    </VStack>
                  </VStack>
                )}
                {selectedFile === "Resume.pdf" && <Resume />}
                {selectedFile === "DevSpace" && (
                  <Text color={textColor} fontSize="md">
                    DevSpace is a social media platform for developers built
                    with React Native. It lets users share code snippets,
                    collaborate, and post updates. It merges the functionality
                    of LinkedIn and GitHub in a mobile-first design.
                  </Text>
                )}
                {selectedFile === "FitTrack" && (
                  <Text color={textColor} fontSize="md">
                    FitTrack is a web app for logging workouts, tracking
                    progress, and visualizing stats using fitness APIs. Built
                    with React, TypeScript, and Framer Motion for UI
                    transitions.
                  </Text>
                )}
              </VStack>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </MacWindow>
  );
};

export default Finder;
