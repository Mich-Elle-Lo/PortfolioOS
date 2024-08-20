"use client";

import ReactMarkdown from "react-markdown";
import { Box } from "@chakra-ui/react";

const markdownContent = `
# Document Title

This is a sample document written in Markdown.

- **Point 1:** Markdown allows you to write in a text format that can be converted into HTML.
- **Point 2:** It’s a great way to write documentation or other content in a simple, readable way.

## Code Example

\`\`\`javascript
console.log('Hello, world!');
\`\`\`
`;

const DocumentViewer = () => {
  return (
    <Box>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </Box>
  );
};

export default DocumentViewer;
