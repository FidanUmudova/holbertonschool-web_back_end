const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n');
      const validLines = lines.filter((line) => line.trim() !== '');

      if (validLines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const students = validLines.slice(1);
      const totalMsg = `Number of students: ${students.length}`;

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

      let output = [totalMsg];
      Object.keys(fields).forEach((field) => {
        const fieldMsg = `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        output.push(fieldMsg);
      });

      resolve(output.join('\n'));
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const dbFile = process.argv[2];
  
  try {
    const studentData = await countStudents(dbFile);
    res.send(`This is the list of our students\n${studentData}`);
  } catch (error) {
    res.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(port);

module.exports = app;
