const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

// 1. ✅ Initiale task array from localStorage
// If no tasks are found, initialize an empty array
let tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];

// 🔸 Render existing tasks when page reloads
window.addEventListener("DOMContentLoaded", () => {
  tasksArray.forEach((task) => renderTask(task));
  updateTaskStats();
});

function renderTask(taskData) {
  const { id, text, date, priority, completed } = taskData;

  // add task
  const taskItem = document.createElement("li");
  taskItem.setAttribute("data-status", completed ? "completed" : "pending");
  taskItem.setAttribute("data-priority", priority);

  taskItem.className =
    "flex justify-between items-center rounded-md p-4  border border-gray-400";

  // 🔸 Task layout
  taskItem.innerHTML = `
  <div>
    <input type="checkbox" class="mr-2" ${completed ? "checked" : ""}/>
    <span class="task-text font-semibold ${
      completed ? "line-through text-gray" : ""
    }">${text}</span>
    <span class="ml-4 text-sm text-gray-400">${date}</span>
    <span class="ml-2 text-xs px-2 py-1 rounded-full ${
      priority === "urgent"
        ? "bg-red-400 text-white"
        : priority === "high"
        ? "bg-orange-400 text-white"
        : priority === "medium"
        ? "bg-yellow-300 text-black"
        : "bg-green-300 text-black"
    }">${priority}</span>
  </div>
  <div class="space-x-2">
      <button class="edit-btn text-blue-500 hover:underline">Edit</button>
      <button class="delete-btn text-red-500 hover:underline">Delete</button>
  </div>`;

  // Append task to the list
  taskList.appendChild(taskItem);

  // ✅ Event: Delete Task
  const deleteBtn = taskItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskItem.remove();

    tasksArray = tasksArray.filter((task) => task.id !== id);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    updateTaskStats();
  });

  // ✅ Event: Edit Task
  const editBtn = taskItem.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    const newText = prompt("Enter new text");
    if (newText && newText.trim() !== "") {
      taskData.text = newText.trim();
      taskItem.querySelector(".task-text").textContent = taskData.text;
      localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

      updateTaskStats();
    }
  });

  // ✅ Event: Complete Task
  const checkbox = taskItem.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => {
    taskData.completed = checkbox.checked;
    const taskText = taskItem.querySelector(".task-text");
    taskText.classList.toggle("line-through", checkbox.checked);
    taskText.classList.toggle("text-gray-400", checkbox.checked);
    taskItem.setAttribute(
      "data-status",
      checkbox.checked ? "completed" : "pending"
    );
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    updateTaskStats();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = taskInput.value.trim();
  const date = taskDate.value;
  const priority = taskPriority.value;

  const taskData = {
    id: Date.now(), // Unique ID based on timestamp
    text: text,
    date: date,
    priority: priority,
    completed: false, // Default to not completed
  };

  if (text === "" || date === "" || priority === "") {
    alert("Please fill out all the fiedls");
    return;
  }

  // push task to array
  tasksArray.push(taskData);
  // Save tasks to localStorage
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
  renderTask(taskData);

  form.reset();
  updateTaskStats();
});

//update total completed pending and high priority tasks
function updateTaskStats() {
  const totalTasksElement = document.getElementById("total-tasks");
  const completedTasksElement = document.getElementById("completed-tasks");
  const pendingTasksElement = document.getElementById("pending-tasks");
  const highPriorityElement = document.getElementById("high-priority");

  const allTask = document.querySelectorAll("#task-list li");
  const allCheckBoxes = document.querySelectorAll(
    "#task-list input[type='checkbox']"
  );
  const allPriorityLabel = document.querySelectorAll("#task-list span");

  let total = allTask.length;
  let completed = 0;
  let highPriority = 0;

  allCheckBoxes.forEach((chechbox) => {
    if (chechbox.checked) {
      completed++;
    }
  });

  allPriorityLabel.forEach((priority) => {
    if (priority.textContent.trim().toLowerCase() === "high") {
      highPriority++;
    }
  });

  const pending = total - completed;

  totalTasksElement.textContent = total;
  completedTasksElement.textContent = completed;
  pendingTasksElement.textContent = pending;
  highPriorityElement.textContent = highPriority;
}

// 2. ✅ Filter logic
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    const tasks = document.querySelectorAll("#task-list li");

    tasks.forEach((task) => {
      const status = task.getAttribute("data-status");
      const priority = task.getAttribute("data-priority");

      task.style.display = "flex"; // Show all by default

      if (filter === "completed" && status !== "completed") {
        task.style.display = "none";
      } else if (filter === "pending" && status !== "pending") {
        task.style.display = "none";
      } else if (filter === "priority" && priority !== "high") {
        task.style.display = "none";
      }
    });

    // Reset all buttons to inactive styles
    filterButtons.forEach((b) => {
      b.classList.remove("bg-teal-400", "text-white");
      b.classList.add("bg-gray-200", "text-gray-900");
    });

    // Set clicked button to active styles
    btn.classList.remove("bg-gray-200", "text-white");
    btn.classList.add("bg-teal-400", "text-white");
  });
});
