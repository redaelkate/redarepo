import React, { useState } from "react";

const challenges = [
  {
    code: `
function mystery(x, y) {
  return x * y + 10;
}
console.log(mystery(3, 4));
    `,
    explanation:
      "This function multiplies two numbers and adds 10 to the result.",
    question: "What will be logged to the console?",
    answer: "22",
  },
  {
    code: `
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((acc, curr) => acc + curr, 0);
console.log(result);
    `,
    explanation:
      "This code uses the reduce method to sum all elements in the array.",
    question: "What will be the final value of 'result'?",
    answer: "15",
  },
];

const CodeCrackingPlatform = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUserName, setNewUserName] = useState("");

  const handleSubmit = () => {
    if (userAnswer.trim() === challenges[currentChallenge].answer) {
      setFeedback("Correct! You earned a point.");
      if (currentUser) {
        setUsers(
          users.map((user) =>
            user.name === currentUser.name
              ? { ...user, score: user.score + 1 }
              : user
          )
        );
        setCurrentUser({ ...currentUser, score: currentUser.score + 1 });
      }
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setUserAnswer("");
      setFeedback("");
    } else {
      setFeedback("You have completed all challenges!");
    }
  };

  const registerUser = () => {
    if (newUserName.trim() !== "") {
      const newUser = { name: newUserName, score: 0 };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setNewUserName("");
    }
  };

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  if (!currentUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Register to Play</h2>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter your name"
            style={{ marginBottom: "10px", width: "100%", padding: "5px" }}
          />
          <button
            onClick={registerUser}
            style={{ width: "100%", padding: "5px" }}
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Left side: Questions and Answers */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <h2>Code Cracking Challenge</h2>
        <p>Welcome, {currentUser.name}!</p>
        <pre
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {challenges[currentChallenge].code}
        </pre>
        <p>
          <strong>Explanation:</strong>{" "}
          {challenges[currentChallenge].explanation}
        </p>
        <p>
          <strong>Question:</strong> {challenges[currentChallenge].question}
        </p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          style={{ marginBottom: "10px", width: "100%", padding: "5px" }}
        />
        <button
          onClick={handleSubmit}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          Submit Answer
        </button>
        <button onClick={nextChallenge} style={{ padding: "5px" }}>
          Next Challenge
        </button>
        <p>{feedback}</p>
        <p>Your Score: {currentUser.score}</p>
      </div>

      {/* Right side: Ranking */}
      <div
        style={{
          width: "300px",
          padding: "20px",
          backgroundColor: "white",
          overflowY: "auto",
        }}
      >
        <h3>Ranking</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Rank</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.name} style={{ borderBottom: "1px solid #eee" }}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeCrackingPlatform;
