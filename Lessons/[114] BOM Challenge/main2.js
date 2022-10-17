/* 
  Solution Process

  [1] Add Task => submit.onclick
    - if condition
    -- adding function => addTaskToArray(input.value) // insert all input values in array using function
    -- empty input => input.value = "" // after the previous function works empty the input * if we wrote it before the function it will not out put any value because we removed the value before the function process work, Thus we must write it after the function in the end of the condition

  [2] Add Task To Array Using Function => function addTaskToArray(taskText)
    - creating object => const task // insert the data we will loop by it to adding in array
    -- id => id: Date.now(), //unique id for every array element 
    ---- unique id => Date.now() // will give you date of this moment as numbers you can use it as unique id
    -- title => title: taskText, // the taskText(input.value)
    -- completed => completed: false, // the status of the todo line if it's done or not
    
    - creating  array in GLOBAL SCOPE => let arrayOfTasks = []; // this array we will push the taskText(input.value) in it
    -- push the task(the object) into the array arrayOfTasks => arrayOfTasks.push(task) // we use it in array to loop it
    
    - addElementsToPageForm(arrayOfTasks) // using this function to loop the array and create elements to taskDiv container

  [3] Add Tasks To Page Using Function => function addElementsToPageFrom(arrayOfTasks)
    - empty taskDiv => taskDiv.innerHTML = ""; // Before any process this function will remove any content in the elements container in DOM
    - looping arrayOfTasks => arrayOfTasks.forEach((task = (arrayOfTasks))) // will loop the array and create elements to DOM
    
    -- create div => let div = document.createElement("div") // create div to contain the task name and button
    ---- add class to div => div.className = "task" // adding attribute for using it in css
    ---- adding data attribute => div.setAttribute("data-id", task.id) // task.id = relate to forEach((task)) not the object (const task = {})
    ---- append task to div => div.append(document.createTextNode(task.title)) // append object property (title) into div element
    -- completed if condition => if(task.completed) // by default it is if condition is true without writing it 
    ---- add class to div => div.className = "done task" // if it's true (completed) add class "done" it will change the shape using css if adding this class
    
    -- create span = let span => document.createElement("span"); // create this element using it as button
    ---- adding class to span => span.className = "del" // to access from css
    ---- append text to span => span.append(document.createTextNode("Delete")); // button text
    
    -- append span to div => div.append(span) // display span into div 
    -- append div to tasksDiv => tasksDiv.append(div) // display div to task container
*/

let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
console.log(tasksDiv);

// Empty Array To Store The Tasks
// Using of the variable => if the input is not empty the input.value will go to this variable => array
let arrayOfTasks = [];

//[1] Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // add task to array of tasks
    input.value = ""; // Empty input field => after finishing the previous function this code will remove the text from the input
  }
};

//[2] Add Task To Array Using Function
// addTaskToArray(taskText) => addTaskToArray(input.value) =>> input value will have all the process in this function
function addTaskToArray(taskText) {
  // console.log(taskText); // taskText = input.value
  // Task Data
  const task = {
    id: Date.now(), // using Date.now() => professional way to Create a UNIQUE ID
    title: taskText, // the input.value
    completed: false, // by default it's false due to did not add any thing yet
  };
  console.log(task); // testing
  // push task to array of tasks
  // pushing the tesk object into array will contain all object names
  arrayOfTasks.push(task);
  // console.log(arrayOfTasks); // testing
  // [3] Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);

  // Add Tasks To localStorage
  // All process that has done on arrayOfTasks array will import to localStorage
  addDataToLocalStorageFrom(arrayOfTasks);

  // for testing
  console.log(arrayOfTasks);
  // this will be added to localStorage setItem value
  console.log(JSON.stringify(arrayOfTasks));
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Task Div
  tasksDiv.innerHTML = "";
  // Looping on Array Of Tasks
  arrayOfTasks.forEach((task) => {
    //Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    // You Can Use One Of This Two Ways
    // div.innerText = task.title;
    div.append(document.createTextNode(task.title));

    //Check If Task Is Done
    if (task.completed) {
      div.className = "done task";
    }

    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    // You Can Use One Of This Two Ways
    // span.innerText = "Delete";
    span.append(document.createTextNode("Delete"));

    // Append Button To Main Div
    div.append(span);
    console.log(div);
    //Add Task Div To Task Container
    tasksDiv.append(div);
  });
}
console.log(Date.now());

//[4] adding arrayOfTasks to localStorage
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
// this will be save in local storage as a object
// window.localStorage.clear();
