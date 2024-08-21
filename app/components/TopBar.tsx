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

  const bgColor = useColorModeValue("gray.300", "gray.900");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box
      bg={bgColor}
      color={textColor}
      width="100%"
      height="1.875rem"
      marginBottom=".6rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX="10px"
      position="fixed"
      top="0"
      zIndex="1000"
    >
      <Flex alignItems="center">
        <AiOutlineApple size="20px" />
        <Text ml="10px">File</Text>
        <Text ml="10px">Edit</Text>
        <Text ml="10px">View</Text>
        <Text ml="10px">Go</Text>
        <Text ml="10px">Window</Text>
        <Text ml="10px">Help</Text>
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
        <FaWifi size="20px" style={{ marginRight: ".7rem" }} />
        <FaBatteryFull size="20px" />
        <Text mr="15px" ml="20px">
          {formatTime(time)}
        </Text>
      </Flex>
    </Box>
  );
};

export default TopBar;
