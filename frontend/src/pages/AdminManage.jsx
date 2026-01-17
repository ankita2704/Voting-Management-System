import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminManage() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");

  const token = localStorage.getItem("token");

  // Fetch candidate list
  const getCandidates = async () => {
    try {
      const res = await fetch("http://localhost:5000/candidate/list");
      const data = await res.json();

      if (res.ok) {
        setCandidates(data.candidates);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  // Add candidate
  const addCandidate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          party: party,
          age: Number(age),
          mobile: mobile,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Candidate added");
        setName("");
        setParty("");
        setAge("");
        setMobile("");
        getCandidates();
      } else {
        alert(data.error || data.message || "Error");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  // Delete candidate
  const deleteCandidate = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/candidate/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert("Candidate deleted");
        getCandidates();
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="admin-wrapper">
      <h2>Admin Manage</h2>

<div className="admin-nav">
  <button onClick={() => navigate("/admin/count")}>Vote Count</button>
</div>

<h2>Admin Manage</h2>

      <form onSubmit={addCandidate} className="admin-form">
        <input
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <input
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <button type="submit">Add</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.party}</td>
              <td>{c.age}</td>
              <td>{c.mobile}</td>
              <td>
                <button onClick={() => deleteCandidate(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManage;
