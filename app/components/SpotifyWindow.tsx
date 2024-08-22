import { Box } from "@chakra-ui/react";
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
        <iframe
          src="https://open.spotify.com/embed/playlist/1K6znuBPBNo6Kpaizo6pyh?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </Box>
    </MacWindow>
  );
};

export default SpotifyWindow;
