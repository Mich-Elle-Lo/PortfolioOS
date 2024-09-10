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
  const { isOpen: isProjOpen, onToggle: toggleProj } = useDisclosure();
  const { isOpen: isSkillsOpen, onToggle: toggleSkills } = useDisclosure();
  const { isOpen: isEduOpen, onToggle: toggleEdu } = useDisclosure();

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box bg={bg} p={6} borderRadius="md" boxShadow="md" w="100%" h="100%">
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
            colorScheme="teal"
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
            <Box mt={4}>
              <Text color={textColor} fontWeight="bold">
                Frontend Developer | MakeitMVP
              </Text>
              <Text color={textColor}>June 2024 - Present</Text>
              <Text color={textColor} mb={4}>
                ● Developing an EdTech skill exchange feature using React with
                TypeScript. <br />
                ● Implementing a marketplace with a token system for
                transactions.
                <br />● Ensuring high performance and compatibility.
              </Text>

              <Text color={textColor} fontWeight="bold">
                Teaching Assistant | BrainStation
              </Text>
              <Text color={textColor}>March 2024 - August 2024</Text>
              <Text color={textColor}>
                ● Mentored students, supported curriculum delivery, and
                conducted code reviews.
                <br />● Marked student work and provided feedback.
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
            <Box mt={4}>
              <Text color={textColor}>
                ● HTML, CSS, SASS, Tailwind <br />
                ● JavaScript, TypeScript <br />
                ● React JS, React Native <br />
                ● Node.js, Express.js <br />
                ● Python <br />
                ● Agile methodologies <br />● Version control (Git)
              </Text>
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
            <Box mt={4}>
              <Text color={textColor} fontWeight="bold">
                BrainStation | Diploma, Software Engineering
              </Text>
              <Text color={textColor}>March 2024</Text>

              <Text color={textColor} fontWeight="bold">
                OREA College | Real Estate License
              </Text>
              <Text color={textColor}>March 2018</Text>
            </Box>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
};

export default Resume;
