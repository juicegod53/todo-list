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
    static currentProject;
    constructor(name) {
        this.name = name
        this.todos = []
    }

    createTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority)
        this.todos.push(todo)
    }

    static switchCurrentProject(project) {
        Project.currentProject = project
    }

}

var projects = []

projects[0] = new Project("Home")

Project.switchCurrentProject(projects[0])
Project.currentProject.createTodo("eat food", "nom", new Date("September 7, 2025"), "high")

console.log(Project.currentProject.todos)

projects[1] = new Project("Study")

Project.switchCurrentProject(projects[1])
Project.currentProject.createTodo("read book", "read", new Date("September 8, 2025"), "normal")

console.log(Project.currentProject.todos)


