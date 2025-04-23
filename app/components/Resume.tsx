"use client";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  Collapse,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp, FiDownload } from "react-icons/fi";

const Resume = () => {
  const { isOpen: isExpOpen, onToggle: toggleExp } = useDisclosure();
  const { isOpen: isSkillsOpen, onToggle: toggleSkills } = useDisclosure();
  const { isOpen: isEduOpen, onToggle: toggleEdu } = useDisclosure();

  const bg = useColorModeValue("whiteAlpha.800", "blackAlpha.600");
  const textColor = useColorModeValue("gray.900", "white");

  return (
    <Box bg={bg} p={6} borderRadius="md" w="100%" h="100%">
      <VStack spacing={6} align="start">
        <HStack justify="space-between" width="100%">
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Michelle Lo - Software Engineer
          </Text>

          <Button
            as="a"
            href="/MichelleLoResume.pdf"
            download
            leftIcon={<FiDownload />}
            size="sm"
            colorScheme="blue"
          >
            Download PDF
          </Button>
        </HStack>

        <Text color={textColor}>
          <a href="https://www.linkedin.com/in/michelle--lo/" target="_blank">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com/Mich-Elle-Lo" target="_blank">
            GitHub
          </a>
        </Text>

        {/* Experience Section */}
        <Box width="100%">
          <HStack justify="space-between" width="100%">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Experience
            </Text>
            <Button
              onClick={toggleExp}
              variant="ghost"
              size="sm"
              color={textColor}
            >
              {isExpOpen ? <FiChevronUp /> : <FiChevronDown />}
            </Button>
          </HStack>
          <Collapse in={isExpOpen} animateOpacity>
            <Box mt={4} color={textColor}>
              <Text fontWeight="bold">Software Engineer | Phaze.io</Text>
              <Text>Dec 2024 – Present · Toronto, Canada</Text>
              <Text mb={4}>
                ● Spearheading the front-end redevelopment for a B2B crypto
                startup, enhancing UX and performance.
                <br />● Collaborating directly with the CTO to build scalable
                front-end architectures using TypeScript, React, and Redux.
                <br />● Refactoring UI/UX for responsiveness and accessibility
                across devices.
                <br />● Leading state management (Redux, Context API) and
                routing.
              </Text>

              <Text fontWeight="bold">Software Engineer | Heal House</Text>
              <Text>July 2024 – Dec 2024 · Toronto, Canada</Text>
              <Text mb={4}>
                ● Migrated site from WordPress to Next.js, improving page speed
                by 40%.
                <br />● Implemented TypeScript for type safety and refactor
                efficiency.
                <br />● Developed booking and secure payment systems that
                increased user conversion.
              </Text>

              <Text fontWeight="bold">Software Engineer | MakeitMVP</Text>
              <Text>June 2024 – Aug 2024 · Toronto, Canada</Text>
              <Text mb={4}>
                ● Built an EdTech skill exchange platform with a token system.
                <br />● Delivered a responsive front-end with React and
                TypeScript.
              </Text>

              <Text fontWeight="bold">Teaching Assistant | BrainStation</Text>
              <Text>March 2024 – Aug 2024 · Toronto, Canada</Text>
              <Text mb={4}>
                ● Supported 48 students across full-stack topics (React, Node,
                Express, SCSS).
                <br />● Ran workshops, code reviews, grading, and personalized
                mentoring.
              </Text>

              <Text fontWeight="bold">Real Estate Agent | EXP Realty</Text>
              <Text>Jan 2020 – March 2024 · Toronto, Canada</Text>
              <Text>
                ● Managed contracts, client relationships, and negotiations.
                <br />● Delivered insights through market analysis and
                evaluations.
              </Text>
            </Box>
          </Collapse>
        </Box>

        <Divider />

        {/* Skills Section */}
        <Box width="100%">
          <HStack justify="space-between" width="100%">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Skills
            </Text>
            <Button
              onClick={toggleSkills}
              variant="ghost"
              size="sm"
              color={textColor}
            >
              {isSkillsOpen ? <FiChevronUp /> : <FiChevronDown />}
            </Button>
          </HStack>
          <Collapse in={isSkillsOpen} animateOpacity>
            <Box mt={4} color={textColor}>
              <Text fontWeight="bold">Front-End Development</Text>
              HTML, CSS, SASS/SCSS, Tailwind, JavaScript, TypeScript, React.js,
              Next.js, React Native
              <br />
              <br />
              <Text fontWeight="bold">Back-End Development</Text>
              Node.js, Express.js, Python, RESTful APIs, GraphQL
              <br />
              <br />
              <Text fontWeight="bold">Blockchain & Crypto</Text>
              Ethereum, Solidity, Smart Contracts, Web3.js, DApps
              <br />
              <br />
              <Text fontWeight="bold">Tools & Methodologies</Text>
              Agile (Scrum, Kanban), CI/CD, Docker, Git/GitHub, Trello, Jira
              <br />
              <br />
              <Text fontWeight="bold">State Management</Text>
              Redux, Context API
            </Box>
          </Collapse>
        </Box>

        <Divider />

        {/* Education Section */}
        <Box width="100%">
          <HStack justify="space-between" width="100%">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Education
            </Text>
            <Button
              onClick={toggleEdu}
              variant="ghost"
              size="sm"
              color={textColor}
            >
              {isEduOpen ? <FiChevronUp /> : <FiChevronDown />}
            </Button>
          </HStack>
          <Collapse in={isEduOpen} animateOpacity>
            <Box mt={4} color={textColor}>
              <Text fontWeight="bold">Software Engineering | BrainStation</Text>
              <Text>March 2024 · Toronto, Canada</Text>
              <br />
              <Text fontWeight="bold">Real Estate License | OREA College</Text>
              <Text>March 2018 · Toronto, Canada</Text>
            </Box>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
};

export default Resume;
