import { usePoll } from "../../context/PollContext";
import "../../styles/StudentResult.css";

const StudentResult = () => {
  const { pollState, results } = usePoll();

  if (!pollState || !results) return null;

  // calculate total votes safely
  const totalVotes = Object.values(results).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div className="student-result-wrapper">
      <div className="student-result-container">
        <h3 className="result-title">Results</h3>

        {pollState.options.map((opt, index) => {
          const count = results[index] || 0;
          const percent = totalVotes
            ? Math.round((count / totalVotes) * 100)
            : 0;

          return (
            <div
              key={index}
              className={`result-row ${
                opt.isCorrect ? "correct" : "wrong"
              }`}
            >
              <div className="result-header">
                <span className="result-option-text">
                  {opt.text}
                </span>

                <span className="result-icon">
                  {opt.isCorrect ? "✅" : "❌"}
                </span>
              </div>

              <div className="result-bar">
                <div
                  className="result-fill"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <span className="result-count">
                {count} votes ({percent}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentResult;
