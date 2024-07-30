"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = [];
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo();
    });
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todo = {
                id: Date.now(),
                text: todoText
            };
            todos.push(todo);
            renderTodos();
            todoInput.value = '';
        }
    }
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions">
                    <button data-id="${todo.id}" class="edit-btn">Edit</button>
                    <button data-id="${todo.id}" class="delete-btn">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = Number(button.getAttribute('data-id'));
                editTodo(id);
            });
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = Number(button.getAttribute('data-id'));
                deleteTodo(id);
            });
        });
    }
    function editTodo(id) {
        const newText = prompt('Edit your todo:');
        if (newText !== null && newText.trim() !== '') {
            const todo = todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = newText;
                renderTodos();
            }
        }
    }
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }
});
//# sourceMappingURL=app.js.map