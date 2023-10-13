import Todo from './todo';
import Project from './project';

const projects = [];
const state = {
    curProjIdx: null,
    curTodoId: null,
};

function getProjects() {
    return [...projects];
}

function createProject(title) {
    const proj = new Project(title);
    addProject(proj);
}

function getProject(idx) {
    return projects[idx];
}

function setCurProject(idx) {
    state.curProjIdx = idx;
    state.curTodoId = null;
    if (state.curProjIdx === null) {
        return null;
    } else {
        return getCurProjectDetails();
    }
}

function getCurProjectDetails() {
    const curProj = getProject(state.curProjIdx);
    return {
        idx: state.curProjIdx,
        title: curProj.title,
        todos: curProj.getTodos(true),
    };
}

function addProject(...newProjects) {
    projects.push(...newProjects);
    saveData();
}

/**
 * Create Todo on specified project
 * @param {Number} projIdx
 * @param {String} title
 * @param {String} desc
 * @param {Date} dueDate
 * @param {String} priority
 */
function createTodoAnyProject(projIdx, title, desc, dueDate, priority) {
    const todo = new Todo(title, desc, dueDate, priority);
    projects[projIdx].addTodo(todo);
    saveData();
}

/**
 * Create Todo on current project
 * @param {String} title
 * @param {String} desc
 * @param {Date} dueDate
 * @param {String} priority
 */
function createTodo(title, desc, dueDate, priority) {
    createTodoAnyProject(state.curProjIdx, title, desc, dueDate, priority);
}

function getCurTodoDetails() {
    return getProject(state.curProjIdx).getTodo(state.curTodoId);
}

function setCurTodo(id) {
    state.curTodoId = id;
    if (state.curTodoId === null) {
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
    for (const prop in options) {
        todo[prop] = options[prop];
    }
    saveData();
}

function deleteProject(idx) {
    projects.splice(idx, 1);
    saveData();
}

function deleteCurProject() {
    deleteProject(state.curProjIdx);
    state.curProjIdx = null;
}

function deleteCurTodo() {
    const curProj = getProject(state.curProjIdx);
    curProj.deleteTodo(state.curTodoId);
    state.curTodoId = null;
    saveData();
}

function saveData() {
    localStorage.setItem(
        'projects',
        JSON.stringify({
            projects: getProjects(),
        })
    );
}

// Look at return value of JSON.stringify({projects: getProjects()}) for expected string to parse;
function retrieveData() {
    let projects = localStorage.getItem('projects');
    // Null check
    if (projects === null) {
        return null;
    }
    projects = JSON.parse(projects, function (key, val) {
        // todos property of Project
        if (key === 'todos') {
            // Loop through todos elements and convert back into Todo objects
            const parsedTodos = [];
            for (const todo of val) {
                const { title, desc, dueDate, priority, check } = todo;
                parsedTodos.push(new Todo(title, desc, dueDate, priority, check));
            }
            return parsedTodos;
        }
        if (key === 'projects') {
            // Loop through projects elements and convert back into Project objects
            const parsedProjects = [];
            for (const project of val) {
                const { title, todos } = project;
                parsedProjects.push(new Project(title, ...todos));
            }
            return parsedProjects;
        }
        return val;
    });
    return projects.projects;
}

// | Testing
function addDummyProjects() {
    const test = [
        new Project(
            'default',
            new Todo('chore1', 'lorem ipsum', new Date(2012, 1, 3), 'High', true),
            new Todo('chore2', 'lorem ipsum', new Date(2012, 2, 3), 'Low', true),
            new Todo('chore2', 'lorem ipsum', new Date(2012, 2, 3), 'Medium')
        ),
        new Project(
            'work',
            new Todo('job1', 'lorem ipsum', new Date(2012, 1, 3), 'High'),
            new Todo('job2', 'lorem ipsum', new Date(2012, 2, 3), 'Medium'),
            new Todo('job3', 'lorem ipsum', new Date(2012, 2, 3), 'Low', true)
        ),
        new Project(
            'school',
            new Todo('hw1', 'lorem ipsum', new Date(2012, 1, 3), 'High'),
            new Todo('hw2', 'lorem ipsum', new Date(2012, 2, 3), 'Medium', true),
            new Todo('hw3', 'lorem ipsum', new Date(2012, 2, 3), 'Low')
        ),
    ];

    addProject(...test);
}

function init() {
    const data = retrieveData();
    if (data === null) {
        projects.splice(0, projects.length); // clear projects array
        //createProject('default'); // Replace with addDummyProjects() for testing
        addDummyProjects()
    } else {
        addProject(...data);
    }
}

init();

export {
    getProjects,
    getProject,
    setCurProject,
    getCurProjectDetails,
    setCurTodo,
    getCurTodoDetails,
    editCurTodo,
    createProject,
    deleteCurProject,
    createTodo,
    deleteCurTodo
};
