import React, { useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';

const styles = {
  quizContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#111827', // Dark background
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  quizCard: {
    background: '#1F2937', // Darker card background
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    border: '1px solid #374151'
  },
  heading: {
    color: '#F3F4F6',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  question: {
    color: '#E5E7EB',
    fontSize: '1.2rem',
    marginBottom: '1.5rem'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  optionButton: {
    padding: '14px 18px',
    border: '1px solid #374151',
    borderRadius: '8px',
    backgroundColor: '#374151',
    color: '#F3F4F6',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#4B5563'
    }
  },
  selectedOption: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
    color: '#ffffff'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px'
  },
  score: {
    color: '#D1D5DB'
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s'
  },
  disabledButton: {
    backgroundColor: '#374151',
    cursor: 'not-allowed',
    opacity: 0.7
  },
  scoreCard: {
    textAlign: 'center',
    color: '#F3F4F6'
  },
  scoreText: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#F3F4F6'
  },
  percentage: {
    fontSize: '2rem',
    color: '#4F46E5',
    marginBottom: '1.5rem'
  },
  restartButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    margin: '0 auto',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#4338CA'
    }
  }
};

const MCQQuiz = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is the largest mammal?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "White Rhinoceros"],
      correct: 1
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowScore(false);
  };

  if (showScore) {
    return (
      <div style={styles.quizContainer}>
        <div style={styles.quizCard}>
          <div style={styles.scoreCard}>
            <h2 style={styles.scoreText}>Quiz Complete!</h2>
            <p style={styles.percentage}>
              {((score / questions.length) * 100).toFixed(1)}%
            </p>
            <p style={styles.scoreText}>
              You scored {score} out of {questions.length}
            </p>
            <button 
              style={styles.restartButton}
              onClick={handleRestart}
            >
              <RotateCcw size={20} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.quizContainer}>
      <div style={styles.quizCard}>
        <h2 style={styles.heading}>
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <p style={styles.question}>
          {questions[currentQuestion].question}
        </p>
        <div style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              style={{
                ...styles.optionButton,
                ...(selectedAnswer === index ? styles.selectedOption : {}),
                ':hover': {
                  backgroundColor: selectedAnswer === index ? '#4F46E5' : '#4B5563'
                }
              }}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
        <div style={styles.footer}>
          <span style={styles.score}>
            Score: {score}/{currentQuestion}
          </span>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            style={{
              ...styles.nextButton,
              ...(selectedAnswer === null ? styles.disabledButton : {}),
              ':hover': {
                backgroundColor: selectedAnswer === null ? '#374151' : '#4338CA'
              }
            }}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQQuiz;