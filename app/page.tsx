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
import ProjectsWindow from "./components/ProjectsWindow";
import { Box, useColorMode } from "@chakra-ui/react";
import { useWindowManagement } from "./hooks/useWindowManagement";

export default function Home() {
  const { colorMode } = useColorMode();
  const {
    openWindows,
    windowPositions,
    handleOpenApp,
    handleCloseApp,
    bringToFront,
    getZIndex,
  } = useWindowManagement();

  return (
    <MobileWarning>
      <Box
        style={{
          height: "100vh",
          paddingTop: "60px",
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

        {openWindows.map((app, index) => {
          const { x, y } = windowPositions[app] || { x: 150, y: 60 };
          const zIndex = getZIndex(app);
          const commonProps = {
            onClose: () => handleCloseApp(app),
            onClick: () => bringToFront(app),
            zIndex,
            initialX: x,
            initialY: y,
          };

          switch (app) {
            case "finder":
              return (
                <MacWindow title="Finder" {...commonProps} key={app}>
                  <DocumentViewer />
                </MacWindow>
              );
            case "files":
              return (
                <MacWindow title="Files" {...commonProps} key={app}>
                  <DocumentViewer />
                </MacWindow>
              );

            case "browser":
              return <BrowserWindow {...commonProps} key={app} />;

            case "projects":
              return <ProjectsWindow {...commonProps} key={app} />;
            case "document":
              return (
                <MacWindow title="Document Viewer" {...commonProps} key={app}>
                  <DocumentViewer />
                </MacWindow>
              );
            case "vscode":
              return <VSCodeWindow {...commonProps} key={app} />;
            case "github":
              return <GitHubWindow {...commonProps} key={app} />;
            default:
              return null;
          }
        })}
      </Box>
    </MobileWarning>
  );
}
