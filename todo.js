// butun hamsini secdim.

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#clear-todos");
const filterInput = document.querySelector("#filter");

const firstcardbody = document.querySelector(".card-body")[0];
const secondcardbody = document.querySelector(".card-body")[1];

// Event Listeners
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    todoList.addEventListener("click", deleteTodo);
    clearButton.addEventListener("click", clearAllTodos);
    filterInput.addEventListener("keyup", filterTodos);
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    
    if (newTodo === "") {
        showAlert("danger", "Lütfen bir todo giriniz!");
        return;
    }

    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo başarıyla eklendi!");
    todoInput.value = "";
}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    
    todoList.appendChild(listItem);
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi!");
    }
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach((todo, index) => {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAllTodos() {
    if (confirm("Tüm todoları silmek istediğinizden emin misiniz?")) {
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
        showAlert("success", "Tüm todolar başarıyla silindi!");
    }
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display: none !important");
        } else {
            listItem.setAttribute("style", "display: block");
        }
    });
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    form.appendChild(alert);
    
    setTimeout(function() {
        alert.remove();
    }, 4000);
}

