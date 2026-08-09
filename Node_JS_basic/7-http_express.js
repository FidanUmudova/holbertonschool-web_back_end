const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.trim().split('\n');
    const studentLines = lines.filter((line) => line.trim() !== '');

    if (studentLines.length <= 1) {
      resolve('Number of students: 0');
      return;
    }

    const studentRecords = studentLines.slice(1);
    let output = `Number of students: ${studentRecords.length}`;

    const fields = {};

    studentRecords.forEach((line) => {
      const parts = line.split(',');
      if (parts.length >= 4) {
        const firstname = parts[0].trim();
        const field = parts[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    });

    for (const [field, names] of Object.entries(fields)) {
      output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
    }

    resolve(output);
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const databaseFile = process.argv[2];
  let responseText = 'This is the list of our students';
  
  try {
    const studentData = await countStudents(databaseFile);
    res.send(`${responseText}\n${studentData}`);
  } catch (error) {
    res.send(`${responseText}\n${error.message}`);
  }
});

app.listen(port);

module.exports = app;
