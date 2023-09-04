import PubSub from './pubsub-facade';
import { TOPICS } from './event-types';
import userInterface from './ui';

function selectProject() {
    return +prompt('Select project');
}

export default new (class AppController {
    #projects = [];

    get projects() {
        return [...this.#projects];
    }

    getProject(idx) {
        //View all todos in each project, remove ability to select project while looking at current project (remove event handlers)
        return this.#projects[idx];
    }

    addProjects(...projects) {
        this.#projects.push(...projects);
    }

    init() {
        //PubSub.publish(TOPICS.INIT, this.projects);

        //(1) View all projects
        userInterface.displayProjects(projects);     
    }
})();

