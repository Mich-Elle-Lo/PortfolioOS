import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Link,
  Flex,
  Heading,
  Badge,
  Icon,
  Skeleton,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import MacWindow from "./MacWindow";
import {
  getUserProfile,
  getUserRepos,
  getUserEvents,
  getUserLanguages,
} from "../utils/api";

interface GitHubWindowProps {
  onClose: () => void;
  zIndex: number;
  onClick: () => void;
  initialX: number;
  initialY: number;
}

const GitHubWindow: React.FC<GitHubWindowProps> = ({
  onClose,
  zIndex,
  onClick,
  initialX,
  initialY,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const username = "Mich-Elle-Lo"; // GitHub username

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const tabColor = useColorModeValue("blue.600", "blue.300");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileData = await getUserProfile(username);
        const reposData = await getUserRepos(username);
        const eventsData = await getUserEvents(username);
        setProfile(profileData);
        setRepos(reposData);
        setEvents(eventsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Having issues fetching GitHub data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("profile", profile);
  console.log("repos", repos);
  console.log("events", events);

  return (
    <MacWindow
      title="GitHub - Mich-Elle-Lo Repositories"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box
        height="100%"
        width="100%"
        // overflow="hidden"
        overflow="auto"
        p="1rem"
      >
        <Flex alignItems="center" mb="1.5rem" color="white">
          <Icon as={FaGithub} boxSize={8} />
          <Heading as="h1" size="lg" ml="1rem">
            Mich-Elle-Lo / Repositories
          </Heading>
        </Flex>
        {loading && <Skeleton height="20px" mb="10px" />}
        {error && <Text color="red.500">Error fetching data: {error}</Text>}
        {repos.length > 0 && (
          <Box>
            {repos.map((repo) => (
              <Box
                key={repo.id}
                mb="1rem"
                p="1rem"
                border="1px"
                borderColor="gray.700"
                borderRadius="md"
                bg="gray.800"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Link
                      href={repo.html_url}
                      isExternal
                      fontSize="lg"
                      fontWeight="bold"
                      color="blue.300"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {repo.name}
                    </Link>
                    <Text color="gray.400">
                      {repo.description || "No description provided."}
                    </Text>
                  </Box>
                  <Badge colorScheme="green" fontSize="0.8em">
                    {repo.language || "N/A"}
                  </Badge>
                </Flex>
                <Flex mt="0.5rem" color="gray.500">
                  <Text mr="1.5rem">{repo.stargazers_count} Stars</Text>
                  <Text>{repo.forks_count} Forks</Text>
                </Flex>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </MacWindow>
  );
};

export default GitHubWindow;
