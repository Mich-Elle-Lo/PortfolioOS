import { useState } from "react";
import {
  Box,
  useColorMode,
  Text,
  Link,
  Flex,
  Badge,
  Skeleton,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import { color } from "framer-motion";

interface SpotifyWindowProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const SpotifyWindow: React.FC<SpotifyWindowProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const { colorMode } = useColorMode();
  const [selectedTab, setSelectedTab] = useState("portfolioJams");
  const [portfolioJams, setPortfolioJams] = useState<any>(null);
  const [chineseClassics, setChineseClassics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const tabColor = useColorModeValue("blue.600", "blue.300");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderContent = () => {
    switch (selectedTab) {
      case "portfolioJams":
        return (
          <VStack spacing={2} align="center" width="100%">
            {portfolioJams && (
              <Box height="100%" width="100%" overflow="hidden">
                {colorMode === "light" ? (
                  <iframe
                    src="https://open.spotify.com/embed/playlist/1K6znuBPBNo6Kpaizo6pyh?utm_source=generator"
                    width="101%"
                    height="101%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{
                      borderRadius: "0",
                      margin: "-3px",
                    }}
                  ></iframe>
                ) : (
                  <iframe
                    src="https://open.spotify.com/embed/playlist/1K6znuBPBNo6Kpaizo6pyh?utm_source=generator&theme=0"
                    width="101%"
                    height="101%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{
                      borderRadius: "0",
                      margin: "-3px",
                    }}
                  ></iframe>
                )}
              </Box>
            )}
          </VStack>
        );
      case "chineseClassics":
        return (
          <VStack spacing={2} align="center" width="100%">
            {portfolioJams && (
              <Box height="100%" width="100%" overflow="hidden">
                {colorMode === "light" ? (
                  <iframe
                    src="https://open.spotify.com/embed/playlist/1K6znuBPBNo6Kpaizo6pyh?utm_source=generator"
                    width="101%"
                    height="101%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{
                      borderRadius: "0",
                      margin: "-3px",
                    }}
                  ></iframe>
                ) : (
                  <iframe
                    src="https://open.spotify.com/embed/playlist/1K6znuBPBNo6Kpaizo6pyh?utm_source=generator&theme=0"
                    width="101%"
                    height="101%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{
                      borderRadius: "0",
                      margin: "-3px",
                    }}
                  ></iframe>
                )}
              </Box>
            )}
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <MacWindow
      title="Spotify Player"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box height="100%" width="100%" overflow="hidden" p=".5rem" bg={bg}>
        <Flex height="100%">
          <Box
            width="10rem"
            p="2"
            borderRight="1px solid"
            borderColor="gray.500"
          >
            <VStack align="start" spacing={4}>
              <Button
                variant="link"
                onClick={() => setSelectedTab("portfolioJams")}
                colorScheme={selectedTab === "portfolioJams" ? "blue" : "gray"}
              >
                Portfolio Jams
              </Button>
              <Button
                variant="link"
                onClick={() => setSelectedTab("chineseClassics")}
                colorScheme={
                  selectedTab === "chineseClassics" ? "blue" : "gray"
                }
              >
                Chinese Classics
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

export default SpotifyWindow;
