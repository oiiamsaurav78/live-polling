import { usePoll } from "../../context/PollContext";
import "../../styles/LiveResult.css";

const LiveResults = () => {
  const { pollState, results, askAnotherQuestion } = usePoll();

  if (!pollState || !results) return null;

  // total votes (safe)
  const totalVotes = Object.values(results).reduce(
    (sum, v) => sum + v,
    0
  );

  return (
    <div className="live-results-wrapper">
      <h3 className="live-results-title">Live Results</h3>

      <div className="live-results-card">
        {pollState.options.map((opt, index) => {
          const count = results[index] || 0;
          const percent = totalVotes
            ? Math.round((count / totalVotes) * 100)
            : 0;

          return (
            <div key={index} className="live-result-row">
              {/* Option text + percent */}
              <div className="live-result-header">
                <span className="live-option-text">
                  {opt.text}
                </span>
                <span className="live-percent">
                  {percent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="live-bar">
                <div
                  className="live-bar-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Votes */}
              <span className="live-votes">
                {count} votes
              </span>
            </div>
          );
        })}
      </div>

      {/* Ask another question */}
      <button
        className="ask-another-btn"
        onClick={askAnotherQuestion}
      >
        Ask Another Question
      </button>
    </div>
  );
};

export default LiveResults;
