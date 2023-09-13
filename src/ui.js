import * as app from './app';

function getProjectHandler(e) {
    const projIdx = e.target.dataset.projIdx;
    displayProject(projIdx);
}

function renderProjects() {
    for (let i = 0; i < app.projects.length; i++) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = app.projects[i].title;
        btn.dataset.projIdx = i;
        btn.addEventListener('click', getProjectHandler);
        li.append(btn);
        projectUl.append(li);
    }

    //(2)Allow user to select a project (attach event handlers)
    console.log('select project by directly calling app.getProject(idx)');

    //(14) Remove all event handlers added from displayProject/displayTodo

    //(15)Allow user to create a project (attach event handlers)
    console.log('create project by calling app.createProject(title)');

    //PubSub.subscribe(TOPICS.PROJ_REQUESTED, getProject);
}

function displayProject(projIdx) {
    const proj = app.projects[projIdx];
    console.log(proj.title);
    console.table(proj.todos);

    //(4) Remove all event handlers from displayProjects
    //(5) Allow for user to go back to looking at all the projects (add event handler)
    //(6) Allow for user to expand a single todo to see its details (add event handlers)
    // For now, manually select todo by calling app.getTodo(projIdx, todoIdx)
    console.log('select todo by calling app.getTodo(projIdx, todoIdx)');

    //(17) Allow for user to create a todo
    console.log('create todo by calling app.createTodo(projIdx, title, desc, dueDate)');
}

function displayTodo(todo) {
    console.log(todo);

    //(8) Remove ability for user to expand other todos while viewing the current todo (remove event handler)
    //(9) Allow for user to go back to looking at all the todos (add event handler)
    //(10) Continue to allow for user to go back to looking at all the projects (keep event handler from (5) active)
    //(11) Allow for user to edit the todo (add event handlers)
    // For now manually edit todo by calling app.editTodo(projIdx, todoIdx, prop, val)
    console.log('Edit todo by calling app.editTodo(projIdx, todoIdx, prop, val)');
}

function updateTodoDisplay(todo, prop, val) {
    console.log(`${prop} has been changed to ${val}`);
    //(13) View todo with updated values
    displayTodo(todo);
}

// Initialization
// Cache DOM
const projectUl = document.querySelector('.projects-list');
//(1) View all projects
export { renderProjects };
