import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  Box,
  Text,
  Link,
  Flex,
  Badge,
  Skeleton,
  VStack,
  HStack,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import {
  getUserProfile,
  getUserRepos,
  getRepoLanguages,
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
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("profile");

  const username = "Mich-Elle-Lo"; // GitHub username

  const bg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const tabColor = useColorModeValue("blue.600", "blue.300");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const filterLastSixMonths = (contributions: any) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    return contributions.filter(
      (day: any) => new Date(day.date) > sixMonthsAgo
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileData = await getUserProfile(username);
        const reposData = await getUserRepos(username);
        const languagesData = await getUserLanguages(username);
        const reposWithLanguages = await Promise.all(
          reposData.map(async (repo: any) => {
            const repoLanguages = await getRepoLanguages(repo.languages_url);
            return { ...repo, languages: repoLanguages };
          })
        );
        setProfile(profileData);
        setRepos(reposWithLanguages);
        setLanguages(languagesData);
      } catch (err) {
        setError("Uh oh! Error fetching GitHub data");
        console.error("Having issues fetching GitHub data", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(repos);

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return (
          <VStack spacing={2} align="center" width="100%">
            {profile && (
              <>
                <Avatar src={profile.avatar_url} size="2xl" />
                <Text fontSize="2xl" fontWeight="bold">
                  {profile.name}
                </Text>
                <Text>{profile.bio}</Text>
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Text fontSize="lg" fontWeight="bold" paddingBottom={4}>
                    Contributions
                  </Text>
                  <GitHubCalendar
                    username="Mich-Elle-Lo"
                    transformData={filterLastSixMonths}
                  />
                </Box>
              </>
            )}
          </VStack>
        );
      case "repos":
        return (
          <VStack spacing={2} align="start">
            {repos.map((repo: any) => (
              <Box
                key={repo.id}
                p={2}
                bg="gray.800"
                borderRadius="md"
                width="100%"
              >
                <Link
                  href={repo.html_url}
                  isExternal
                  color="blue.300"
                  fontWeight="bold"
                >
                  {repo.name}
                </Link>
                <Text>{repo.description || "No description provided."}</Text>
                <HStack mt={2} spacing={4}>
                  <Box>
                    <Text>Languages:</Text>
                    {repo.languages &&
                      Object.keys(repo.languages).map((lang) => (
                        <Badge key={lang} colorScheme="teal" mr={2}>
                          {lang}
                        </Badge>
                      ))}
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        );
      case "languages":
        return (
          <VStack spacing={5} align="center" width="100%">
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={4}
            >
              <Text fontSize="lg" fontWeight="bold">
                Top Languages
              </Text>
              {languages.length > 0 ? (
                <PieChart width={300} height={300}>
                  <Pie
                    data={languages}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {languages.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <Text>No language data available</Text>
              )}
            </Box>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <MacWindow
      title="GitHub - Mich-Elle-Lo"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box height="100%" width="100%" overflow="hidden" p="1rem" bg={bg}>
        <Flex height="100%">
          <Box
            width="8rem"
            p="4"
            borderRight="1px solid"
            borderColor="gray.500"
          >
            <VStack align="start" spacing={4}>
              <Button
                variant="link"
                onClick={() => setSelectedTab("profile")}
                colorScheme={selectedTab === "profile" ? "blue" : "gray"}
              >
                Profile
              </Button>
              <Button
                variant="link"
                onClick={() => setSelectedTab("repos")}
                colorScheme={selectedTab === "repos" ? "blue" : "gray"}
              >
                Repos
              </Button>
              <Button
                variant="link"
                onClick={() => setSelectedTab("languages")}
                colorScheme={selectedTab === "languages" ? "blue" : "gray"}
              >
                Languages
              </Button>
            </VStack>
          </Box>
          <Box flex="1" p="4" overflowY="auto">
            {loading ? <Skeleton height="20px" /> : renderContent()}
          </Box>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default GitHubWindow;
