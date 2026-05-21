import { useEffect, useState } from "react";
import { getAllStudents } from "../api/api";

function AllocateSeatsPage() {
  const [students, setStudents] = useState([]);
  const [seats, setSeats] = useState([]);

  // Load students from backend
  useEffect(() => {
    getAllStudents()
      .then((res) => {
        console.log("STUDENTS:", res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);

        // 🔥 Fallback dummy data (for testing)
        setStudents([
          { name: "Ravi" },
          { name: "Ramesh" },
          { name: "Suresh" },
        ]);
      });
  }, []);

  // Allocate seats
  const handleAllocate = () => {
    console.log("Allocate button clicked");

    let seatNumber = 1;

    const allocated = students.map((student) => ({
      ...student,
      hall: "Hall A",
      seat: seatNumber++,
    }));

    setSeats(allocated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🪑 Allocate Seats</h1>

      <button onClick={handleAllocate}>
        Allocate Seats
      </button>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hall</th>
            <th>Seat</th>
          </tr>
        </thead>

        <tbody>
          {seats.length > 0 ? (
            seats.map((s, index) => (
              <tr key={index}>
                <td>{s.name || s.email || "No Name"}</td>
                <td>{s.hall}</td>
                <td>{s.seat}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data yet. Click "Allocate Seats"</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllocateSeatsPage;