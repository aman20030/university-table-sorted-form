import React, { useEffect, useState } from "react";
import axios from "axios";

const UniversityTable = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios
      .get("http://universities.hipolabs.com/search?country=United+States")
      .then((res) => {
        const sortedData = res.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUniversities(sortedData);
      })
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  return (
    <div style={{ padding: "30px", backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "28px", color: "limegreen", marginBottom: "20px" }}>
        Universities in United States
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e1e1e" }}>
        <thead>
          <tr style={{ backgroundColor: "#00aa00", color: "#fff" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Country</th>
            <th style={thStyle}>Domain</th>
            <th style={thStyle}>Website</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((uni, index) => (
            <tr key={index} style={index % 2 === 0 ? rowStyle1 : rowStyle2}>
              <td style={tdStyle}>{uni.name}</td>
              <td style={tdStyle}>{uni.country}</td>
              <td style={tdStyle}>{uni.domains[0]}</td>
              <td style={tdStyle}>
                <a href={uni.web_pages[0]} target="_blank" rel="noreferrer" style={{ color: "#33bbff" }}>
                  Visit Site
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "12px",
  border: "1px solid #444",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #333",
};

const rowStyle1 = {
  backgroundColor: "#222",
};

const rowStyle2 = {
  backgroundColor: "#2a2a2a",
};

export default UniversityTable;
