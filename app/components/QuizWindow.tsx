import { useState, useEffect } from "react";
import { Box, Button, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MacWindow from "./MacWindow";
import quizQuestions from "../data/quizQuestions.json";

interface QuizWindowProps {
  onClose: () => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
}

const QuizWindow: React.FC<QuizWindowProps> = ({
  onClose,
  initialX,
  initialY,
  zIndex,
  onClick,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const question = quizQuestions[currentQuestionIndex];

  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === question.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowHint(false);
    setIsAnswerCorrect(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz finished! Your score is ${score}/${quizQuestions.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  const answerAnimation = {
    initial: { scale: 1 },
    correct: { scale: 1.1, backgroundColor: "#38A169" },
    incorrect: { scale: 1.1, backgroundColor: "#E53E3E" },
  };

  return (
    <MacWindow
      title="Test Your Knowledge!"
      onClose={onClose}
      onClick={onClick}
      zIndex={zIndex}
      initialX={initialX}
      initialY={initialY}
    >
      <Box
        bg={bg}
        p="4"
        borderRadius="md"
        boxShadow="md"
        width="100%"
        height="100%"
      >
        <Text fontSize="xl" fontWeight="bold" mb="4" color={textColor}>
          {question.question}
        </Text>
        <Flex direction="column" gap="2">
          {question.choices.map((choice, index) => (
            <motion.div
              key={index}
              initial="initial"
              animate={
                selectedAnswer === index
                  ? isAnswerCorrect
                    ? "correct"
                    : "incorrect"
                  : "initial"
              }
              variants={answerAnimation}
            >
              <Button
                onClick={() => handleAnswerClick(index)}
                isDisabled={selectedAnswer !== null}
                colorScheme="blue"
                variant={selectedAnswer === index ? "solid" : "outline"}
                width="100%"
              >
                {choice}
              </Button>
            </motion.div>
          ))}
        </Flex>
        {selectedAnswer !== null && !isAnswerCorrect && (
          <Text color="red.500" mt="2">
            Incorrect! {showHint && `Hint: ${question.hint}`}
          </Text>
        )}
        <Flex justify="space-between" mt="4">
          <Button
            onClick={handleHintClick}
            colorScheme="yellow"
            isDisabled={showHint || selectedAnswer !== null}
          >
            Show Hint
          </Button>
          <Button
            onClick={handleNextQuestion}
            colorScheme="green"
            isDisabled={selectedAnswer === null}
          >
            Next Question
          </Button>
        </Flex>
        <Text mt="4" color={textColor}>
          Score: {score}/{quizQuestions.length}
        </Text>
      </Box>
    </MacWindow>
  );
};

export default QuizWindow;
