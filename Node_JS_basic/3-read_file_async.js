const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .toString()
        .split('\n')
        .filter((line) => line.trim() !== '');

      const students = lines.slice(1);
      console.log(`Number of students: ${students.length}`);

      const fields = {};

      students.forEach((line) => {
        const student = line.split(',');
        const firstName = student[0];
        const field = student[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstName);
      });

      Object.keys(fields).forEach((field) => {
        console.log(
          `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
        );
      });

      resolve();
    });
  });
}

module.exports = countStudents;
