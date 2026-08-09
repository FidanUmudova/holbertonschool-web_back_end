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

```
const lines = data
  .split('\n')
  .filter((line) => line.trim() !== '');

const studentRecords = lines.slice(1);

let output = `Number of students: ${studentRecords.length}`;
const fields = {};

studentRecords.forEach((line) => {
  const parts = line.split(',');
  const firstname = parts[0].trim();
  const field = parts[3].trim();

  if (!fields[field]) {
    fields[field] = [];
  }

  fields[field].push(firstname);
});

for (const [field, names] of Object.entries(fields)) {
  output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
}

resolve(output);
```

});
});

app.get('/', (req, res) => {
res.type('text/plain').send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
const databaseFile = process.argv[2];

try {
const studentData = await countStudents(databaseFile);
res.type('text/plain').send(`This is the list of our students\n${studentData}`);
} catch (error) {
res.status(500).type('text/plain').send(error.message);
}
});

app.listen(port);

module.exports = app;
