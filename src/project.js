export default class Project {
    #todos = [];

    constructor(title, ...todos) {
        this.title = title;
        this.addTodo(...todos);
    }

    addTodo(...todos) {
        this.#todos.push(...todos);
    }

    get todos() {
        return [...this.#todos];
    }

    getTodo(idx) {
        return this.todos[idx];
    }

    deleteTodo(idx) {
        this.#todos.splice(idx, 1);
    }

    toJSON() {
        return {
            title: this.title,
            todos: this.todos
        };
    }
}
