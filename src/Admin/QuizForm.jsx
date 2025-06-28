// Step 1: Quiz structure in Firestore (we'll store quizzes as documents)
/*
Firestore collection: "quizzes"
Each document structure:
{
  title: "Seerah Quiz",
  questions: [
    {
      question: "Who was the first person to accept Islam?",
      options: ["Abu Bakr", "Ali", "Khadijah", "Umar"],
      answer: "Khadijah",
      marks: 2
    },
    ...
  ],
  createdAt: Timestamp,
  createdBy: userId
}
*/

// Step 2: Create QuizForm.jsx (Admin-only UI for creating quizzes)
import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const QuizForm = () => {
  const { user, userRole } = useAuth();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
      marks: 1,
    },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "question" || field === "answer" || field === "marks") {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
        marks: 1,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || userRole !== "admin") return toast.error("Unauthorized");
    try {
      await addDoc(collection(db, "quizzes"), {
        title,
        questions,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      });
      toast.success("Quiz created successfully");
      setTitle("");
      setQuestions([
        { question: "", options: ["", "", "", ""], answer: "", marks: 1 },
      ]);
    } catch (err) {
      toast.error("Error saving quiz");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">📘 Create a New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Quiz Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {questions.map((q, i) => (
          <div key={i} className="border p-3 rounded bg-white">
            <input
              type="text"
              placeholder={`Question ${i + 1}`}
              className="w-full p-2 mb-2 border rounded"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(i, "question", e.target.value)
              }
              required
            />
            {q.options.map((opt, j) => (
              <input
                key={j}
                type="text"
                placeholder={`Option ${j + 1}`}
                className="w-full p-2 mb-2 border rounded"
                value={opt}
                onChange={(e) => handleQuestionChange(i, j, e.target.value)}
                required
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              className="w-full p-2 mb-2 border rounded"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(i, "answer", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Marks"
              className="w-full p-2 mb-2 border rounded"
              value={q.marks}
              onChange={(e) =>
                handleQuestionChange(i, "marks", Number(e.target.value))
              }
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          ➕ Add Question
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ✅ Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
