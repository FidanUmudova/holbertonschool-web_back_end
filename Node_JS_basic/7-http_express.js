const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

// countStudents funksiyasını birbaşa 3-cü tapşırıqdakı kimi yazırıq ki, kənar fayla toxunulmasın
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const students = data
        .trim()
        .split('\n')
        .slice(1);

      const fields = {};

      students.forEach((student) => {
        const studentInfo = student.split(',');
        const firstName = studentInfo[0];
        const field = studentInfo[studentInfo.length - 1];

        if (firstName && field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
        }
      });

      let output = `Number of students: ${students.length}`;
      Object.keys(fields).forEach((field) => {
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      });

      resolve(output);
    });
  });
}

// Route for root /
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route for /students
app.get('/students', async (req, res) => {
  const dbFile = process.argv[2];
  const responseText = 'This is the list of our students';

  try {
    const studentData = await countStudents(dbFile);
    res.send(`${responseText}\n${studentData}`);
  } catch (error) {
    res.send(`${responseText}\nCannot load the database`);
  }
});

// Start listening on port 1245
app.listen(port);

module.exports = app;
