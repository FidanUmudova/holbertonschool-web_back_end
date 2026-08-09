const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
res.status(200).type('text/plain').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
fs.readFile(database, 'utf-8', (err, data) => {
if (err) {
res.status(500).type('text/plain').send('Cannot load the database');
return;
}

```
const students = data
  .trim()
  .split('\n')
  .slice(1);

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

const result = ['This is the list of our students'];

result.push(`Number of students: ${students.length}`);

Object.keys(fields).forEach((field) => {
  result.push(
    `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
  );
});

res.status(200).type('text/plain').send(result.join('\n'));
```

});
});

app.listen(1245);

module.exports = app;
