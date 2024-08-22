"use client";
import { useEffect } from "react";
import Dock from "./components/Dock";
import BrowserWindow from "./components/BrowserWindow";
import TopBar from "./components/TopBar";
import MobileWarning from "./components/MobileWarning";
import VSCodeWindow from "./components/VSCodeWindow";
import GitHubWindow from "./components/GitHubWindow";
import ProjectsWindow from "./components/ProjectsWindow";
import MailWindow from "./components/MailWindow";
import WeatherWidget from "./components/WeatherWidget";
import IntroWindow from "./components/IntroWindow";
import QuizWindow from "./components/QuizWindow";
import SpotifyWindow from "./components/SpotifyWindow";
import Files from "./components/Files";
import Finder from "./components/Finder";
import Terminal from "./components/Terminal";
import Slack from "./components/Slack";
import Figma from "./components/Figma";
import Document from "./components/Document";
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
            case "spotify":
              return <SpotifyWindow {...commonProps} key={app} />;
            case "vscode":
              return <VSCodeWindow {...commonProps} key={app} />;
            case "github":
              return <GitHubWindow {...commonProps} key={app} />;
            case "intro":
              return <IntroWindow {...commonProps} key={app} />;
            case "quiz":
              return <QuizWindow {...commonProps} key={app} />;
            case "finder":
              return <Finder {...commonProps} key={app} />;
            case "files":
              return <Files {...commonProps} key={app} />;
            case "terminal":
              return <Terminal {...commonProps} key={app} />;
            case "slack":
              return <Slack {...commonProps} key={app} />;
            case "figma":
              return <Figma {...commonProps} key={app} />;
            case "document":
              return <Document {...commonProps} key={app} />;
            default:
              return null;
          }
        })}
      </Box>
    </MobileWarning>
  );
}
