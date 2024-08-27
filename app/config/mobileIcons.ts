import {
  FaEnvelope,
  FaChrome,
  FaCode,
  FaGithub,
  FaApple,
  FaFolderOpen,
  FaSpotify,
  FaTerminal,
  FaSlack,
  FaFileAlt,
  FaFigma,
  FaQuestionCircle,
} from "react-icons/fa";
import { CgGirl } from "react-icons/cg";

export const mobileDockIcons = [
  { icon: CgGirl, label: "Intro", action: "intro" },
  { icon: FaEnvelope, label: "Email Me", action: "email" },
  { icon: FaChrome, label: "Browser", action: "browser" },
  { icon: FaGithub, label: "GitHub", action: "github" },
];

export const mobileBackgroundIcons = [
  { icon: FaApple, label: "Finder", action: "finder" },
  { icon: FaCode, label: "Projects", action: "projects" },
  { icon: FaFolderOpen, label: "Files", action: "files" },
  { icon: FaSpotify, label: "Spotify", action: "spotify" },
  { icon: FaTerminal, label: "Terminal", action: "terminal" },
  { icon: FaSlack, label: "Slack", action: "slack" },
  { icon: FaFileAlt, label: "Document", action: "document" },
  { icon: FaFigma, label: "Figma", action: "figma" },
  { icon: FaQuestionCircle, label: "Quiz", action: "quiz" },
];
