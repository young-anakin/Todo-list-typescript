document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form') as HTMLFormElement;
    const todoInput = document.getElementById('todo-input') as HTMLInputElement;
    const todoList = document.getElementById('todo-list') as HTMLUListElement;

    interface Todo {
        id: number;
        text: string;
    }

    let todos: Todo[] = [];

    todoForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        addTodo();
    });

    function addTodo(): void {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todo: Todo = {
                id: Date.now(),
                text: todoText
            };
            todos.push(todo);
            renderTodos();
            todoInput.value = '';
        }
    }

    function renderTodos(): void {
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
                const id = Number((button as HTMLButtonElement).getAttribute('data-id'));
                editTodo(id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = Number((button as HTMLButtonElement).getAttribute('data-id'));
                deleteTodo(id);
            });
        });
    }

    function editTodo(id: number): void {
        const newText = prompt('Edit your todo:');
        if (newText !== null && newText.trim() !== '') {
            const todo = todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = newText;
                renderTodos();
            }
        }
    }

    function deleteTodo(id: number): void {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }
});
