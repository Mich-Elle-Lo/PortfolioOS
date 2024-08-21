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
  const [zIndexOrder, setZIndexOrder] = useState<string[]>([]);
  const { colorMode } = useColorMode();

  const handleOpenApp = (app: string) => {
    if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
      setZIndexOrder([...zIndexOrder, app]);
    } else {
      bringToFront(app);
    }
  };

  const handleCloseApp = (app: string) => {
    setOpenWindows(openWindows.filter((w) => w !== app));
    setZIndexOrder(zIndexOrder.filter((w) => w !== app));
  };

  const bringToFront = (app: string) => {
    setZIndexOrder([...zIndexOrder.filter((w) => w !== app), app]);
  };
  const getZIndex = (app: string) => {
    return zIndexOrder.indexOf(app) + 1;
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
          <MacWindow
            title="Finder"
            onClose={() => handleCloseApp("finder")}
            zIndex={getZIndex("finder")}
            onClick={() => bringToFront("finder")}
          >
            <DocumentViewer />
          </MacWindow>
        )}

        {openWindows.includes("files") && (
          <MacWindow
            title="Files"
            onClose={() => handleCloseApp("files")}
            zIndex={getZIndex("files")}
            onClick={() => bringToFront("files")}
          >
            <DocumentViewer />
          </MacWindow>
        )}

        {openWindows.includes("browser") && (
          <BrowserWindow
            onClose={() => handleCloseApp("browser")}
            zIndex={getZIndex("browser")}
            onClick={() => bringToFront("browser")}
          />
        )}

        {openWindows.includes("projects") && (
          <MacWindow
            title="Projects"
            onClose={() => handleCloseApp("projects")}
            zIndex={getZIndex("projects")}
            onClick={() => bringToFront("projects")}
          >
            <DocumentViewer />
          </MacWindow>
        )}

        {openWindows.includes("document") && (
          <MacWindow
            title="Document Viewer"
            onClose={() => handleCloseApp("document")}
            zIndex={getZIndex("document")}
            onClick={() => bringToFront("document")}
          >
            <DocumentViewer />
          </MacWindow>
        )}
        {openWindows.includes("vscode") && (
          <VSCodeWindow
            onClose={() => handleCloseApp("vscode")}
            zIndex={getZIndex("vscode")}
            onClick={() => bringToFront("vscode")}
          />
        )}
        {openWindows.includes("github") && (
          <GitHubWindow
            onClose={() => handleCloseApp("github")}
            zIndex={getZIndex("github")}
            onClick={() => bringToFront("github")}
          />
        )}
      </Box>
    </MobileWarning>
  );
}
