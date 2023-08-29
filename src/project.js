export default class Project {
    #todos = [];

    constructor(title, ...todos) {
        this.title = title;
        this.addTodos(...todos);
    }

    addTodos(...todos) {
        this.#todos.push(...todos);
    }

    get todos() {
        return [...this.#todos];
    }
}
