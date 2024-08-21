"use client";

import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import MacWindow from "./MacWindow";

interface GitHubWindowProps {
  onClose: () => void;
  zIndex: number;
  onClick: () => void;
  initialX: number;
  initialY: number;
}

const BrowserWindow: React.FC<GitHubWindowProps> = ({
  onClose,
  zIndex,
  onClick,
  initialX,
  initialY,
}) => {
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
    <MacWindow
      title="Chrome"
      onClose={onClose}
      zIndex={0}
      onClick={() => {}}
      initialX={initialX}
      initialY={initialY}
    >
      <Box display="flex" flexDirection="column" height="100%">
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
        <Box flexGrow={1} overflow="hidden">
          {isBlocked ? (
            <Text color="red.500">The site refused to connect.</Text>
          ) : (
            <iframe
              src={url}
              style={{ width: "100%", height: "100%", border: "none" }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
        </Box>
      </Box>
    </MacWindow>
  );
};

export default BrowserWindow;
