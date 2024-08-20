"use client";

import { useEffect, useState } from "react";
import { Box, Text, Center } from "@chakra-ui/react";

const MobileWarning = ({ children }) => {
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
    <Center height="100vh" bg="grey.400" color="white">
      <Text fontSize="xl" textAlign="center">
        Oops! This app isn't ready to play on tiny screens yet. 📱
        <br />
        Please visit on a bigger device for the full experience! 🌟
      </Text>
    </Center>
  ) : (
    <>{children}</>
  );
};

export default MobileWarning;
