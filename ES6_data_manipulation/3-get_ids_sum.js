export default function getStudentIdsSum(listStudents) {
  if (!Array.isArray(listStudents)) {
    return 0;
  }
  return listStudents.reduce((accumulator, student) => accumulator + student.id, 0);
}
