export default function updateStudentGradeByCity(listStudents, city, newGrades) {
  if (!Array.isArray(listStudents)) {
    return [];
  }

  const grades = Array.isArray(newGrades) ? newGrades : [];

  return listStudents
    .filter((student) => student.location === city)
    .map((student) => {
      const gradeObj = grades.find((grade) => grade.studentId === student.id);
      return {
        ...student,
        grade: gradeObj ? gradeObj.grade : 'N/A',
      };
    });
}
