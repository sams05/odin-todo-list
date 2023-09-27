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

function setCurTodo(idx) {
    state.curTodoIdx = idx;
    if(state.curTodoIdx === null) {
        return null;
    } else {
        return getCurTodoDetails();
    }
}

/**
 * Edit current todo
 * @param {Object} options Object of todo property:value pairs 
 */
function editCurTodo(options) {
    const todo = getCurTodoDetails();
    for(const prop in options) {
        todo[prop] = options[prop];
    }
}

function saveData() {
    localStorage.setItem('projects', JSON.stringify({
        projects: getProjects()
    }));
}

// Look at return value of JSON.stringify({projects: getProjects()}) for expected string to parse;
function retrieveData() {
    let projects = localStorage.getItem('projects');
    projects = JSON.parse(projects, function(key, val) {
        // todos property of Project
        if(key === 'todos') {
            // Loop through todos elements and convert back into Todo objects
            const parsedTodos = [];
            for(const todo of val) {
                const {title, desc, dueDate, priority, check} = todo;
                parsedTodos.push(new Todo(title, desc, dueDate, priority, check));
            }
            return parsedTodos;
        }
        if(key === 'projects') {
            // Loop through projects elements and convert back into Project objects
            const parsedProjects = [];
            for(const project of val) {
                const {title, todos} = project;
                parsedProjects.push(new Project(title, ...todos));
            }
            return parsedProjects;
        }
        return val;
    });
    return projects.projects;
}

//createProject, getProject, createTodo, getTodo, editTodo
export { getProjects, getProject, setCurProject, addProject, setCurTodo, getCurTodoDetails, editCurTodo}; // |TODO remove addProject
