import { usePoll } from "../../context/PollContext";
import "../../styles/StudentList.css";

const StudentList = ({ onChatClick }) => {
  const { students, socket } = usePoll();

  const kickStudent = (socketId) => {
    socket.emit("kick_student", socketId);
  };

  return (
    <div className="student-list-wrapper">
      {/* Header */}
      <div className="student-list-header">
        <h4>Participants</h4>

        {/* Chat Button */}
        <button className="chat-btn" onClick={onChatClick}>
          💬 Chat
        </button>
      </div>

      {/* Empty State */}
      {!students || students.length === 0 ? (
        <p className="no-students">No students connected.</p>
      ) : (
        <div className="student-list">
          {students.map((s) => (
            <div key={s.socketId} className="student-row">
              <span className="student-name">{s.name}</span>

              <button
                className="kick-btn"
                onClick={() => kickStudent(s.socketId)}
              >
                Kick out
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
