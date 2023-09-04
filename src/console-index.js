import Todo from "./todo";
import Project from "./project";

const userInterface = new (class Interface {
    displayProjects(projects) {
        console.table(projects);
        //(2)Allow user to select a project (attach event handlers)
            // For now, manually select project by directly calling appController.getProject(idx)
        console.log('select project by directly calling appController.getProject(idx)');
        
        //(14) Remove all event handlers added from displayProject/displayTodo

        //(15)Allow user to create a project
            //
        
        //PubSub.subscribe(TOPICS.PROJ_REQUESTED, this.getProject);
    }

    displayProject(project) {
        console.log(project.title);
        console.table(project.todos);

        //(4) Remove ability to select project while looking at current project (remove event handlers)
        //(5) Allow for user to go back to looking at all the projects (add event handler)
        //(6) Allow for user to expand a single todo to see its details (add event handlers)
            // For now, manually select todo by calling appController.getTodo(projIdx, todoIdx)
        console.log('select todo by calling appController.getTodo(projIdx, todoIdx)');
    }

    displayTodo(todo) {
        console.log(todo);

        //(8) Remove ability for user to expand other todos while viewing the current todo (remove event handler)
        //(9) Allow for user to go back to looking at all the todos (add event handler)
        //(10) Continue to allow for user to go back to looking at all the projects (keep event handler from (5) active)
        //(11) Allow for user to edit the todo (add event handlers)
            // For now manually edit todo by calling appController.editTodo(projIdx, todoIdx, prop, val)
        console.log('Edit todo by calling appController.editTodo(projIdx, todoIdx, prop, val)')
    }

    updateTodoDisplay(todo, prop, val) {
        console.log(`${prop} has been changed to ${val}`);
        //(13) View todo with updated values
        this.displayTodo(todo);
    }

    init() {
        //PubSub.subscribe(TOPICS.INIT, this.displayProjects);
    }
})();

const appController = new (class AppController {
    #projects = [];

    get projects() {
        return [...this.#projects];
    }

    getProject(idx) {
        //(3) View all todos in each project
        userInterface.displayProject(this.projects[idx]);

        // return this.#projects[idx];
    }

    addProjects(...projects) {
        this.#projects.push(...projects);
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

const test = [
    new Project(
        'default',
        new Todo('chore1', 'lorem ipsum', '2/3/12', 1),
        new Todo('chore2', 'lorem ipsum', '3/3/12', 2),
        new Todo('chore2', 'lorem ipsum', '3/3/12', 3)
    ),
    new Project(
        'work',
        new Todo('job1', 'lorem ipsum', '2/3/12', 1),
        new Todo('job2', 'lorem ipsum', '3/3/12', 2),
        new Todo('job3', 'lorem ipsum', '3/3/12', 3)
    ),
    new Project(
        'school',
        new Todo('hw1', 'lorem ipsum', '2/3/12', 1),
        new Todo('hw2', 'lorem ipsum', '3/3/12', 2),
        new Todo('hw3', 'lorem ipsum', '3/3/12', 3)
    ),
];

// Make into global variable to test on browser console
window.appController = appController;

appController.addProjects(...test);

appController.init();

/*
appController.getProject(1);
appController.getTodo(1,2);
appController.editTodo(1,2,'title','job4');
*/