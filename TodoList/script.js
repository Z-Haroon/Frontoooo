// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Get tasks from local storage when the page loads
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks initially
renderTasks();

// Add a new task
addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Check if the task already exists
  if (tasks.includes(taskText)) {
    alert("This task already exists!");
    return;
  }

  // Add the task to the list and local storage
  tasks.push(taskText);
  saveTasksToLocalStorage();
  addTaskToDOM(taskText);
  taskInput.value = ""; // Clear the input field
});

// Render all tasks from local storage
function renderTasks() {
  tasks.forEach(function (task) {
    addTaskToDOM(task);
  });
}

// Add a single task to the DOM
function addTaskToDOM(taskText) {
  const li = document.createElement("li");

  // Input for the task text
  const input = document.createElement("input");
  input.type = "text";
  input.value = taskText;
  input.readOnly = true;

  // Edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-btn";

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";

  // Edit functionality
  editButton.addEventListener("click", function () {
    if (input.readOnly) {
      input.readOnly = false;
      input.focus();
      editButton.textContent = "Save";
    } else {
      // Update the task text in local storage
      const index = tasks.indexOf(taskText);
      tasks[index] = input.value.trim();
      saveTasksToLocalStorage();

      input.readOnly = true;
      editButton.textContent = "Edit";
    }
  });

  // Delete functionality
  deleteButton.addEventListener("click", function () {
    const index = tasks.indexOf(taskText);
    tasks.splice(index, 1); // Remove the task from the array
    saveTasksToLocalStorage(); // Update local storage
    taskList.removeChild(li); // Remove the task from the DOM
  });

  // Append elements to the list item
  li.appendChild(input);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
