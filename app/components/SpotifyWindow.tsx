import { useEffect, useState } from "react";
import { getSpotifyToken, getSpotifyData } from "../utils/utils";
import {
  Box,
  Image,
  Text,
  Flex,
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
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getSpotifyToken();
      const data = await getSpotifyData(
        token,
        "playlists/1K6znuBPBNo6Kpaizo6pyh?si=486f1c959cee4e64"
      );
      setTracks(data.tracks.items);
      setCurrentTrack(data.tracks.items[0]);
    };

    fetchData();
  }, []);

  const bg = useColorModeValue("gray.900", "gray.800");
  const textColor = useColorModeValue("white", "gray.200");

  return (
    <MacWindow
      title="Spotify Player"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box
        bg={bg}
        color={textColor}
        p="4"
        height="100%"
        borderRadius="md"
      ></Box>
    </MacWindow>
  );
};

export default SpotifyWindow;
