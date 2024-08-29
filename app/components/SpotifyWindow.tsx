import { useState } from "react";
import {
  Box,
  useColorMode,
  Flex,
  Skeleton,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";

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
  const [loading, setLoading] = useState(false);

  const bg = useColorModeValue("gray.100", "gray.800");

  const iframeSources: { [key: string]: string } = {
    portfolioJams:
      "https://open.spotify.com/embed/playlist/1K6znuBPBNo6Kpaizo6pyh?utm_source=generator",
    chineseClassics:
      "https://open.spotify.com/embed/playlist/2yvUoEUTuIR3eifunOvaOY?utm_source=generator",
  };
  const renderContent = () => {
    if (loading) {
      return <Skeleton height="20px" />;
    }

    return (
      <VStack align="center" width="100%" height="100%">
        <Box height="100%" width="100%" overflow="hidden" p="0">
          <iframe
            src={`${iframeSources[selectedTab]}${
              colorMode === "light" ? "" : "&theme=0"
            }`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{
              width: "101%",
              height: "101%",
              border: "none",
              margin: "-.2rem",
              boxSizing: "border-box",
              borderRadius: "0",
            }}
          ></iframe>
        </Box>
      </VStack>
    );
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
      <Box height="100%" width="100%" overflow="hidden" bg={bg}>
        <Flex direction="column" height="100%" align="center" width="100%">
          <HStack align="center" spacing={4} w="100%" justify="center">
            <Button
              variant="ghost"
              onClick={() => setSelectedTab("portfolioJams")}
              colorScheme={selectedTab === "portfolioJams" ? "blue" : "gray"}
            >
              Portfolio Jams
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSelectedTab("chineseClassics")}
              colorScheme={selectedTab === "chineseClassics" ? "blue" : "gray"}
            >
              Chinese Classics
            </Button>
          </HStack>
          <Box flex="1" w="100%">
            {renderContent()}
          </Box>
        </Flex>
      </Box>
    </MacWindow>
  );
};

export default SpotifyWindow;
