const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

// Helper function to read and parse the database asynchronously
const countStudents = (dataPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n');
      // Filter out empty lines or lines with only whitespace
      const validLines = lines.filter((line) => line.trim() !== '');

      if (validLines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      // Header is the first line
      const studentRows = validLines.slice(1);
      const totalStudents = studentRows.length;

      const fields = {};
      studentRows.forEach((row) => {
        const studentRecord = row.split(',');
        const firstName = studentRecord[0];
        const field = studentRecord[3];

        if (firstName && field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
        }
      });

      let output = `Number of students: ${totalStudents}`;
      for (const [field, students] of Object.entries(fields)) {
        output += `\nNumber of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
      }

      resolve(output);
    });
  });
};

// Route for root /
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route for /students
app.get('/students', async (req, res) => {
  const dbFile = process.argv[2];
  
  let responseText = 'This is the list of our students';

  try {
    const studentData = await countStudents(dbFile);
    res.send(`${responseText}\n${studentData}`);
  } catch (error) {
    res.send(`${responseText}\nCannot load the database`);
  }
});

// Start listening on port 1245
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export the app variable
module.exports = app;
