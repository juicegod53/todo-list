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

    static removeTodo(todo) {
        Project.currentProject.todos = Project.currentProject.todos.filter(x => x !== todo)
    }
}

class Display {
    static displayProjects(projects) {
        document.getElementById("projects").innerHTML = ""

        for (let i = 0; i < projects.length; i++) {
            const projectText = document.createElement("p")
            projectText.project = projects[i]

            projectText.addEventListener("click", () => {
                Project.switchCurrentProject(projectText.project)
                Display.displayTodos(Project.currentProject.todos)

                console.log(Project.currentProject)
            })

            projectText.textContent = projects[i].title
            document.getElementById("projects").appendChild(projectText)
        }
    }

    static displayTodos(todos) {
        document.getElementById("todos").innerHTML = ""

        for (let i = 0; i < todos.length; i++) {
            const todo = document.createElement("div")
            const todoText = document.createElement("p")
            const todoDate = document.createElement("p")
            const todoEdit = document.createElement("button")
            const todoDelete = document.createElement("button")

            todo.todo = todos[i]
            todoText.textContent = todos[i].title
            todoDate.textContent = todos[i].dueDate.toDateString()
            todoEdit.textContent = "Edit"
            todoDelete.textContent = "Delete"

            todoEdit.addEventListener("click", () => {
                document.getElementById("title").value = todo.todo.title
                document.getElementById("desc").value = todo.todo.description
                document.getElementById("duedate").valueAsDate = todo.todo.dueDate
                document.getElementById("priority").value = todo.todo.priority

                document.getElementById("dialog").showModal()
            })

            todoDelete.addEventListener("click", () => {
                Project.removeTodo(todo.todo)
                todo.remove()

                console.log(Project.currentProject.todos)
                
            })
            todo.appendChild(todoText)
            todo.appendChild(todoDate)
            todo.appendChild(todoEdit)
            todo.appendChild(todoDelete)

            document.getElementById("todos").appendChild(todo)
        }
    }
}

Project.addProject(new Project("Home"))

Project.switchCurrentProject(Project.projects[0])
Project.currentProject.createTodo("eat food", "nom", new Date("September 27, 2025"), "high")
Project.currentProject.createTodo("lift weights", "heavy ones", new Date("September 25, 2025"), "normal")

Project.addProject(new Project("Study"))

Project.switchCurrentProject(Project.projects[1])
Project.currentProject.createTodo("read book", "read", new Date("September 26, 2025"), "normal")

Display.displayProjects(Project.projects)
Display.displayTodos(Project.currentProject.todos)