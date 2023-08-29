import PubSubJs from 'pubsub-js';

/**
 * Returns a callback function that matches the expected callback signature
 * for PubSubJs's subscribe method.
 *
 * @param {Function} callback with signature: callback(data)
 * @returns {Function} callback with signature: callback(msg, data)
 */
function subCallbackWrapper(callback) {
    return (msg, data) => {
        callback(data);
    };
}

/**
 * Facade for pubsub module
 */
export default new (class PubSub {
    #pubsub;
    constructor(pubsubModule) {
        this.#pubsub = pubsubModule;
    }

    subscribe(topic, callback) {
        this.#pubsub.subscribe(topic, subCallbackWrapper(callback));
    }

    publish(topic, data) {
        this.#pubsub.publish(topic, data);
    }
})(PubSubJs);
