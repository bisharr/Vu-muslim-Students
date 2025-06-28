// src/pages/IslamicQuiz.jsx
import { useState, useEffect } from "react";

const questions = [
  {
    question: "What was the name of the Prophet Muhammad's (PBUH) mother?",
    options: ["Khadijah", "Fatimah", "Aminah", "Aisha"],
    answer: "Aminah",
    marks: 5,
  },
  {
    question: "Where was the Prophet Muhammad (PBUH) born?",
    options: ["Madinah", "Taif", "Jerusalem", "Makkah"],
    answer: "Makkah",
    marks: 5,
  },
  {
    question: "What is the first month in the Islamic calendar?",
    options: ["Ramadan", "Muharram", "Dhul-Hijjah", "Safar"],
    answer: "Muharram",
    marks: 5,
  },
];

function IslamicQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // seconds per question
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedOption === questions[currentIndex].answer) {
      setScore(score + questions[currentIndex].marks);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setTimeLeft(20);
      setProgress((nextIndex / questions.length) * 100);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(20);
    setProgress(0);
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-blue-50">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          🧠 Quiz Completed
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Your Score: {score} / {questions.reduce((a, q) => a + q.marks, 0)}
        </p>
        <button
          onClick={resetQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-700">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <span className="text-sm text-red-500">⏱ {timeLeft}s</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {currentQuestion.question}
        </h3>
        <ul className="space-y-3">
          {currentQuestion.options.map((option, i) => (
            <li key={i}>
              <button
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                  selectedOption === option
                    ? "bg-blue-100 border-blue-600 text-blue-800"
                    : "bg-gray-50 border-gray-300 hover:bg-blue-50"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
        >
          {currentIndex === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default IslamicQuiz;
