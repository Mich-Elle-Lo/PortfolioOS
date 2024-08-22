import axios from "axios";

export interface WindowPosition {
  x: number;
  y: number;
}

export const generateRandomPosition = (): WindowPosition => {
  const maxX = window.innerWidth - 700;
  const maxY = window.innerHeight - 600 - 60;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY) + 60;
  return { x, y };
};

export const getZIndex = (zIndexOrder: string[], app: string): number => {
  return zIndexOrder.indexOf(app) + 1;
};

export const bringToFront = (zIndexOrder: string[], app: string): string[] => {
  return [...zIndexOrder.filter((w) => w !== app), app];
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

export const getSpotifyToken = async () => {
  const tokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return tokenResponse.data.access_token;
};

export const getSpotifyData = async (
  token: string,
  endpoint: string
): Promise<any> => {
  const response = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
