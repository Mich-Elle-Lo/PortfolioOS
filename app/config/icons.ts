import {
  FaApple,
  FaCode,
  FaFolderOpen,
  FaChrome,
  FaFileAlt,
  FaSlack,
  FaSpotify,
  FaGithub,
  FaTerminal,
  FaDocker,
  FaFigma,
  FaEnvelope,
} from "react-icons/fa";
import { CgGirl } from "react-icons/cg";
import { SiNotion, SiVisualstudiocode, SiJira } from "react-icons/si";

export const dockIcons = [
  { icon: FaApple, label: "Finder", action: "finder" },
  { icon: FaEnvelope, label: "Email Me", action: "email" },
  { icon: FaFolderOpen, label: "Files", action: "files" },
  { icon: FaChrome, label: "Browser", action: "browser" },
  { icon: FaCode, label: "Projects", action: "projects" },
  { icon: FaFileAlt, label: "Document", action: "document" },
  { icon: SiVisualstudiocode, label: "VSCode", action: "vscode" },
  { icon: FaSlack, label: "Slack", action: "slack" },
  { icon: FaSpotify, label: "Spotify", action: "spotify" },
  { icon: SiNotion, label: "Notion", action: "notion" },
  { icon: FaGithub, label: "GitHub", action: "github" },
  { icon: FaTerminal, label: "Terminal", action: "terminal" },
  { icon: SiJira, label: "Jira", action: "jira" },
  { icon: FaFigma, label: "Figma", action: "figma" },
  { icon: CgGirl, label: "Intro", action: "intro" },
];
