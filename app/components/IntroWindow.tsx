"use client";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import MacWindow from "./MacWindow";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaCode, FaRocket, FaUser, FaEnvelope } from "react-icons/fa";

interface IntroWindowProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const slides = [
  {
    emoji: "🙋🏻‍♀️",
    title: "Welcome",
    desc: "Hi, I’m Michelle. Welcome to my macOS-inspired portfolio!",
  },
  {
    emoji: <FaUser />,
    title: "About Me",
    desc: "Full Stack Engineer passionate about React, design systems, and building beautiful apps.",
  },
  {
    emoji: <FaCode />,
    title: "Tech Stack",
    desc: "React, TypeScript, Node.js, Next.js, Chakra UI, SCSS, Firebase, Python — and always learning.",
  },
  {
    emoji: <FaRocket />,
    title: "Projects",
    desc: "Check out the Projects app in the Dock to explore what I’ve built.",
  },
  {
    emoji: <FaEnvelope />,
    title: "Get In Touch",
    desc: "Open the Email app to connect with me.",
  },
];

const MotionBox = motion(Box);

const IntroWindow: React.FC<IntroWindowProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const bg = useColorModeValue("whiteAlpha.700", "blackAlpha.600");
  const textColor = useColorModeValue("gray.900", "gray.100");

  const [activeSlide, setActiveSlide] = useState(0);
  const controls = useAnimation();

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = async (index: number) => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    await controls.start({ x: -index * width });
  };

  useEffect(() => {
    scrollToSlide(activeSlide);
  }, [activeSlide]);

  return (
    <MacWindow
      title="Welcome to My Portfolio"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box
        position="relative"
        overflow="hidden"
        width="100%"
        height="100%"
        ref={containerRef}
        borderRadius="lg"
        bg={bg}
        backdropFilter="blur(12px)"
      >
        {/* Slide Container */}
        <MotionBox
          display="flex"
          height="100%"
          animate={controls}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        >
          {slides.map((slide, i) => (
            <Box
              key={i}
              width="100%"
              height="100%"
              flexShrink={0}
              px={6}
              py={10}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              color={textColor}
            >
              <Box fontSize="5xl" mb={2}>
                {typeof slide.emoji === "string" ? (
                  slide.emoji
                ) : (
                  <Icon as={slide.emoji.type} boxSize={10} />
                )}
              </Box>
              <Text fontSize="3xl" fontWeight="bold" mb={2}>
                {slide.title}
              </Text>
              <Text fontSize="lg" maxW="500px" opacity={0.9}>
                {slide.desc}
              </Text>
            </Box>
          ))}
        </MotionBox>

        {/* Arrows */}
        {activeSlide > 0 && (
          <Button
            position="absolute"
            left="1rem"
            top="50%"
            transform="translateY(-50%)"
            zIndex="10"
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            colorScheme="teal"
            variant="ghost"
            size="md"
          >
            ◀
          </Button>
        )}
        {activeSlide < slides.length - 1 && (
          <Button
            position="absolute"
            right="1rem"
            top="50%"
            transform="translateY(-50%)"
            zIndex="10"
            onClick={() =>
              setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))
            }
            colorScheme="teal"
            variant="ghost"
            size="md"
          >
            ▶
          </Button>
        )}
      </Box>
    </MacWindow>
  );
};

export default IntroWindow;
