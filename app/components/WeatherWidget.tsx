"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Image, Flex, useColorModeValue } from "@chakra-ui/react";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=43.65107&lon=-79.347015&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );
        console.log("Weather API Response:", response.data);
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <Text>Loading weather...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!weatherData) {
    return null;
  }

  const temperature = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <Box
      p="4"
      borderRadius="md"
      bg={useColorModeValue("blue.300", "blue.800")}
      color="white"
      width="300px"
      boxShadow="md"
      textAlign="center"
    >
      <Text fontSize="xl" fontWeight="bold">
        {weatherData.name}, {weatherData.sys.country}
      </Text>
      <Flex justify="center" align="center" mt="2">
        <Image
          src={iconUrl}
          alt={weatherData.weather[0].description}
          boxSize="80px"
        />
        <Text fontSize="4xl" ml="3">
          {temperature}°C
        </Text>
      </Flex>
      <Text fontSize="md" mt="1" fontStyle="italic">
        {weatherData.weather[0].description}
      </Text>
      <Text mt="2">
        Feels like:{" "}
        <Text as="span" fontWeight="bold">
          {feelsLike}°C
        </Text>
      </Text>
      <Text mt="1">
        Wind:{" "}
        <Text as="span" fontWeight="bold">
          {weatherData.wind.speed} m/s
        </Text>
      </Text>
      <Text mt="1">
        Humidity:{" "}
        <Text as="span" fontWeight="bold">
          {weatherData.main.humidity}%
        </Text>
      </Text>
      <Text mt="1">
        Pressure:{" "}
        <Text as="span" fontWeight="bold">
          {weatherData.main.pressure} hPa
        </Text>
      </Text>
      <Text mt="1">
        Visibility:{" "}
        <Text as="span" fontWeight="bold">
          {weatherData.visibility / 1000} km
        </Text>
      </Text>
    </Box>
  );
};

export default WeatherWidget;
