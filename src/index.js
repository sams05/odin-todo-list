import { init } from './ui';
import * as app from './app';
import Project from './project';
import Todo from './todo';
import './style.css';

// Testing
const test = [
    new Project(
        'default',
        new Todo('chore1', 'lorem ipsum', new Date(2012,1,3), 'High'),
        new Todo('chore2', 'lorem ipsum', new Date(2012,2,3), 'Low'),
        new Todo('chore2', 'lorem ipsum', new Date(2012,2,3), 'Medium'),
    ),
    new Project(
        'work',
        new Todo('job1', 'lorem ipsum', new Date(2012,1,3), 'High'),
        new Todo('job2', 'lorem ipsum', new Date(2012,2,3), 'Medium'),
        new Todo('job3', 'lorem ipsum', new Date(2012,2,3), 'Low')
    ),
    new Project(
        'school',
        new Todo('hw1', 'lorem ipsum', new Date(2012,1,3), 'High'),
        new Todo('hw2', 'lorem ipsum', new Date(2012,2,3), 'Medium'),
        new Todo('hw3', 'lorem ipsum', new Date(2012,2,3), 'Low')
    ),
];

app.addProject(...test);
window.projects = app.getProjects();

// Test script

// View all projects
init();

//view all todos in each project (probably just the title and due date… perhaps changing color for different priorities)


//expand a single todo to see/edit its details
//delete a todo

