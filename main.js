// array storing tasks.selected index for editing
let taskArray = [], selectedIndex = -1;

// get saved tasks from local storage
function getSavedTodoItems() {
    let todoItems = localStorage.getItem('todoList');
    taskArray = JSON.parse(todoItems) || [];
    displayTodoItems();
}

getSavedTodoItems();

// add new task or edit existing task
function addTaksItems() {
    let taskInput = document.getElementById("task-input");
    if (selectedIndex >= 0) {
        taskArray[selectedIndex].text = taskInput.value;
        selectedIndex = -1;
        document.getElementById("add-btn").innerHTML = 'Add';
        document.getElementById("add-btn").classList.remove('edit');
    } else {
        taskArray.push({ text: taskInput.value, isDone: false });
    }
    taskInput.value = '';
    displayTodoItems();
    saveTodoItems();
}

// save the tasks array to localStorage
function saveTodoItems() {
    let todoItems = JSON.stringify(taskArray);
    localStorage.setItem('todoList', todoItems);
}

// display the tasks on the page
function displayTodoItems() {
    document.getElementById("todo-list").innerHTML = '';
    taskArray.forEach((item, index) => {
        appendTodoItem(item, index);
    });

    // no taskst = show a message
    if (!taskArray.length) {
        document.getElementById("todo-list").innerHTML = '<p class="no-todo-items"> No todo Items </p>';
    }
}

// create and append each task to the list
function appendTodoItem(item, index) {
    let todoList = document.getElementById("todo-list");
    let todoItem = document.createElement("li");
    todoItem.setAttribute('class', 'todo-item');
    if (item.isDone) {
        todoItem.classList.add('done');
    }
    let todoText = '<span class="todo-text">' + item.text + '</span>';
    // Create edit, delete, done btns
    let editButton = '<i class="ri-edit-circle-fill" id="editbtnri" onclick="editItem(' + index + ')"></i>';
    let removeButton = '<i class="ri-delete-bin-2-fill" id="delbtnri" onclick="removeItem(' + index + ')"></i>';
    let doneButton = '<i class="ri-check-double-line" id="donbtnri" onclick="markAsDone(' + index + ')"></i>';

    todoItem.innerHTML = todoText + editButton + removeButton + doneButton;
    todoList.appendChild(todoItem);
}

// edit an existing task
function editItem(index) {
    selectedIndex = index;
    console.log('==selectedIndex==', selectedIndex);
    document.getElementById("task-input").value = taskArray[index].text;
    document.getElementById("add-btn").innerHTML = 'Edit';
    document.getElementById("add-btn").classList.add('edit');
}

// mark a task as done 
function markAsDone(index) {
    taskArray[index].isDone = !taskArray[index].isDone;
    displayTodoItems();
    saveTodoItems();
}

// remove a task
function removeItem(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskArray.splice(index, 1);
        displayTodoItems();
        saveTodoItems();
    }
}



