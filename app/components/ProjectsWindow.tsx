import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  Icon,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import { FaFileAlt, FaFolder, FaCode, FaDatabase } from "react-icons/fa";

interface Project {
  id: number;
  name: string;
  content: string;
  icon: React.ElementType;
  imageUrl: string;
}

interface ProjectsWindowProps {
  onClose: () => void;
  zIndex: number;
  onClick: () => void;
  initialX: number;
  initialY: number;
}

const projectsData: Project[] = [
  {
    id: 1,
    name: "DevSpace",
    content: "A social media platform for developers. Made with React Native",
    icon: FaCode,
    imageUrl: "/comingSoon.jpeg",
  },
  {
    id: 2,
    name: "BrainFlix",
    content: "A band site with video streaming. Made with React",
    icon: FaDatabase,
    imageUrl: "/comingSoon.jpeg",
  },
  {
    id: 3,
    name: "ChatApp",
    content:
      "A chat application. Made with React, Node.js, Express, and Socket.io",
    icon: FaFileAlt,
    imageUrl: "/comingSoon.jpeg",
  },
  {
    id: 4,
    name: "Portfolio",
    content: "My personal portfolio site. Made with Next.js",
    icon: FaFolder,
    imageUrl: "/comingSoon.jpeg",
  },
  {
    id: 5,
    name: "WeatherApp",
    content: "A weather application. Made with React Native",
    icon: FaCode,
    imageUrl: "/comingSoon.jpeg",
  },
];

const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  onClose,
  zIndex,
  onClick,
  initialX,
  initialY,
}) => {
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);

  const sidePanelBg = useColorModeValue("gray.200", "gray.800");
  const sidePanelBorder = useColorModeValue("gray.300", "gray.600");
  const listItemHoverBg = useColorModeValue("gray.300", "gray.600");
  const listItemTextColor = useColorModeValue("blue.600", "blue.300");
  const mainContentBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <MacWindow
      title="Projects"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Flex height="100%" width="100%">
        <Box
          width="250px"
          bg={sidePanelBg}
          borderRight="1px solid"
          borderColor={sidePanelBorder}
          p="1rem"
        >
          <Text fontWeight="bold" mb="1rem" color={textColor}>
            Projects
          </Text>
          <List spacing={3}>
            {projectsData.map((project) => (
              <ListItem
                key={project.id}
                onClick={() => setSelectedProject(project)}
                cursor="pointer"
                _hover={{ bg: listItemHoverBg, color: listItemTextColor }}
                p="0.5rem"
                borderRadius="md"
                bg={
                  selectedProject.id === project.id
                    ? listItemHoverBg
                    : "transparent"
                }
                display="flex"
                alignItems="center"
                color={textColor}
              >
                <Icon as={project.icon} mr="1rem" />
                {project.name}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          flex="1"
          p="1rem"
          bg={mainContentBg}
          overflowY="auto"
          color={textColor}
        >
          <Text fontSize="xl" fontWeight="bold" mb="1rem">
            {selectedProject.name}
          </Text>
          <Image
            src={selectedProject.imageUrl}
            alt={selectedProject.name}
            borderRadius="md"
            mb="1rem"
          />
          <Text>{selectedProject.content}</Text>
        </Box>
      </Flex>
    </MacWindow>
  );
};

export default ProjectsWindow;
