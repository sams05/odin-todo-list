import PubSub from './pubsub-facade';
import { TOPICS } from './event-types';

export default new (class Interface {
    displayProjects(projects) {
        console.table(projects);
        for(const project of projects) {
            console.log(project.title);
            console.table(project.todos);
        }
    }

    init() {
        PubSub.subscribe(TOPICS.INIT, this.displayProjects);
    }
})();