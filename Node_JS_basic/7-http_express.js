const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
fs.readFile(database, 'utf8', (err, data) => {
if (err) {
res.status(500).send('Cannot load the database');
return;
}

```
const lines = data
  .trim()
  .split('\n');

const students = lines.slice(1);
const fields = {};

students.forEach((student) => {
  const studentInfo = student.split(',');
  const firstName = studentInfo[0];
  const field = studentInfo[3];

  if (!fields[field]) {
    fields[field] = [];
  }

  fields[field].push(firstName);
});

let result = 'This is the list of our students\n';
result += `Number of students: ${students.length}\n`;

Object.keys(fields).forEach((field) => {
  result += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
});

res.send(result);
```

});
});

app.listen(1245);

module.exports = app;
