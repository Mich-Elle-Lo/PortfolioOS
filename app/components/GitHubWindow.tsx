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
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import MacWindow from "./MacWindow";
import axios from "axios";

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
  const [repos, setRepos] = useState<
    {
      id: number;
      name: string;
      description: string;
      language: string;
      stargazers_count: number;
      forks_count: number;
      html_url: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/Mich-Elle-Lo/repos"
        );
        setRepos(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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
