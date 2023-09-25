import { format } from 'date-fns';

/**
 * Class for Todo objects which will be maintained under a Project object
 * title <String>: title of the Todo
 * desc <String>: description of the Todo
 * dueDate <Date>: due date of the Todo
 * priority <String>: low, medium, or high
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

    // due date in human readable format
    get dueDateHuman() {
        return format(this.#dueDate, 'PPp');
    }

    // due date following the "date time string format" in the javascript specification
    // https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format
    get dueDateJs() {
        return format(this.#dueDate, "yyyy-MM-dd'T'HH':'mm");
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
