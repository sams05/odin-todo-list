import { compareAsc } from 'date-fns';

export default class Project {
    #todos = [];

    constructor(title, ...todos) {
        this.title = title;
        this.addTodo(...todos);
    }

    addTodo(...todos) {
        this.#todos.push(...todos);
    }

    /**
     * Get array(s) of todos. Sorted so that todos with more recent due dates come first.
     * @param {Boolean} partition Whether split checked and unchecked Todos into separate arrays
     * @returns {Object|Array} If partitioning, return an object with properties `checked` and `unchecked`.
     */
    getTodos(partition = true) {
        if (partition) {
            // Split todos into checked and unchecked
            // Using the reduce instead of the filter method for a single loop: https://stackoverflow.com/a/67333661
            return this.getTodos(false).reduce(
                (partitionedTodos, curTodo) => {
                    partitionedTodos[curTodo.check ? 'checked' : 'unchecked'].push(curTodo);
                    return partitionedTodos;
                },
                { checked: [], unchecked: [] }
            );
        } else {
            return [...this.#todos].sort((todo1, todo2) => compareAsc(todo1.dueDate, todo2.dueDate));
        }
    }

    getTodo(todoId) {
        return this.getTodos(false).find((todo) => todo.id === todoId);
    }

    deleteTodo(todoId) {
        const idx = this.#todos.findIndex((todo) => todo.id === todoId);
        this.#todos.splice(idx, 1);
    }

    toJSON() {
        return {
            title: this.title,
            todos: this.getTodos(false),
        };
    }
}
