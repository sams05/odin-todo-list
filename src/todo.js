/**
 * Class for Todo objects which will be maintained under a Project object
 * title <String>: title of the Todo
 * desc <String>: description of the Todo
 * dueDate <Date>: due date of the Todo
 * priority <Number>: how important the todo is compared to other todo items in the project.
 *      A priority of 1 is most important and the priority of the todo item go down for higher values.
 *      Each Todo should have a unique priority within the project.
 * check <boolean>: whether the Todo is completed or not
 */
export default class Todo {
    #title;
    #desc;
    #dueDate;
    #priority;
    #check;

    constructor(title, desc, dueDate, priority, check = false) {
        this.#title = title;
        this.#desc = desc;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#check = check;
    }

    get title() {
        return this.#title;
    }

    get desc() {
        return this.#desc;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    get check() {
        return this.#check;
    }

    set title(title) {
        this.#title = title;
    }

    set desc(desc) {
        this.#desc = desc;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    set check(check) {
        this.#check = check;
    }
}