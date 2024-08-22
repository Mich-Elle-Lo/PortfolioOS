import { Box, useColorMode } from "@chakra-ui/react";
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

  return (
    <MacWindow
      title="Spotify Player"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
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
    </MacWindow>
  );
};

export default SpotifyWindow;
