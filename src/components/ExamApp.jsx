import React, { useState, useRef } from 'react';
// Create a timer starting from 60 seconds.
// Use useRef() to store the interval ID.
// Add buttons:
//   Start Exam
//   Pause Exam
//   Resume Exam
//   Submit Exam
// When timer reaches 0:
// Auto submit exam.
// Display: Exam Running...
const questions = [
  {
    id: 1,
    question: 'Which hook is used for state management?',
    options: ['useRef', 'useState', 'useEffect', 'useMemo'],
    answer: 'useState',
  },
  {
    id: 2,
    question: 'React is a ____ ?',
    options: ['Database', 'Programming Language', 'Library', 'Browser'],
    answer: 'Library',
  },
  {
    id: 3,
    question: 'Which company developed React?',
    options: ['Google', 'Microsoft', 'Facebook', 'Amazon'],
    answer: 'Facebook',
  },
];

const ExamApp = () => {
  const [currentQtnIndex, setCurrentQtnIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const timer = useRef(null);

  const [timeleft, setTimeleft] = useState(60);
  const [examStarted, setExamStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startTimer = () => {
    if (timer.current !== null) return;
    timer.current = setInterval(() => {
      setTimeleft((prev) => {
        if (prev <= 1) {
          clearInterval(timer.current);
          timer.current = null;
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  const handleStartExam = () => {
    setExamStarted(true);
    setIsPaused(false);
    startTimer();
  };

  const handlePauseExam = () => {
    stopTimer();
    setIsPaused(true);
  };

  const handleResumeExam = () => {
    setIsPaused(false);
    startTimer();
  };

  const handleSubmitExam = () => {
    stopTimer();
    setIsCompleted(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQtnIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption('');

    if (currentQtnIndex + 1 < questions.length) {
      setCurrentQtnIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const getResultStatus = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 50) return 'Good';
    return 'Need Improvement';
  };

  const handleRestart = () => {
    setCurrentQtnIndex(0);
    setSelectedOption('');
    setScore(0);
    setIsCompleted(false);
    stopTimer();
    setTimeleft(60);
    setExamStarted(false);
    setIsPaused(false);
  };

  return (
    <div>
      {!examStarted ? (
        <div>
          <button onClick={handleStartExam}>Start Exam</button>
        </div>
      ) : !isCompleted ? (
        <div>
          <p>Timer : {timeleft} </p>
          <p>{isPaused ? 'Exam Paused' : 'Exam Running'}</p>

          {isPaused ? (
            <button onClick={handleResumeExam}>Resume Exam</button>
          ) : (
            <button onClick={handlePauseExam}>Pause Exam</button>
          )}

          <button onClick={handleSubmitExam}>Submit Exam</button>

          <h3>
            Question {currentQtnIndex + 1} of {questions.length}
          </h3>
          <p>{questions[currentQtnIndex].question}</p>

          <div>
            {questions[currentQtnIndex].options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                {option}
              </label>
            ))}
          </div>

          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            {currentQtnIndex + 1 === questions.length ? 'Finish Exam' : 'Next'}
          </button>
        </div>
      ) : (
        <div>
          <h2>Exam Completed!</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <p>Performance: {getResultStatus()}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default ExamApp;

// 1. Display One Question at a Time
// 2. Select an Answer When user clicks an option:
// Store selected answer using useState
// 3. Next Button
// 4. Score Calculation
// 5. Exam Completion- Exam Completed, Total Score: 3 / 3
// 6. Result status-
// Score ≥ 80%  → Excellent
// Score ≥ 50%  → Good
// Below 50%    → Needs Improvement
// 7. Restart Exam- Button
