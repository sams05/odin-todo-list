import PubSub from './pubsub-facade';
import { TOPICS } from './event-types';
import Todo from "./todo";
import Project from "./project";

export default new (class AppController {
    #projects = [];

    get projects() {
        return [...this.#projects];
    }

    createProject(title) {
        //(16) create project
        const proj = new Project(title);
        this.addProject(proj);
        userInterface.displayProject(proj);
    }

    getProject(idx) {
        //(3) View all todos in each project
        userInterface.displayProject(this.projects[idx]);

        // return this.#projects[idx];
    }

    addProject(...projects) {
        this.#projects.push(...projects);
    }

    createTodo(projIdx, title, desc, dueDate) {
        //(18) create todo
        const todo = new Todo(title, desc, dueDate);
        this.#projects[projIdx].addTodo(todo);
        userInterface.displayTodo(todo);
    }

    getTodo(projIdx, todoIdx) {
        //(7) View todo
        userInterface.displayTodo(this.#projects[projIdx].getTodo(todoIdx));
    }

    editTodo(projIdx, todoIdx, prop, val) {
        //(12) Edit todo
        const todo = this.#projects[projIdx].getTodo(todoIdx);
        todo[prop] = val;
        userInterface.updateTodoDisplay(todo, prop, val);
    }

    init() {
        //PubSub.publish(TOPICS.INIT, this.projects);

        //(1) View all projects
        userInterface.displayProjects(this.projects);
    }
})();