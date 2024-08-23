import axios from "axios";

// Spotify

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

// Github

const GITHUB_API_BASE_URL = "https://api.github.com";

export const getUserProfile = async (username: string) => {
  const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
  return response.data;
};

export const getUserRepos = async (username: string) => {
  const response = await axios.get(
    `${GITHUB_API_BASE_URL}/users/${username}/repos`
  );
  return response.data;
};

export const getUserEvents = async (username: string) => {
  const response = await axios.get(
    `${GITHUB_API_BASE_URL}/users/${username}/events`
  );
  return response.data;
};

export const getUserLanguages = async (username: string, repo: string) => {
  const response = await axios.get(
    `${GITHUB_API_BASE_URL}/repos/${username}/${repo}/languages`
  );
  return response.data;
};
