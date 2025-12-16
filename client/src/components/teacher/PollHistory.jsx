import { usePoll } from "../../context/PollContext";
import "../../styles/PollHistory.css";

const PollHistory = ({ onClose }) => {
  const { pollHistory } = usePoll();
  
  // If no history → don't render 
  if (!Array.isArray(pollHistory) || pollHistory.length === 0) {
    return null;
  }

  return (
    <div className="poll-history-overlay">
      <div className="poll-history-modal">
        {/* Header */}
        <div className="poll-history-header">
          <h3>Poll History</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="poll-history-content">
          {pollHistory.map((poll, index) => {
            if (!poll || !poll.question) return null;

            const options = Array.isArray(poll.options)
              ? poll.options
              : [];

            return (
              <div key={index} className="poll-history-item">
                <p className="poll-question">
                  {poll.question}
                </p>

                {options.length === 0 ? (
                  <p className="no-options">
                    No options available
                  </p>
                ) : (
                  options.map((opt, idx) => (
                    <div key={idx} className="poll-option">
                      • {typeof opt === "string" ? opt : opt.text}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PollHistory;
