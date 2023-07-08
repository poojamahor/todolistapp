const addTaskForm = document.getElementById("add-task-form");
const todosContainer = document.getElementById("todos-container");
const deleteTodoButtons = document.getElementsByClassName("delete-todo");
const updateTodoButtons = document.getElementsByClassName("update-todo");

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

const getTodosFromLocalStorage = () => {
  const stringifiedLocalTodos = localStorage.getItem("todos");
  return JSON.parse(stringifiedLocalTodos);
};

const addTask = () => {
  const elements = addTaskForm.elements;
  const taskTitle = elements.title.value;
  const status = elements.status.value;
  const todo = {
    title: taskTitle,
    status,
  };
  const localTodos = getTodosFromLocalStorage();
  let todos = localTodos || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};

const deleteTask = (i) => {
  const todos = getTodosFromLocalStorage();
  todos.splice(i, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};

const updateTask = (i) => {
  const newTitle = prompt("Enter new title");
  const todos = getTodosFromLocalStorage();
  todos[i].title = newTitle;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
};

const renderTodos = (todos) => {
  const localTodos = todos || getTodosFromLocalStorage();
  todosContainer.innerHTML = null;
  localTodos?.forEach((todo) => {
    const { title, status } = todo;
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-div";
    todoDiv.innerHTML = `
    <div>
        <p>${title}</p>
        <p>${status}</p>
    </div> 
    <div>
        <i role='button' class="delete-todo fa-solid fa-trash me-3"></i>
        <i role='button' class="update-todo fa-solid fa-pen-to-square"></i>
    </div>
    `;
    todosContainer.appendChild(todoDiv);
  });
  for (let i = 0; i < deleteTodoButtons.length; i += 1) {
    const deleteButton = deleteTodoButtons[i];
    const updateButton = updateTodoButtons[i];
    deleteButton.addEventListener("click", () => deleteTask(i));
    updateButton.addEventListener("click", () => updateTask(i));
  }
};

renderTodos();

const sort = (val) => {
  const todos = getTodosFromLocalStorage();
  let filteredTodos = [];
  if (val === "All") {
    renderTodos();
    return;
  }
  if (val) {
    filteredTodos = todos?.filter((todo) => todo.status === "complete");
  } else {
    filteredTodos = todos?.filter((todo) => todo.status === "incomplete");
  }
  renderTodos(filteredTodos);
};
