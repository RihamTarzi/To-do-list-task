
// Array storing tasks and selected index for editing
let taskArray = [], selectedIndex = -1;

// Get saved tasks from local storage
function getSavedTodoItems() {
    let todoItems = localStorage.getItem('todoList');
    taskArray = JSON.parse(todoItems) || [];
    displayTodoItems();
}

getSavedTodoItems();

// Add new task or edit existing task
function addTaskItems() {
    let taskInput = document.getElementById("task-input").value.trim();

    // Prevent adding empty tasks
    if (taskInput === "") {
        alert("Enter a valid task.");
        return;
    }

    // Check for duplicates before adding
    if (taskArray.some(task => task.text.toLowerCase() === taskInput.toLowerCase())) {
        alert("This task already exists.");
        return;
    }

    if (selectedIndex >= 0) {
        // Edit existing task
        taskArray[selectedIndex].text = taskInput;
        selectedIndex = -1;
        document.getElementById("add-btn").innerHTML = 'Add';
        document.getElementById("add-btn").classList.remove('edit');
    } else {
        // Add new task
        taskArray.push({ text: taskInput, isDone: false });
    }

    document.getElementById("task-input").value = '';
    saveTodoItems();
}

// Save the tasks array to localStorage and display them
function saveTodoItems() {
    let todoItems = JSON.stringify(taskArray);
    localStorage.setItem('todoList', todoItems);
    displayTodoItems();
}

// Display the tasks on the page
function displayTodoItems() {
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = '';

    if (taskArray.length === 0) {
        todoList.innerHTML = '<p class="no-todo-items">No todo items</p>';
    } else {
        taskArray.forEach((item, index) => {
            appendTodoItem(item, index);
        });
    }
}

// Create and append each task to the list
function appendTodoItem(item, index) {
    let todoList = document.getElementById("todo-list");
    let todoItem = document.createElement("li");
    todoItem.setAttribute('class', 'todo-item');
    if (item.isDone) {
        todoItem.classList.add('done');
    }

    let todoText = '<span class="todo-text">' + item.text + '</span>';
    // Create edit, delete, done buttons
    let editButton = '<i class="ri-edit-circle-fill" id="editbtnri" onclick="editItem(' + index + ')"></i>';
    let removeButton = '<i class="ri-delete-bin-2-fill" id="delbtnri" onclick="removeItem(' + index + ')"></i>';
    let doneButton = '<i class="ri-check-double-line" id="donbtnri" onclick="toggleStatus(' + index + ')"></i>';

    todoItem.innerHTML = todoText + editButton + removeButton + doneButton;
    todoList.appendChild(todoItem);
}

// Edit an existing task
function editItem(index) {
    selectedIndex = index;
    document.getElementById("task-input").value = taskArray[index].text;
    document.getElementById("add-btn").innerHTML = 'Edit';
    document.getElementById("add-btn").classList.add('edit');
}

// Toggle task status (done/undone)
function toggleStatus(index) {
    taskArray[index].isDone = !taskArray[index].isDone;
    saveTodoItems();
}

// Remove a task
function removeItem(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskArray.splice(index, 1);
        saveTodoItems();
    }
}
