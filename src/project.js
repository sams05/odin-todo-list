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
}
