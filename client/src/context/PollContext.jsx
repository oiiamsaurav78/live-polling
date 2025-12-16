import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";

const PollContext = createContext();

export const PollProvider = ({ children }) => {
  /* ---------- ROLE ---------- */
  const [role, setRole] = useState(null);

  /* ---------- STUDENT ---------- */
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState(null);
  const [kicked, setKicked] = useState(false);

  /* ---------- POLL ---------- */
  const [pollState, setPollState] = useState(null);
  const [results, setResults] = useState(null);
  const [pollHistory, setPollHistory] = useState([]);

  /* ---------- REALTIME ---------- */
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [studentQuestions, setStudentQuestions] = useState([]);

  /* ---------- ACTIONS ---------- */
  const askAnotherQuestion = () => {
    setPollState(null);
    setResults(null);
    // pollHistory intentionally NOT cleared
    // socket.emit("teacher_ready_for_new_poll"); // optional later
  };

  useEffect(() => {
    /* ===== POLL ===== */

    socket.on("poll_started", (data) => {
      setPollState(data);
      setResults(null);
    });

    socket.on("poll_update", (answers) => {
      setPollState((prev) =>
        prev ? { ...prev, answers } : prev
      );
    });

    socket.on("poll_ended", ({ results, correctOption }) => {
      setResults(results);

      setPollState((prev) => {
        if (!prev) return prev;

        // save to history
        setPollHistory((h) => [
          ...h,
          { question: prev.question }
        ]);

        return { ...prev, correctOption };
      });
    });

    /* ===== STUDENT ===== */

    socket.on("joined_success", ({ studentId, pollState }) => {
      setStudentId(studentId);
      setPollState(pollState);
      setKicked(false);
    });

    socket.on("kicked", () => {
      setKicked(true);
    });

    socket.on("student_list", (list) => {
      setStudents(list);
    });

    /* ===== CHAT ===== */

    socket.on("chat_update", (msgs) => {
      setMessages(msgs);
    });

    socket.on("student_questions_update", (questions) => {
      setStudentQuestions(questions);
    });

    /* ===== CLEANUP ===== */
    return () => {
      socket.off("poll_started");
      socket.off("poll_update");
      socket.off("poll_ended");
      socket.off("joined_success");
      socket.off("kicked");
      socket.off("student_list");
      socket.off("chat_update");
      socket.off("student_questions_update");
    };
  }, []);

  return (
    <PollContext.Provider
      value={{
        /* role */
        role,
        setRole,

        /* student */
        studentName,
        setStudentName,
        studentId,
        kicked,

        /* poll */
        pollState,
        results,
        pollHistory,
        askAnotherQuestion,

        /* realtime */
        students,
        messages,
        studentQuestions,

        /* socket */
        socket
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export const usePoll = () => useContext(PollContext);
