import { useState } from "react";
import { usePoll } from "../context/PollContext";

import StudentJoin from "../components/student/StudentJoin";
import StudentPoll from "../components/student/StudentPoll";
import StudentResult from "../components/student/StudentResult";
import StudentChat from "../components/student/StudentChat";

const StudentPage = () => {
  const { studentName, pollState, results, kicked } = usePoll();
  const [showChat, setShowChat] = useState(false);

  /* 🚫 Kicked out */
  if (kicked) {
    return <h2>You’ve been kicked out</h2>;
  }

  /* 👤 Not joined yet */
  if (!studentName) {
    return <StudentJoin />;
  }

  /* ⏳ Joined but teacher has not started poll */
  if (!pollState || !pollState.isActive) {
    return (
      <>
        <div className="waiting-container">
          <h2>🕒 Please wait</h2>
          <p>Teacher will ask a question soon</p>
        </div>

        {/* Floating chat button */}
        <button
          className="chat-fab"
          onClick={() => setShowChat((prev) => !prev)}
        >
          💬
        </button>

        {/* Chat */}
        {showChat && <StudentChat />}
      </>
    );
  }

  /* 🗳 Poll active OR results */
  return (
    <>
      {!results && <StudentPoll />}
      {results && <StudentResult />}

      {/* Floating chat button */}
      <button
        className="chat-fab"
        onClick={() => setShowChat((prev) => !prev)}
      >
        💬
      </button>

      {/* Chat */}
      {showChat && <StudentChat />}
    </>
  );
};

export default StudentPage;











// import { useState } from "react";
// import { usePoll } from "../context/PollContext";

// import StudentJoin from "../components/student/StudentJoin";
// import StudentPoll from "../components/student/StudentPoll";
// import StudentResult from "../components/student/StudentResult";
// import StudentChat from "../components/student/StudentChat";

// const StudentPage = () => {
//   const { studentName, pollState, results, kicked } = usePoll();
//   const [showChat, setShowChat] = useState(false);

//   if (kicked) {
//     return <h2>You’ve been kicked out</h2>;
//   }

//   // 1️⃣ Student not joined yet
//   if (!studentName) return <StudentJoin />;

//   return (
//     <>
//       {/* Poll / Result */}
//       {!results && <StudentPoll />}
//       {results && <StudentResult />}

//       {/* Floating chat button */}
//       <button
//         className="chat-fab"
//         onClick={() => setShowChat((prev) => !prev)}
//       >
//         💬
//       </button>

//       {/* Chat panel */}
//       {showChat && <StudentChat />}
//     </>
//   );
// };

// export default StudentPage;
