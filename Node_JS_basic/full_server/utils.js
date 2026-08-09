import fs from 'fs';

const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n');
      const validLines = lines.filter((line) => line.trim() !== '');

      if (validLines.length <= 1) {
        resolve({});
        return;
      }

      const students = validLines.slice(1);
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

      resolve(fields);
    });
  });
};

export default readDatabase;
