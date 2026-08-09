import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(request, response) {
    const databaseFile = process.argv[2];
    try {
      const students = await readDatabase(databaseFile);
      let output = 'This is the list of our students';

      const sortedFields = Object.keys(students).sort((a, b) => a.localeCompare(a, 'en', { sensitivity: 'accent' }));
      
      // Sort case-insensitively alphabetically by field name
      const sortedKeys = Object.keys(students).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      for (const field of sortedKeys) {
        output += `\nNumber of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`;
      }

      response.status(200).send(output);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const databaseFile = process.argv[2];
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase(databaseFile);
      const fieldStudents = students[major] || [];
      response.status(200).send(`List: ${fieldStudents.join(', ')}`);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
}

export default StudentsController;
