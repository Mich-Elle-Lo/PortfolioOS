import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaWifi, FaBatteryFull } from "react-icons/fa";
import { AiOutlineApple } from "react-icons/ai";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { formatTime } from "../utils/utils";

const TopBar = () => {
  const time = useCurrentTime();
  const { colorMode, toggleColorMode } = useColorMode();
  const [batteryLevel, setBatteryLevel] = useState<number>(100);

  const bgColor = useColorModeValue(
    "rgba(255,255,255,0.4)",
    "rgba(26,32,44,0.4)"
  );
  const textColor = useColorModeValue("black", "white");

  const isWifiConnected = true;

  const getBatteryColor = () => {
    if (batteryLevel >= 80) return "green.400";
    if (batteryLevel >= 30) return "orange.300";
    return "red.400";
  };

  return (
    <Box
      bg={bgColor}
      color={textColor}
      width="100%"
      height="2.5rem"
      marginBottom=".6rem"
      cursor="default"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX="12px"
      position="fixed"
      top="0"
      zIndex="1000"
      backdropFilter="blur(10px)"
      transition="background 0.3s ease"
      // initial={{ opacity: 0, y: -10 }}
      // animate={{ opacity: 1, y: 0 }}
    >
      <Flex alignItems="center">
        <AiOutlineApple size="20px" />
        {["File", "Edit", "View", "Go", "Window", "Help"].map((item) => (
          <Text
            key={item}
            ml="10px"
            fontSize="md"
            fontWeight="medium"
            _hover={{ opacity: 0.8 }}
            transition="all 0.2s ease"
          >
            {item}
          </Text>
        ))}
      </Flex>

      <Flex alignItems="center">
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          mr=".5rem"
          size="sm"
          variant="ghost"
          color={textColor}
        />
        {/* WiFi with green dot */}
        <Flex align="center" mr="0.7rem" position="relative">
          <FaWifi size="18px" />
          {isWifiConnected && (
            <Box
              position="absolute"
              top="0"
              right="-6px"
              w="6px"
              h="6px"
              bg="green.300"
              borderRadius="full"
            />
          )}
        </Flex>
        <Flex align="center" position="relative" mr="15px">
          <FaBatteryFull size="18px" />
          <Box
            position="absolute"
            top="0"
            right="-6px"
            w="6px"
            h="6px"
            bg={getBatteryColor()}
            borderRadius="full"
          />
        </Flex>
        <Text mr="15px" ml="20px">
          {formatTime(time)}
        </Text>
      </Flex>
    </Box>
  );
};

export default TopBar;
