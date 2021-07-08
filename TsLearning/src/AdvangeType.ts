// EXPLICIT TYPES



// ANY TYPE



// ALIAS TYPE
type stringOrNumber = string | number;
type students = {
    name: string,
    id: stringOrNumber
};

const studentDetails = (name: string, id: stringOrNumber):void => {
console.log(`student ${name} has id ${id}`);

}
studentDetails("anhthu", 123);

const greatStudents = (student: students) => console.log(`${student.name} with id ${student.id}`);
