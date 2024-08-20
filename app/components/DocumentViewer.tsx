"use client";

import ReactMarkdown from "react-markdown";
import { Box, useColorMode } from "@chakra-ui/react";

const markdownContent = `

## Hey there! I'm Michelle, a full stack developer based in Toronto, Canada. 🙋🏻‍♀️
---
## What I Do

I work with a variety of technologies to bring projects to life, including:

- **JavaScript**
- **React**
- **React Native**
- **Expo**
- **Next.js**
- **Express**
- **Node.js**
- **Some Python**
---
## My Journey

I've always had a passion for technology, and much of what I know today, I initially learned on my own through self-study and hands-on projects.

- **Education:** I earned a Diploma in Software Engineering from BrainStation.
- **Past Experience:** Before jumping into tech, I worked as a Real Estate Agent! 

---

**Let’s Connect:** [LinkedIn](https://www.linkedin.com/in/michelle--lo/) | [GitHub](https://github.com/Mich-Elle-Lo)
`;

const DocumentViewer = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const customStyles = {
    h2: {
      fontSize: "24px",
      color: isDark ? "#e2e8f0" : "#2c3e50",
      marginBottom: "10px",
    },
    p: {
      fontSize: "18px",
      color: isDark ? "#cbd5e0" : "#34495e",
      marginBottom: "10px",
    },
    ul: {
      paddingLeft: "20px",
    },
    li: {
      marginBottom: "10px",
      color: isDark ? "#81e6d9" : "#16a085",
    },
  };

  return (
    <Box>
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => <h2 style={customStyles.h2} {...props} />,
          p: ({ node, ...props }) => <p style={customStyles.p} {...props} />,
          ul: ({ node, ...props }) => <ul style={customStyles.ul} {...props} />,
          li: ({ node, ...props }) => <li style={customStyles.li} {...props} />,
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </Box>
  );
};

export default DocumentViewer;
