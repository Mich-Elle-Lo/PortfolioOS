"use client";

import { Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

const BrowserWindow = () => {
  const [url, setUrl] = useState("https://www.google.com");

  return (
    <Box>
      <Box display="flex" mb={2}>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={() => window.open(url, "_blank")} ml={2}>
          Go
        </Button>
      </Box>
      <Box height="100%" overflow="hidden">
        <iframe src={url} style={{ width: "100%", height: "400px" }} />
      </Box>
    </Box>
  );
};

export default BrowserWindow;
