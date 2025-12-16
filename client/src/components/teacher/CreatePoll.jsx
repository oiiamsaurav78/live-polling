import { useState } from "react";
import { usePoll } from "../../context/PollContext";
import "../../styles/CreatePoll.css";

const CreatePoll = () => {
  const { socket, pollState } = usePoll();

  const [question, setQuestion] = useState("");
  const [duration, setDuration] = useState(60);

  // ✅ Each option has text + isCorrect (YES / NO)
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);

  const addOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const updateOptionText = (index, value) => {
    const copy = [...options];
    copy[index].text = value;
    setOptions(copy);
  };

  const setCorrectValue = (index, value) => {
    const copy = [...options];
    copy[index].isCorrect = value;
    setOptions(copy);
  };

  const createPoll = () => {
    if (!question.trim()) return;

    socket.emit("create_poll", {
      question,
      options,
      duration
    });

    setQuestion("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false }
    ]);
  };

  if (pollState?.isActive) {
    return <p className="poll-active-text">Poll is active. Wait for it to end.</p>;
  }

  return (
    <div className="create-poll-wrapper">
      <div className="create-poll-container">
        {/* Heading */}
        <h2 className="create-title">Let’s Get Started</h2>
        <p className="create-subtitle">
          You’ll have the ability to create and manage polls, ask questions, and
          monitor your students&apos; responses in real-time.
        </p>

        {/* Card */}
        <div className="create-poll-card">
          {/* Question */}
          {/* Question */}
          <div className="field-group">
            <div className="question-header">
              <label className="field-label">Enter your question</label>

              <select
                className="timer-select"
                value={duration}
                onChange={(e) => setDuration(+e.target.value)}
              >
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
                <option value={90}>90 seconds</option>
              </select>
            </div>

            <textarea
              className="question-input"
              placeholder="Type your question here"
              value={question}
              maxLength={100}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <span className="char-count">{question.length}/100</span>
          </div>


          {/* Options */}
          <div className="options-section">
            <div className="options-header">
              <span>Edit Options</span>
              <span>Is it Correct?</span>
            </div>

            {options.map((opt, index) => (
              <div className="option-row" key={index}>
                <div className="option-left">
                  <span className="option-index">{index + 1}</span>
                  <input
                    className="option-input"
                    placeholder={`Option ${index + 1}`}
                    value={opt.text}
                    onChange={(e) =>
                      updateOptionText(index, e.target.value)
                    }
                  />
                </div>

                {/* ✅ YES / NO (WORKING) */}
                <div className="option-right">
                  <label>
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={opt.isCorrect === true}
                      onChange={() => setCorrectValue(index, true)}
                    />
                    Yes
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={opt.isCorrect === false}
                      onChange={() => setCorrectValue(index, false)}
                    />
                    No
                  </label>
                </div>
              </div>
            ))}

            <button className="add-option-btn" onClick={addOption}>
              + Add more option
            </button>
          </div>

          {/* Footer */}
          <div className="duration-row">


            <button className="ask-btn" onClick={createPoll}>
              Ask Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
