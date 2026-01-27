// Store tasks in an array (state management)
let tasks = [];

// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

/* ===============================
   ADD TASK FUNCTION
   =============================== */
function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    // Add task to array
    tasks.push({ text: taskText, completed: false });

    taskInput.value = "";
    renderTasks();
}

/* ===============================
   RENDER TASKS TO UI
   =============================== */
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        // Create elements safely (no innerHTML strings)
        const li = document.createElement("li");
        const span = document.createElement("span");
        const deleteBtn = document.createElement("span");

        span.textContent = task.text;
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");

        // Mark completed tasks
        if (task.completed) {
            span.classList.add("completed");
        }

        // Toggle completed state
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        });

        // Delete task
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

/* ===============================
   EVENT LISTENERS
   =============================== */

// Button click
addBtn.addEventListener("click", addTask);

// Enter key press
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
