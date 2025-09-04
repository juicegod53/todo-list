import "./styles.css";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

class Project {
    constructor(name) {
        this.name = name
        this.todos = []
    }

    createTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority)
        this.todos.push(todo)
    }

}

const project = new Project("Home")
project.createTodo("eat food", "nom", new Date("September 5, 2025"), "high")
console.log(project.todos)





