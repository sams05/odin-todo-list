import { init } from './ui';
import * as app from './app';
import Project from './project';
import Todo from './todo';
import './style.css';

// Testing
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

window.displayProjects = function(projects) {
    console.table(projects);
    for(const project of projects) {
        console.log(project.title);
        console.table(project.todos);
    }
}

app.addProject(...test);

// Test script
(() => {
    // View all projects
    init();

    //view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)


//expand a single todo to see/edit its details
//delete a todo
})();
