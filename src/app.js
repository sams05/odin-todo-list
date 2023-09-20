import Todo from './todo';
import Project from './project';

const projects = [];
const state = {
    curProjIdx: null,
    curTodoIdx: null
};

function getProjects() {
    return [...projects];
}

function createProject(title) {
    //(16) create project
    const proj = new Project(title);
    addProject(proj);
    userInterface.displayProject(proj);
}

function getProject(idx) {
    return projects[idx];
}

function setCurProject(idx) {
    state.curProjIdx = idx;
    state.TodoIdx = null;
    if(state.curProjIdx === null) {
        return null;
    } else {
        return getCurProjectDetails();
    }
}

function getCurProjectDetails() {
    const curProj = getProject(state.curProjIdx);
    return {
        title: curProj.title,
        todos: curProj.todos
    };
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

function getCurTodoDetails() {
    return getProject(state.curProjIdx).getTodo(state.curTodoIdx);
}

function setTodo(idx) {
    state.curTodoIdx = idx;
    if(state.curTodoIdx === null) {
        return null;
    } else {
        return getCurTodoDetails();
    }
}

function editTodo(projIdx, todoIdx, prop, val) {
    //(12) Edit todo
    const todo = projects[projIdx].getTodo(todoIdx);
    todo[prop] = val;
    userInterface.updateTodoDisplay(todo, prop, val);
}

//createProject, getProject, createTodo, getTodo, editTodo
export { getProjects, getProject, setCurProject, addProject, setTodo}; // remove addProject
