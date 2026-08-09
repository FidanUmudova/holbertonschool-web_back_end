const express = require('express');
const fs = require('fs');

const app = express();

const database = process.argv[2];

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  fs.readFile(database, 'utf8', (err, data) => {
    if (err) {
      res
        .type('text')
        .status(500)
        .send('Cannot load the database');
      return;
    }

    const lines = data
      .split('\n')
      .filter((line) => line.trim() !== '');

    const students = lines.slice(1);

    const fields = {};

    students.forEach((line) => {
      const student = line.split(',');
      const firstName = student[0];
      const field = student[student.length - 1].trim();

      if (!fields[field]) {
        fields[field] = [];
      }

      fields[field].push(firstName);
    });

    let output = 'This is the list of our students\n';
    output += `Number of students: ${students.length}\n`;

    Object.keys(fields).forEach((field) => {
      output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
    });

    res.type('text').send(output.trim());
  });
});

app.listen(1245);

module.exports = app;
