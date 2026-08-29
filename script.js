const studentName = document.getElementById("studentName");
const course = document.getElementById("course");
const score = document.getElementById("score");
const addStudent = document.getElementById("addStudent");
const container = document.getElementById("container");
const button = document.getElementById("delete");

let students = [];
let savedStudents = JSON.parse(localStorage.getItem("students"));
if (savedStudents !== null) {
  students = savedStudents;
} else {
  students = [];
}
console.log(students);

addStudent.addEventListener("click", () => {
  if (studentName.value == "") {
    return;
  } else if (course.value == "") {
    return;
  } else if (score.value == "") {
    return;
  }

  const student = {
    name: studentName.value,
    course: course.value,
    score: parseInt(score.value),
  };

  if(currentEditedStudent !== null){
students[currentEditedStudent].name = studentName.value;
students[currentEditedStudent].course = course.value;
students[currentEditedStudent].score = parseInt(score.value);

  }else {
    students.push(student)
  };
  localStorage.setItem("students", JSON.stringify(students));
  currentEditedStudent = null;

  studentName.value = "";
  course.value = "";
  score.value = "";

  displayStudentsDetails();

});

  function displayStudentsDetails() {
    container.innerHTML = "";

 students.forEach((student, index) =>  {
      const result = document.createElement("p");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
studentName.value = student.name;
course.value = student.course;
score.value = student.score;
currentEditedStudent = index;

addStudent.textContent = "Update Student";


      })

      deleteButton.addEventListener("click", () => {
      students.splice(index, 1)
      localStorage.setItem("students", JSON.stringify(students));
      displayStudentsDetails();
         })

      if (student.score >= 70) {
        result.textContent = `${student.name} | ${student.course} | ${student.score} | Excellent`;
      } else if (student.score >= 50) {
        result.textContent = `${student.name} | ${student.course} | ${student.score} | Passed`;
      } else {
        result.textContent = `${student.name} | ${student.course} | ${student.score} | Failed`;
      }
      container.appendChild(result);
      result.appendChild(deleteButton);
      result.appendChild(editButton);
    })
  };
  currentEditedStudent = null;
  displayStudentsDetails()



//STEPS
//get the id's or the class names
//assign the general(students) to an empty array
//make the button clickable
//add the if statement, to check whether the inputs are empty in order not to display anything
//create a variable and get the values of each students input in objects
//remember to parse the score to an integer
//then push those contents to the students arrays
//HOW TO DISPLAY THE STUDENT'S VALUES INSIDE THE CONTAINER
//set the container's innerHTML to empty string(meaning to remove all that's currently inside the container)
//create a variable and create an element inside it(just like h3,p)
//create a for loop( for const student of students)
//then comes the if and else statement to check the performance of each students to know the grade to award to each
//check their grades, if the grade is > or is < then the variable which you created an element inside it should take
//the text content of the statement(student name, course, score and their remark whether failed or passed)
//separate them with |
//then the container should appendChild the variable result
//then also set the input value to an empty string thereby making it return all over to start afresh,
//having stored the first info entered into the container