import * as app from './app';

// Cache DOM
const PROJECT_UL = document.querySelector('.projects-list');
const TEMPLATES = {
    MAIN_PROJECTS: document.getElementById('main-projects-template'),
    MAIN_PROJECT: document.getElementById('main-project-template'),
    MAIN_TODO: document.getElementById('main-todo-template'),
    MAIN_TODO_FORM: document.getElementById('main-todo-form-template')
};
const MAIN = document.querySelector('main');

function getProjectHandler(e) {
    const projIdx = e.target.dataset.projIdx;
    renderProject(projIdx);
}

// Create li element for project i with event handler for selecting the project
function getProjectListNode(i) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = app.getProject(i).title;
    btn.dataset.projIdx = i;
    //(2)Allow user to select a project (attach event handlers)
    btn.addEventListener('click', getProjectHandler);
    li.append(btn);
    return li;
}

function renderProjectsSidebar() {
    for (let i = 0; i < app.getProjects().length; i++) {
        PROJECT_UL.append(getProjectListNode(i));
    }
}

function renderProjectsMain() {
    app.setCurProject(null);

    const mainProjects = TEMPLATES.MAIN_PROJECTS.content.cloneNode(true);
    const ul = mainProjects.querySelector('.projects-list');
    for (let i = 0; i < app.getProjects().length; i++) {
        ul.append(getProjectListNode(i));
    }
    MAIN.replaceChildren(mainProjects);
}

function init() {
    //(1) View all projects
    renderProjectsSidebar();
    renderProjectsMain();
    //(5) Allow for user to go back to looking at all the projects (add event handler)
    const asideButton = document.querySelector('aside button');
    asideButton.addEventListener('click', renderProjectsMain);

    //(14) Remove all event handlers added from renderProject/renderTodo

    //(15)Allow user to create a project (attach event handlers)
    console.log('create project by calling app.createProject(title)');
}

function getTodoHandler(e) {
    const todoIdx = e.target.dataset.todoIdx;
    renderTodo(todoIdx);
}

function getTodoListNode(title, dueDate, todoIdx) {
    const li = document.createElement('li');
    const pLeft = document.createElement('o');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const btn = document.createElement('button');
    btn.textContent = title;
    btn.dataset.todoIdx = todoIdx;
    btn.addEventListener('click', getTodoHandler)
    pLeft.append(checkbox, btn);

    const pRight = document.createElement('p');
    pRight.textContent = dueDate;

    li.append(pLeft, pRight);
    return li;
}

function renderProject(projIdx) {
    //(3) View all todos in each project
    const {title, todos} = app.setCurProject(projIdx);;
    const mainProject = TEMPLATES.MAIN_PROJECT.content.cloneNode(true);
    // Set heading to title of project
    const heading = mainProject.querySelector('.heading');
    heading.textContent = title;
    // Set up list of todos
    const ul = mainProject.querySelector('.todos-list');
    for(let i = 0; i < todos.length; i++) {
        let {title, dueDateHuman} = todos[i];
        ul.append(getTodoListNode(title, dueDateHuman, i));
    }
    MAIN.replaceChildren(mainProject);

    //(6) Allow for user to expand a single todo to see its details (add event handlers)
    // For now, manually select todo by calling app.getTodo(projIdx, todoIdx)
    console.log('select todo by calling app.getTodo(projIdx, todoIdx)');

    //(17) Allow for user to create a todo
    console.log('create todo by calling app.createTodo(projIdx, title, desc, dueDate)');
}

function renderTodo(idx) {
    //(7) View todo
    const todo = (idx === undefined) ? app.getCurTodoDetails() : app.setCurTodo(idx);
    const mainTodo = TEMPLATES.MAIN_TODO.content.cloneNode(true);
    // Set title of todo
    const heading = mainTodo.querySelector('.heading');
    heading.textContent = todo.title;
    // Set description
    const desc = mainTodo.getElementById('todo-desc');
    desc.textContent = todo.desc;
    // Set date
    const dueDate = mainTodo.getElementById('todo-due-date');
    dueDate.textContent = todo.dueDateHuman;
    // Set priority
    const priority = mainTodo.getElementById('todo-priority');
    priority.textContent = todo.priority;
    // Edit button
    const editBtn = mainTodo.querySelector('.edit-btn');
    editBtn.addEventListener('click', renderTodoForm);
    // Delete button
    const delBtn = mainTodo.querySelector('.del-btn');
    MAIN.replaceChildren(mainTodo);
}

function editTodo(e) {
    //(12) Edit todo
    // Get description
    const descTextArea = document.getElementById('todo-desc');
    const desc = descTextArea.value;
    // Get date
    const dueDateInput = document.getElementById('todo-due-date');
    const dueDate = dueDateInput.value;
    // get priority
    const prioritySelect = document.getElementById('todo-priority');
    const priority = prioritySelect.selectedOptions[0].value;
    app.editCurTodo({ desc, dueDate, priority });
    renderTodo();
}

function renderTodoForm() {
    const todo = app.getCurTodoDetails();
    //(11) Allow for user to edit the todo (add event handlers)
    const mainTodoForm = TEMPLATES.MAIN_TODO_FORM.content.cloneNode(true);
    // Set title of todo
    const heading = mainTodoForm.querySelector('.heading');
    heading.textContent = todo.title;
    // Set description
    const descTextArea = mainTodoForm.getElementById('todo-desc');
    descTextArea.textContent = todo.desc;
    // Set date
    const dueDateInput = mainTodoForm.getElementById('todo-due-date');
    dueDateInput.value = todo.dueDateJs;
    // Set priority
    const priorityOpt = mainTodoForm.querySelector(`#todo-priority > option[value="${todo.priority}"]`);
    priorityOpt.selected = true;
    // Back button
    const backBtn = mainTodoForm.querySelector('.back-btn');
    backBtn.addEventListener('click', getTodoHandler);
    // Save button
    const saveBtn = mainTodoForm.querySelector('.save-btn');
    saveBtn.addEventListener('click', editTodo);
    MAIN.replaceChildren(mainTodoForm);
}

function updateTodoDisplay(todo, prop, val) {
    console.log(`${prop} has been changed to ${val}`);
    //(13) View todo with updated values
    renderTodo(todo);
}

// Initialization function
export { init };
