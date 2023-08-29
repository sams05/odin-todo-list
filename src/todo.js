export default class Todo {
    constructor(title, desc, dueDate, priority, check = false) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.check = check;
    }
}
