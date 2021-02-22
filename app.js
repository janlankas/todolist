//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

//Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", completeCheck);
filterOption.addEventListener("click", filterTodo);


// Functions

function addTodo(event) {
    // Prevent from refreshing 
    event.preventDefault();
    //TODO Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Save to local storage 
    saveLocalTodos(todoInput.value);
    //CHECKMARK button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class = 'fas fa-check'> <i>";
    completedButton.classList.add('complete-button')
    todoDiv.appendChild(completedButton);

    //Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "<i class = 'fas fa-trash'> <i>";
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);

    //Apppend to list
    todoList.appendChild(todoDiv);
    //Clear todo input list value 
    todoInput.value = "";


}

function deleteCheck(event) {
    const item = event.target;
    //Delete a task 
    if (item.classList[0] === "delete-button") {
        //Animation
        const todo = item.parentElement;
        todo.classList.add("fall");
        //remove
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

}

function completeCheck(event) {
    const item = event.target
    //Check a task 
    if (item.classList[0] === "complete-button") {
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check if it is already there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //Copied from saveLocalTodos
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //TODO Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')
        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //CHECKMARK button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = "<i class = 'fas fa-check'> <i>";
        completedButton.classList.add('complete-button')
        todoDiv.appendChild(completedButton);

        //Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "<i class = 'fas fa-trash'> <i>";
        deleteButton.classList.add('delete-button');
        todoDiv.appendChild(deleteButton);

        //Apppend to list
        todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}