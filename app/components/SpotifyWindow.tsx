import { useEffect, useState } from "react";
import { getSpotifyToken, getSpotifyData } from "../utils/utils";

type Props = {};

const SpotifyWindow = (props: Props) => {
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
  console.log(tracks);
  return <div>SpotifyWindow</div>;
};

export default SpotifyWindow;
