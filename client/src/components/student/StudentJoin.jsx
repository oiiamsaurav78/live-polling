import { useState } from "react";
import { usePoll } from "../../context/PollContext";
import badge from "../../assets/image.png"; // Intervue Poll badge
import "../../styles/StudentJoin.css";

const StudentJoin = () => {
  const { setStudentName, socket } = usePoll();
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!name.trim()) return;
    setStudentName(name);
    socket.emit("join_student", { name });
  };

  return (
    <div className="student-join-wrapper">
      <div className="student-join-container">
        {/* Badge */}
        <img src={badge} alt="Intervue Poll" className="student-badge" />

        {/* Heading */}
        <h2 className="student-title">Let’s Get Started</h2>

        {/* Subtitle (exact Figma text) */}
        <p className="student-subtitle">
          If you’re a student, you’ll be able to{" "}
          <span>submit your answers</span>, participate in live polls, and see
          how your responses compare with your classmates.
        </p>

        {/* Input */}
        <div className="student-input-group">
          <label className="student-label">Enter your Name</label>
          <input
            type="text"
            placeholder="Rahul Bajaj"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Button */}
        <button className="student-continue-btn" onClick={handleJoin}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default StudentJoin;
