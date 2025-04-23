"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Image,
  Flex,
  useColorModeValue,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { Rnd } from "react-rnd";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{ description: string; icon: string }>;
  wind: { speed: number };
  visibility: number;
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const bgColor = useColorModeValue(
    "rgba(255,255,255,0.2)",
    "rgba(26,32,44,0.6)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.600");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
    },
    (error) => {
      console.error("Geolocation error:", error);
    }
  );

  useEffect(() => {
    const fetchWeatherData = (lat: number, lon: number) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        )
        .then((response) => {
          setWeatherData(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch weather data.");
          setLoading(false);
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation failed, defaulting to Toronto");
          fetchWeatherData(43.7001, -79.4163);
        }
      );
    } else {
      fetchWeatherData(43.7001, -79.4163);
    }
  }, []);

  const toggleCollapse = () => setCollapsed(!collapsed);

  if (!weatherData) return null;

  const temperature = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 240,
        height: collapsed ? 100 : 420,
      }}
      minHeight={100}
      minWidth={180}
      bounds="parent"
      enableResizing={false}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          p="4"
          borderRadius="xl"
          bg={bgColor}
          color="white"
          width="100%"
          boxShadow="lg"
          backdropFilter="blur(12px)"
          border={`1px solid ${borderColor}`}
          position="relative"
        >
          {/* Toggle collapse button */}
          <IconButton
            icon={collapsed ? <FaChevronDown /> : <FaChevronUp />}
            size="xs"
            onClick={toggleCollapse}
            position="absolute"
            top="8px"
            right="8px"
            aria-label="Toggle collapse"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            color="white"
          />

          {loading ? (
            <Flex justify="center" align="center" height="100%">
              <Spinner size="xl" color="white" />
            </Flex>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <AnimatePresence>
              {collapsed ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Flex direction="column" align="center">
                    <Image src={iconUrl} alt="weather icon" boxSize="60px" />
                    <Text fontWeight="bold">{temperature}°C</Text>
                    <Text fontSize="sm" opacity={0.8}>
                      {weatherData.weather[0].description}
                    </Text>
                  </Flex>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Text fontSize="xl" fontWeight="bold">
                    {weatherData.name}, {weatherData.sys.country}
                  </Text>

                  <Flex justify="center" align="center" mt="3">
                    <Image src={iconUrl} alt="weather icon" boxSize="80px" />
                    <Text fontSize="4xl" ml="3">
                      {temperature}°C
                    </Text>
                  </Flex>

                  <Text fontSize="md" mt="2" fontStyle="italic">
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
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </Box>
      </motion.div>
    </Rnd>
  );
};

export default WeatherWidget;
