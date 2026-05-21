import { useState } from "react";
import axios from "axios";

function UploadPage() {
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const rows = lines.slice(1);

      const data = rows.map((row) => {
        const [
          studentId,
          name,
          rollNumber,
          department,
          email,
          password,
          hall,
          seat,
        ] = row.split(",").map((value) => value.trim());

        return {
          studentId,
          name,
          rollNumber,
          department,
          email,
          password,
          hall,
          seat: seat ? Number(seat) : null,
        };
      });

      setStudents(data);
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (students.length === 0) {
      alert("Please choose a CSV file first");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students", students);
      alert("Uploaded successfully");
      setStudents([]);
      setFileName("");
    } catch (err) {
      console.log(err);
      alert("Upload failed. Check duplicate email/studentId or missing fields.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Students</h1>
      <p>Upload a CSV file with student login details.</p>

      <pre style={{ background: "#f5f5f5", padding: "12px", overflowX: "auto" }}>
{`studentId,name,rollNumber,department,email,password,hall,seat
STU001,Rahul Kumar,21CS001,CSE,rahul@gmail.com,student123,Hall A,12
STU002,Priya Sharma,21CS002,CSE,priya@gmail.com,student456,Hall A,13`}
      </pre>

      <input type="file" accept=".csv" onChange={handleFile} />

      <br />
      <br />

      {fileName && <p>Selected file: {fileName}</p>}

      {students.length > 0 && (
        <>
          <h2>Preview</h2>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Department</th>
                <th>Email</th>
                <th>Password</th>
                <th>Hall</th>
                <th>Seat</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.department}</td>
                  <td>{student.email}</td>
                  <td>{student.password}</td>
                  <td>{student.hall}</td>
                  <td>{student.seat}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
        </>
      )}

      <button onClick={handleUpload}>Save Students to Database</button>
    </div>
  );
}

export default UploadPage;
