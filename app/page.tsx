"use client";
import { useState } from "react";
import Dock from "./components/Dock";
import MacWindow from "./components/MacWindow";
import BrowserWindow from "./components/BrowserWindow";
import DocumentViewer from "./components/DocumentViewer";
import ThemeToggle from "./components/ThemeToggle";
import { Box, useColorMode } from "@chakra-ui/react";

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const { colorMode } = useColorMode();

  const handleOpenApp = (app: string) => {
    if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
    }
  };

  const handleCloseApp = (app: string) => {
    setOpenWindows(openWindows.filter((w) => w !== app));
  };

  return (
    <Box
      style={{
        height: "100vh",
        backgroundImage:
          colorMode === "light"
            ? "url('/lightbg.jpeg')"
            : "url('/darkbg.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        position: "relative",
      }}
    >
      <ThemeToggle />
      <Dock onOpenApp={handleOpenApp} />

      {openWindows.includes("finder") && (
        <MacWindow title="Finder" onClose={() => handleCloseApp("finder")}>
          {/* Finder Content */}
          {/* Add your content here */}
        </MacWindow>
      )}

      {openWindows.includes("files") && (
        <MacWindow title="Files" onClose={() => handleCloseApp("files")}>
          {/* Files Content */}
        </MacWindow>
      )}

      {openWindows.includes("browser") && (
        <MacWindow title="Chrome" onClose={() => handleCloseApp("browser")}>
          <BrowserWindow />
        </MacWindow>
      )}

      {openWindows.includes("projects") && (
        <MacWindow title="Projects" onClose={() => handleCloseApp("projects")}>
          {/* Projects Content */}
        </MacWindow>
      )}

      {openWindows.includes("document") && (
        <MacWindow
          title="Document Viewer"
          onClose={() => handleCloseApp("document")}
        >
          <DocumentViewer />
        </MacWindow>
      )}
    </Box>
  );
}
