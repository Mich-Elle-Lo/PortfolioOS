"use client";

import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const BrowserWindow = () => {
  const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");

  const [isBlocked, setIsBlocked] = useState(false);

  const handleNavigation = () => {
    let formattedUrl = url.trim();

    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setUrl(formattedUrl);
    setIsBlocked(false);
  };

  const handleIframeLoad = () => {
    setIsBlocked(false);
  };

  const handleIframeError = () => {
    setIsBlocked(true);
  };

  return (
    <Box>
      <Box display="flex" mb={2}>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleNavigation();
            }
          }}
        />
        <Button onClick={handleNavigation} ml={2}>
          Go
        </Button>
      </Box>
      <Box height="100%" overflow="hidden">
        {isBlocked ? (
          <Text color="red.500">The site refused to connect.</Text>
        ) : (
          <iframe
            src={url}
            style={{ width: "100%", height: "400px" }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </Box>
    </Box>
  );
};

export default BrowserWindow;
