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
import { FiFolder, FiFileText, FiArrowLeft } from "react-icons/fi";
import MacWindow from "./MacWindow";
import Resume from "./Resume";

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
  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");

  const [currentFolder, setCurrentFolder] = useState(initialFolders);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Root"]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const openFolder = (folderName: string) => {
    if (folderName === "Projects") {
      setCurrentFolder(projectFiles);
    } else {
      setSelectedFile(folderName);
    }
    setBreadcrumbs([...breadcrumbs, folderName]);
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
      <Box p={4} width="100%" height="100%" bg={bg} borderRadius="md">
        <HStack mb={4}>
          {breadcrumbs.length > 1 && (
            <Button onClick={goBack} size="sm" leftIcon={<FiArrowLeft />}>
              Back
            </Button>
          )}
          <Text fontWeight="bold" color={textColor}>
            Location:
          </Text>
          {breadcrumbs.map((crumb, index) => (
            <Text key={index} color={textColor}>
              {crumb}
              {index < breadcrumbs.length - 1 && " > "}
            </Text>
          ))}
        </HStack>

        {!selectedFile ? (
          <Flex wrap="wrap" gap={6}>
            {currentFolder.map((item) => (
              <Box
                key={item.id}
                p={4}
                bg={bg}
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
                cursor="pointer"
                onClick={() => openFolder(item.name)}
                width="150px"
              >
                <Icon
                  as={item.type === "folder" ? FiFolder : FiFileText}
                  w={8}
                  h={8}
                  mb={2}
                  color={textColor}
                />
                <Text color={textColor}>{item.name}</Text>
              </Box>
            ))}
          </Flex>
        ) : (
          <VStack spacing={4} alignItems="start">
            <Text color={textColor} fontSize="xl" fontWeight="bold">
              {selectedFile === "About Me" && "About Me"}
              {selectedFile === "Skills" && "Skills"}
              {selectedFile === "Resume.pdf" && "Resume"}
            </Text>
            {selectedFile === "About Me" && (
              <>
                <Text color={textColor} fontSize="lg" lineHeight="tall">
                  Hi, I&apos;m Michelle 👋. I&apos;m a{" "}
                  <Text as="span" fontWeight="bold">
                    software engineer
                  </Text>{" "}
                  based in Toronto 🏙️. After spending several years in{" "}
                  <Text as="span" fontWeight="bold">
                    real estate
                  </Text>{" "}
                  🏡, I decided to follow my true passion for{" "}
                  <Text as="span" fontWeight="bold">
                    technology
                  </Text>{" "}
                  💻. It was one of the best decisions I&apos;ve made, and I
                  couldn&apos;t be happier with the path I&apos;m on now.
                </Text>
                <Text color={textColor} fontSize="lg" lineHeight="tall" mt={4}>
                  I love solving problems and taking on new challenges. Whether
                  it&apos;s creating clean, user-friendly applications or
                  working on full-stack solutions, I enjoy diving into the
                  details. My experience includes working with{" "}
                  <Text as="span" fontWeight="bold">
                    JavaScript, React, React Native, Next.js, TypeScript
                  </Text>
                  , and building mobile apps with{" "}
                  <Text as="span" fontWeight="bold">
                    React Native
                  </Text>{" "}
                  📱. I&apos;m always learning and staying up to date with new
                  technologies to keep growing in my field 🚀.
                </Text>

                <Text color={textColor} fontSize="lg" lineHeight="tall" mt={4}>
                  Outside of work, I&apos;m usually working on side projects,
                  staying active at the gym 💪, or exploring with my dog!
                  I&apos;m always open to connecting with like-minded people and
                  exploring new opportunities in tech 🔗.
                </Text>
                <Text color={textColor} fontSize="lg" lineHeight="tall" mt={4}>
                  If you&apos;re looking for someone who&apos;s driven,
                  adaptable, and always up for a challenge, let&apos;s chat! 😊
                </Text>
              </>
            )}
            {selectedFile === "Skills" && (
              <VStack align="start" spacing={4}>
                <Text color={textColor} fontSize="lg" fontWeight="bold">
                  Full-Stack Development
                </Text>
                <Text color={textColor}>
                  I’m skilled in full-stack development with a strong focus on
                  building scalable, efficient applications. My toolkit
                  includes:
                </Text>
                <VStack align="start" pl={4} spacing={2}>
                  <Text color={textColor}>
                    •{" "}
                    <Text as="span" fontWeight="bold">
                      Frontend:
                    </Text>{" "}
                    React, Next.js, TypeScript, HTML, SCSS, Tailwind CSS
                  </Text>
                  <Text color={textColor}>
                    •{" "}
                    <Text as="span" fontWeight="bold">
                      Backend:
                    </Text>{" "}
                    Node.js, Express.js, RESTful APIs, Firebase
                  </Text>
                  <Text color={textColor}>
                    •{" "}
                    <Text as="span" fontWeight="bold">
                      Mobile Development:
                    </Text>{" "}
                    React Native, Expo
                  </Text>
                  <Text color={textColor}>
                    •{" "}
                    <Text as="span" fontWeight="bold">
                      Version Control & Collaboration:
                    </Text>{" "}
                    Git, GitHub, Agile Methodologies
                  </Text>
                </VStack>

                <Text color={textColor} fontSize="lg" fontWeight="bold" mt={6}>
                  Ongoing Learning
                </Text>
                <Text color={textColor}>
                  I’m continually expanding my knowledge and currently diving
                  deeper into:
                </Text>
                <VStack align="start" pl={4} spacing={2}>
                  <Text color={textColor}>
                    •{" "}
                    <Text as="span" fontWeight="bold">
                      Rust:
                    </Text>{" "}
                    Exploring low-level systems programming.
                  </Text>
                  <Text color={textColor}>
                    •{" "}
                    <Text as="span" fontWeight="bold">
                      Python:
                    </Text>{" "}
                    Developing automation scripts.
                  </Text>
                  <Text color={textColor}>
                    •{" "}
                    <Text as="span" fontWeight="bold">
                      Electron:
                    </Text>{" "}
                    Learning to build cross-platform desktop applications.
                  </Text>
                </VStack>

                <Text color={textColor} fontSize="lg" fontWeight="bold" mt={6}>
                  Tools & Technologies
                </Text>
                <VStack align="start" pl={4} spacing={2}>
                  <Text color={textColor}>• Docker, Postman</Text>
                  <Text color={textColor}>• Knex.js, SQL</Text>
                  <Text color={textColor}>
                    • Framer Motion (for animations)
                  </Text>
                </VStack>
              </VStack>
            )}
            {selectedFile === "Resume.pdf" && <Resume />}
            {selectedFile === "DevSpace" && (
              <Text color={textColor}>
                DevSpace is a social media platform for developers, built with
                React Native and Expo. It allows developers to connect, share
                code, and collaborate on projects.
              </Text>
            )}
            {selectedFile === "FitTrack" && (
              <Text color={textColor}>
                FitTrack is a fitness tracking web application that helps users
                log their workouts, track progress, and analyze data using
                third-party API integrations.
              </Text>
            )}
          </VStack>
        )}
      </Box>
    </MacWindow>
  );
};

export default Finder;
