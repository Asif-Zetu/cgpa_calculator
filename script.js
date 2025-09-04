const gradePoints = {
  "A+": 4.0,
  A: 3.75,
  "A-": 3.5,
  "B+": 3.25,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.25,
  D: 2.0,
  F: 0.0,
};

function addCourse() {
  const tableBody = document.querySelector("#courseTable tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" placeholder="Course Name"></td>
    <td>
      <select onchange="updatePoints(this)">
        ${Object.keys(gradePoints)
          .map((g) => `<option value="${g}">${g}</option>`)
          .join("")}
      </select>
    </td>
    <td><input type="number" min="0" value="3" onchange="updatePoints(this)"></td>
    <td class="points">0.00</td>
    <td><button class="remove-btn" onclick="removeCourse(this)">Remove</button></td>
  `;

  tableBody.appendChild(row);
  updatePoints(row);
}

function removeCourse(button) {
  const row = button.parentElement.parentElement;
  row.remove();
  calculateCGPA();
}

function updatePoints(element) {
  const row = element.closest("tr");
  const grade = row.querySelector("select").value;
  const credit =
    parseFloat(row.querySelector("input[type='number']").value) || 0;
  const pointsCell = row.querySelector(".points");
  const points = (gradePoints[grade] * credit).toFixed(2);
  pointsCell.textContent = points;
}

function calculateCGPA() {
  const rows = document.querySelectorAll("#courseTable tbody tr");
  let totalCredits = 0;
  let totalPoints = 0;

  rows.forEach((row) => {
    const credit =
      parseFloat(row.querySelector("input[type='number']").value) || 0;
    const points = parseFloat(row.querySelector(".points").textContent) || 0;
    totalCredits += credit;
    totalPoints += points;
  });

  const cgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
  document.getElementById("cgpaResult").textContent = `CGPA: ${cgpa}`;
}

for (let i = 0; i < 6; i++) {
  addCourse();
}
