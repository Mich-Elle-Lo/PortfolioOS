"use client";
import { useEffect } from "react";
import Dock from "./components/Dock";
import MacWindow from "./components/MacWindow";
import BrowserWindow from "./components/BrowserWindow";
import DocumentViewer from "./components/DocumentViewer";
import TopBar from "./components/TopBar";
import MobileWarning from "./components/MobileWarning";
import VSCodeWindow from "./components/VSCodeWindow";
import GitHubWindow from "./components/GitHubWindow";
import ProjectsWindow from "./components/ProjectsWindow";
import MailWindow from "./components/MailWindow";
import WeatherWidget from "./components/WeatherWidget";
import IntroWindow from "./components/IntroWindow";
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

  useEffect(() => {
    handleOpenApp("intro");
  }, []);

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
        <WeatherWidget />
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
            case "browser":
              return <BrowserWindow {...commonProps} key={app} />;
            case "projects":
              return <ProjectsWindow {...commonProps} key={app} />;
            case "email":
              return <MailWindow {...commonProps} key={app} />;
            case "vscode":
              return <VSCodeWindow {...commonProps} key={app} />;
            case "github":
              return <GitHubWindow {...commonProps} key={app} />;
            case "intro":
              return <IntroWindow {...commonProps} key={app} />;
            default:
              return null;
          }
        })}
      </Box>
    </MobileWarning>
  );
}
