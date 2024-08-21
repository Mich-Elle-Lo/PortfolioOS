"use client";
import { useState } from "react";
import Dock from "./components/Dock";
import MacWindow from "./components/MacWindow";
import BrowserWindow from "./components/BrowserWindow";
import DocumentViewer from "./components/DocumentViewer";
import TopBar from "./components/TopBar";
import MobileWarning from "./components/MobileWarning";
import VSCodeWindow from "./components/VSCodeWindow";
import GitHubWindow from "./components/GitHubWindow";
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
    <MobileWarning>
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
        <TopBar />
        <Dock onOpenApp={handleOpenApp} />

        {openWindows.includes("finder") && (
          <MacWindow title="Finder" onClose={() => handleCloseApp("finder")}>
            <DocumentViewer />
          </MacWindow>
        )}

        {openWindows.includes("files") && (
          <MacWindow title="Files" onClose={() => handleCloseApp("files")}>
            <DocumentViewer />
          </MacWindow>
        )}

        {openWindows.includes("browser") && (
          <MacWindow title="Chrome" onClose={() => handleCloseApp("browser")}>
            <BrowserWindow />
          </MacWindow>
        )}

        {openWindows.includes("projects") && (
          <MacWindow
            title="Projects"
            onClose={() => handleCloseApp("projects")}
          >
            <DocumentViewer />
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
        {openWindows.includes("vscode") && (
          <VSCodeWindow onClose={() => handleCloseApp("vscode")} />
        )}
        {openWindows.includes("github") && (
          <GitHubWindow onClose={() => handleCloseApp("github")} />
        )}
      </Box>
    </MobileWarning>
  );
}
