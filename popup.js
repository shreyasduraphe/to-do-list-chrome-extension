document.addEventListener('DOMContentLoaded', function () {
  const newTodoInput = document.getElementById('newTodo');
  const addTodoButton = document.getElementById('addTodo');
  const todoList = document.getElementById('todoList');

  addTodoButton.addEventListener('click', function () {
    const newTodoText = newTodoInput.value.trim();
    if (newTodoText !== '') {
      addTodo(newTodoText);
      newTodoInput.value = '';
    }
  });

  // Load existing todos from local storage
  loadTodos();

  function addTodo(todoText) {
    const li = document.createElement('li');
    li.textContent = todoText;

    // Add a delete button to each todo item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      removeTodo(li, todoText);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);

    // Save todo to local storage
    saveTodoToLocalStorage(todoText);
  }

  function saveTodoToLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function (todoText) {
      addTodo(todoText);
    });
  }

  function removeTodo(li, todoText) {
    li.remove();

    // Remove todo from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});
