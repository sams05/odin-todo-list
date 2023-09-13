import Todo from './todo';
import Project from './project';

const projects = [];

function createProject(title) {
    //(16) create project
    const proj = new Project(title);
    addProject(proj);
    userInterface.displayProject(proj);
}

function getProject(idx) {
    //(3) View all todos in each project
    userInterface.displayProject(projects[idx]);

    // return projects[idx];
}

function addProject(...newProjects) {
    projects.push(...newProjects);
}

function createTodo(projIdx, title, desc, dueDate) {
    //(18) create todo
    const todo = new Todo(title, desc, dueDate);
    projects[projIdx].addTodo(todo);
    userInterface.displayTodo(todo);
}

function getTodo(projIdx, todoIdx) {
    //(7) View todo
    userInterface.displayTodo(projects[projIdx].getTodo(todoIdx));
}

function editTodo(projIdx, todoIdx, prop, val) {
    //(12) Edit todo
    const todo = projects[projIdx].getTodo(todoIdx);
    todo[prop] = val;
    userInterface.updateTodoDisplay(todo, prop, val);
}

export { projects, createProject, getProject, addProject, createTodo, getTodo, editTodo };
