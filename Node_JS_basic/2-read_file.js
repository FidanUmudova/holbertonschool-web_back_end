const fs = require('fs');

const countStudents = (dataPath) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    const lines = data.trim().split('\n');
    const studentLines = lines.filter((line) => line.trim() !== '');

    if (studentLines.length <= 1) {
      console.log('Number of students: 0');
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
