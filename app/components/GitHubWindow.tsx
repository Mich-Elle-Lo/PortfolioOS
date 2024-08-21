import { useEffect, useState } from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import axios from "axios";

const GitHubWindow = ({ onClose }) => {
  const [repos, setRepos] = useState<
    { id: number; name: string; description: string }[]
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <MacWindow title="GitHub - Mich-Elle-Lo Repositories" onClose={onClose}>
      <Box
        height="100%"
        width="100%"
        // overflow="hidden"
        overflow="auto"
        p="1rem"
      >
        {loading && <Text>Loading repositories...</Text>}
        {error && <Text color="red.500">Error fetching data: {error}</Text>}
        {repos.length > 0 &&
          repos.map((repo) => (
            <Box key={repo.id} mb="1rem">
              <Text fontWeight="bold">
                <Link href={(repo as any).html_url} isExternal>
                  {repo.name}
                </Link>
              </Text>
              <Text>{repo.description || "No description provided."}</Text>
            </Box>
          ))}
      </Box>
    </MacWindow>
  );
};

export default GitHubWindow;
