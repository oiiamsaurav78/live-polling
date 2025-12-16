const ProgressBar = ({ value }) => {
  return (
    <div style={{ background: "#eee", borderRadius: "10px" }}>
      <div
        style={{
          width: `${value}%`,
          background: "#6f6ce8",
          color: "white",
          padding: "6px",
          borderRadius: "10px"
        }}
      >
        {value}%
      </div>
    </div>
  );
};

export default ProgressBar;
