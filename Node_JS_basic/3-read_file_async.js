const fs = require('fs');

const countStudents = (dataPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const studentLines = lines.filter((line) => line.trim() !== '');

      if (studentLines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const studentRecords = studentLines.slice(1);
      console.log(`Number of students: ${studentRecords.length}`);

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
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }

      resolve();
    });
  });
};

module.exports = countStudents;
