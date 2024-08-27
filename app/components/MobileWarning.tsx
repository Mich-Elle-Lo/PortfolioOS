"use client";

import { useEffect, useState } from "react";
import { Box, Text, Center, IconButton, Flex } from "@chakra-ui/react";
import { mobileDockIcons, mobileBackgroundIcons } from "../config/mobileIcons";

import { ReactNode } from "react";

const MobileWarning = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <Box width="100%" height="100vh" bg="gray.400" color="white">
      <Flex flexWrap="wrap" justifyContent="center" p="1rem" gap="1rem">
        {mobileBackgroundIcons.map((icon, index) => (
          <Box key={index} textAlign="center">
            <IconButton
              icon={<icon.icon />}
              aria-label={icon.label}
              fontSize="24px"
              color="white"
              variant="ghost"
              mb="0.5rem"
            />
            <Text fontSize="xs" color="white">
              {icon.label}
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p="0.5rem"
        bg="rgba(0, 0, 0, 0.7)"
        justifyContent="space-around"
        borderTopLeftRadius="15px"
        borderTopRightRadius="15px"
      >
        {mobileDockIcons.map((icon, index) => (
          <IconButton
            key={index}
            icon={<icon.icon />}
            aria-label={icon.label}
            fontSize="30px"
            color="white"
            variant="ghost"
          />
        ))}
      </Flex>
    </Box>
  ) : (
    <>{children}</>
  );
};

export default MobileWarning;
