import { useEffect, useState } from "react";
import "../styles/votelist.css";

const partyLogos = {
  bjp: "/party-logos/BJP logo.png",
  inc: "/party-logos/INC logo.jpg",
  shivsena: "/party-logos/shivsena logo.png",
  sp: "/party-logos/SP logo.jpg",
};

function VoteList() {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/candidate/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch candidates");
        }

       
        setCandidates(data.candidates);

      } catch (err) {
        console.error(err);
        setError("Server error while fetching candidates");
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (candidateId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/candidate/vote/${candidateId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Vote recorded successfully");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error while voting");
    }
  };

  return (
  <div className="vote-wrapper">
    <div className="vote-card">

      <div className="vote-header">
        <h2>List of Electors</h2>

        <div className="app-logo">
          <img src="main logo.jpg" alt="logo" />
          <p>VOTING APP</p>
        </div>
      </div>

      <div className="vote-list">
        {candidates.map((c, index) => (
          <div className="vote-row" key={c._id}>
            <div className="candidate-box">
              <span className="index">{index + 1}.</span>
              <span className="name">{c.name}</span>

              <div className="party-icon">
                <img
  src={partyLogos[c.party.toLowerCase()]}
  alt={c.party}
  className="party-logo"
/>

              </div>
            </div>

            <button
              className="vote-btn"
              onClick={() => handleVote(c._id)}
            >
              Vote
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
);

}

export default VoteList;
