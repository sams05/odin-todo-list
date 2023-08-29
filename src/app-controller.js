import PubSub from './pubsub-facade';
import { TOPICS } from './event-types';

export default new (class AppController {
    #projects = [];

    get projects() {
        return [...this.#projects];
    }

    addProjects(...projects) {
        this.#projects.push(...projects);
    }

    init() {
        PubSub.publish(TOPICS.INIT, this.projects);
    }
})();
