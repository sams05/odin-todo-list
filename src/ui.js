import PubSub from "./pubsub-facade";
import { TOPICS } from "./event-types";

export default new (class Interface {
    displayProjects(projects) {
        console.table(projects);
        //(2)Allow user to select a project (attach event handlers)
        
        //PubSub.subscribe(TOPICS.PROJ_REQUESTED, this.getProject);
    }

    getProject(project) {
        console.log(project.title);
        console.table(project.todos);
    }

    init() {
        //PubSub.subscribe(TOPICS.INIT, this.displayProjects);
    }
})();