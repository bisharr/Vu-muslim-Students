// src/pages/AttemptQuiz.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      const docSnap = await getDoc(doc(db, "quizzes", quizId));
      if (docSnap.exists()) setQuiz(docSnap.data());
      else toast.error("Quiz not found");
    };
    fetchQuiz();
  }, [quizId]);

  // Timer
  useEffect(() => {
    if (!quiz) return;
    if (timeLeft === 0) handleNext();
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quiz]);

  const handleNext = () => {
    if (quiz.questions[currentQ].correct === selected) {
      setScore((prev) => prev + quiz.questions[currentQ].marks);
    }
    setSelected(null);
    setTimeLeft(60);
    if (currentQ + 1 < quiz.questions.length) {
      setCurrentQ((prev) => prev + 1);
    } else {
      submitScore();
    }
  };

  const submitScore = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      await setDoc(doc(collection(db, "quizScores")), {
        userId: user.uid,
        quizId,
        score,
        total: quiz.questions.reduce((sum, q) => sum + q.marks, 0),
        timestamp: Timestamp.now(),
      });
      toast.success("Quiz submitted!");
    } catch (err) {
      toast.error("Failed to submit score");
    } finally {
      setSubmitting(false);
    }
  };

  if (!quiz)
    return <p className="text-center mt-10 text-gray-600">Loading quiz...</p>;

  const question = quiz.questions[currentQ];
  const percent = ((currentQ + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        🧠 {quiz.title} (Question {currentQ + 1} of {quiz.questions.length})
      </h1>

      <div className="h-3 bg-gray-200 rounded mb-6">
        <div
          className="h-full bg-blue-600 rounded"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p className="text-lg font-medium mb-4 text-gray-800">{question.text}</p>

      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <label
            key={idx}
            className={`block p-3 border rounded cursor-pointer ${
              selected === idx
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="option"
              value={idx}
              checked={selected === idx}
              onChange={() => setSelected(idx)}
              className="hidden"
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">⏱ {timeLeft}s</span>
        <button
          onClick={handleNext}
          disabled={selected === null || submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {currentQ + 1 === quiz.questions.length ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default AttemptQuiz;
