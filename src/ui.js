import * as app from './app';

// Cache DOM
const PROJECT_UL = document.querySelector('.projects-list');
const TEMPLATES = {
    MAIN_PROJECTS: document.getElementById('main-projects-template'),
    MAIN_PROJECT: document.getElementById('main-project-template'),
    MAIN_TODO: document.getElementById('main-todo-template'),
    MAIN_TODO_FORM: document.getElementById('main-todo-form-template'),
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
    PROJECT_UL.replaceChildren();
    for (let i = 0; i < app.getProjects().length; i++) {
        PROJECT_UL.append(getProjectListNode(i));
    }
}

function createProject() {
    const titleInput = document.getElementById('proj-title');
    const title = titleInput.value;
    //(16) create project
    app.createProject(title);
    renderProjects();
}

function toggleCreateProj(e) {
    const toggleBtn = e.target;
    const form = document.getElementById('create-proj-form');
    const createBtn = document.getElementById('create-btn');
    toggleBtn.classList.toggle('active');
    form.toggleAttribute('hidden');
    if (toggleBtn.textContent === '+') {
        // Showing the form
        toggleBtn.textContent = 'x';
        createBtn.addEventListener('click', createProject);
    } else {
        // Hiding the form
        toggleBtn.textContent = '+';
        createBtn.removeEventListener('click', createProject);
    }
}

function renderProjectsMain() {
    app.setCurProject(null);

    const mainProjects = TEMPLATES.MAIN_PROJECTS.content.cloneNode(true);
    const projectsListEnd = mainProjects.querySelector('.projects-list-end');
    for (let i = 0; i < app.getProjects().length; i++) {
        projectsListEnd.before(getProjectListNode(i));
    }
    //(15)Allow user to create a project (attach event handlers)
    const createProjToggle = mainProjects.getElementById('create-proj-toggle');
    createProjToggle.addEventListener('click', toggleCreateProj);

    MAIN.replaceChildren(mainProjects);
}

function renderProjects() {
    renderProjectsSidebar();
    renderProjectsMain();
}

function init() {
    //(1) View all projects
    renderProjects();
    //(5) Allow for user to go back to looking at all the projects (add event handler)
    const asideButton = document.querySelector('aside button');
    asideButton.addEventListener('click', renderProjectsMain);
}

function getTodoHandler(e) {
    const todoId = e.currentTarget.dataset.todoId;
    renderTodo(todoId);
}

function getTodoLi(title, dueDate, check, todoId) {
    //(6) Allow for user to expand a single todo to see its details (add event handlers)
    const li = document.createElement('li');
    const pLeft = document.createElement('p');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if(check) {
        checkbox.checked = true;
    }
    const btn = document.createElement('button');
    // Strike through the title if checked
    const btnText = check ? document.createElement('s') : document.createElement('span');
    btnText.textContent = title;
    btn.append(btnText);
    btn.dataset.todoId = todoId;
    btn.addEventListener('click', getTodoHandler);
    pLeft.append(checkbox, btn);

    const pRight = document.createElement('p');
    const pRightText = check ? document.createElement('s') : document.createElement('span');
    pRightText.textContent = dueDate;
    pRight.append(pRightText);

    li.append(pLeft, pRight);
    return li;
}

function deleteProject() {
    app.deleteCurProject();
    renderProjects();
}

function renderProject(projIdx) {
    //(3) View all todos in each project
    const { title, todos } = app.setCurProject(projIdx);
    const mainProject = TEMPLATES.MAIN_PROJECT.content.cloneNode(true);
    // Set heading to title of project
    const heading = mainProject.querySelector('.heading');
    heading.textContent = title;

    // Set up list of todos
    // Unchecked todos
    const uncheckedTodosListEnd = mainProject.querySelector('#todos-list-unchecked .todos-list-end');
    for (const todo of todos.unchecked) {
        let { title, dueDateHuman, check, id } = todo;
        uncheckedTodosListEnd.before(getTodoLi(title, dueDateHuman, check, id));
    }
    // Checked todos
    const checkedTodosList = mainProject.getElementById('todos-list-checked');
    for (const todo of todos.checked) {
        let { title, dueDateHuman, check, id } = todo;
        checkedTodosList.append(getTodoLi(title, dueDateHuman, check, id));
    }

    //(17) Allow for user to delete a project
    const delBtn = mainProject.querySelector('.del-btn');
    delBtn.addEventListener('click', deleteProject);

    //(18) Allow for user to create a todo
    const createBtn = mainProject.getElementById('create-todo');
    createBtn.addEventListener('click', renderCreateTodoForm);

    MAIN.replaceChildren(mainProject);
}

function renderTodo(id) {
    //(7) View todo
    const todo = id === undefined ? app.getCurTodoDetails() : app.setCurTodo(id);
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
    editBtn.addEventListener('click', renderEditTodoForm);
    // Delete button
    // (20) Allow users to delete todo
    const delBtn = mainTodo.querySelector('.del-btn');
    delBtn.addEventListener('click', deleteTodo);
    MAIN.replaceChildren(mainTodo);
}

function getTodoFormValues() {
    // Get title
    const titleInput = document.getElementById('todo-title');
    const title = titleInput.value;
    // Get description
    const descTextArea = document.getElementById('todo-desc');
    const desc = descTextArea.value;
    // Get date
    const dueDateInput = document.getElementById('todo-due-date');
    const dueDate = dueDateInput.value;
    // get priority
    const prioritySelect = document.getElementById('todo-priority');
    const priority = prioritySelect.selectedOptions[0].value;

    return { title, desc, dueDate, priority };
}

function editTodo(e) {
    //(12) Edit todo
    const { title, desc, dueDate, priority } = getTodoFormValues();
    app.editCurTodo({ title, desc, dueDate, priority });
    //(13) View todo with updated values
    renderTodo();
}

function renderEditTodoForm() {
    const todo = app.getCurTodoDetails();
    //(11) Allow for user to edit the todo (add event handlers)
    const mainTodoForm = TEMPLATES.MAIN_TODO_FORM.content.cloneNode(true);
    // Set title of todo
    const titleInput = mainTodoForm.getElementById('todo-title');
    titleInput.value = todo.title;
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

function createTodo() {
    const { title, desc, dueDate, priority } = getTodoFormValues();
    //(19) create todo
    app.createTodo(title, desc, dueDate, priority);
    // Simulate event e with e.target.dataset.projIdx
    getProjectHandler({ target: { dataset: { projIdx: app.getCurProjectDetails().idx } } });
}

function renderCreateTodoForm() {
    const mainTodoForm = TEMPLATES.MAIN_TODO_FORM.content.cloneNode(true);
    // Back button
    const backBtn = mainTodoForm.querySelector('.back-btn');
    backBtn.dataset.projIdx = app.getCurProjectDetails().idx; // To be retrieved by getProjectHandler
    backBtn.addEventListener('click', getProjectHandler);
    // Save button
    const saveBtn = mainTodoForm.querySelector('.save-btn');
    saveBtn.addEventListener('click', createTodo);
    MAIN.replaceChildren(mainTodoForm);
}

function deleteTodo() {
    // (21) Delete todo
    app.deleteCurTodo();
    // Simulate event e with e.target.dataset.projIdx
    getProjectHandler({ target: { dataset: { projIdx: app.getCurProjectDetails().idx } } });
}

// Initialization function
export { init };
