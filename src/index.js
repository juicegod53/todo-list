import "./styles.css";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }

    updateDetails(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

class Project {
    static currentProject;  
    static projects = [];
    constructor(title) {
        this.title = title
        this.todos = []
    }

    createTodo(title, description, dueDate, priority) {
        const todo = new Todo(title, description, dueDate, priority)
        this.todos.push(todo)
    }

    static switchCurrentProject(project) {
        Project.currentProject = project
    }

    static addProject(project) {
        Project.projects.push(project)
    }
}

class Display {
    static displayProjects(projects) {
        document.getElementById("projects").innerHTML = ""
        for (let i = 0; i < projects.length; i++) {
            const projectText = document.createElement("p")
            projectText.addEventListener("click", (event) => {
                const projectNames = Project.projects.map((x) => x.title)
                const projectName = event.target.textContent
                const projectIndex = projectNames.indexOf(projectName)
                Project.switchCurrentProject(projects[projectIndex])
                console.log(Project.currentProject)
            })
            projectText.textContent = projects[i].title
            document.getElementById("projects").appendChild(projectText)
        }
    }

    static displayTodos(todos) {
        document.getElementById("todos").innerHTML = ""
        for (let i = 0; i < todos.length; i++) {
            const todoText = document.createElement("p")
            todoText.textContent = todos[i].title
            document.getElementById("todos").appendChild(todoText)
        }
    }
}

Project.addProject(new Project("Home"))

Project.switchCurrentProject(Project.projects[0])
Project.currentProject.createTodo("eat food", "nom", new Date("September 7, 2025"), "high")

console.log(Project.currentProject.todos)

Project.addProject(new Project("Study"))

Project.switchCurrentProject(Project.projects[1])
Project.currentProject.createTodo("read book", "read", new Date("September 8, 2025"), "normal")

console.log(Project.currentProject.todos)

Display.displayProjects(Project.projects)
Display.displayTodos(Project.currentProject.todos)