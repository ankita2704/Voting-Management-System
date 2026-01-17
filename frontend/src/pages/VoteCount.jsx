import { useEffect, useState } from "react";
import "../styles/votecount.css";

function VoteCount() {
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVoteCount = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/candidate/vote/count", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setVotes(data);
        } else {
          setError(data.message || "Failed to load vote count");
        }
      } catch (err) {
        setError("Server not reachable");
      }
    };

    fetchVoteCount();
  }, []);

  return (
    <div className="vote-count-wrapper">
      <h2 className="page-heading">Vote Count</h2>

      {error && <p className="error-text">{error}</p>}

      <table className="vote-table">
        <thead>
          <tr>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {votes.map((item, index) => (
            <tr key={index}>
              <td>{item.party}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VoteCount;
