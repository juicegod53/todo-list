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
    static currentEditingTodo = null

    static assignButtons() {
        document.getElementById("edit-todo-close").addEventListener("click", () => {
            Display.currentEditingTodo = null
            document.getElementById("edit-todo-dialog").close()
        })

        document.getElementById("edit-todo-submit").addEventListener("click", () => {
            if (document.getElementById("todo-title").value == "") {
                document.getElementById("edit-todo-dialog").close()
                return
            }

            if (!Display.currentEditingTodo) {
                Project.currentProject.createTodo(document.getElementById("todo-title").value, document.getElementById("desc").value, document.getElementById("duedate").valueAsDate, document.getElementById("priority").value)      
                Display.displayTodos(Project.currentProject.todos)  
                
                document.getElementById("edit-todo-dialog").close()
                return
            }

            const todo = Display.currentEditingTodo

            todo.todo.title = document.getElementById("todo-title").value
            todo.todo.description = document.getElementById("desc").value
            todo.todo.dueDate = document.getElementById("duedate").valueAsDate
            todo.todo.priority = document.getElementById("priority").value

            Display.currentEditingTodo = null
            document.getElementById("edit-todo-dialog").close()
            Display.displayTodos(Project.currentProject.todos)
        })

        document.getElementById("create-project").addEventListener("click", () => {
            document.getElementById("create-project-dialog").showModal()
        })

        document.getElementById("create-todo").addEventListener("click", () => {
            document.getElementById("edit-todo-form").reset()
            document.getElementById("duedate").valueAsDate = new Date()
            document.getElementById("edit-todo-dialog").showModal()
        })

        document.getElementById("create-project-submit").addEventListener("click", () => {
            const newProjectTitle = document.getElementById("project-title").value

            if (newProjectTitle != "") {
                const project = new Project(newProjectTitle)

                Project.addProject(project)
                Display.displayProjects(Project.projects)
            }

            document.getElementById("create-project-dialog").close()
            document.getElementById("project-title").value = ""
        })

        document.getElementById("create-project-close").addEventListener("click", () => {
            document.getElementById("create-project-dialog").close()
            document.getElementById("project-title").value = ""
        })

    }

    static displayProjects(projects) {
        document.getElementById("projects").innerHTML = ""

        for (let i = 0; i < projects.length; i++) {
            const project = document.createElement("div")
            const projectText = document.createElement("p")
            const projectDelete = document.createElement("button")

            project.project = projects[i]

            projectText.addEventListener("click", () => {
                Project.switchCurrentProject(project.project)
                Display.displayTodos(Project.currentProject.todos)
            })

            projectDelete.addEventListener("click", () => {
                if (Project.projects.length == 1) return;
                Project.projects.splice(i, 1);
                Project.currentProject = Project.projects[0]

                Display.displayProjects(Project.projects)
                Display.displayTodos(Project.currentProject.todos)

                console.log(Project.projects)
            })

            projectText.textContent = projects[i].title
            projectDelete.textContent = "Delete"

            project.appendChild(projectText)
            project.appendChild(projectDelete)

            document.getElementById("projects").appendChild(project)
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

            function editTodo() {
                Display.currentEditingTodo = todo

                document.getElementById("todo-title").value = todo.todo.title
                document.getElementById("desc").value = todo.todo.description
                document.getElementById("duedate").valueAsDate = todo.todo.dueDate
                document.getElementById("priority").value = todo.todo.priority

                document.getElementById("edit-todo-dialog").showModal()
            }

            todoText.addEventListener("click", editTodo)
            todoEdit.addEventListener("click", editTodo)

            todoDelete.addEventListener("click", () => {
                Project.removeTodo(todo.todo)
                Display.displayTodos(Project.currentProject.todos)

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

Display.assignButtons()

Project.addProject(new Project("Home"))

Project.switchCurrentProject(Project.projects[0])
Project.currentProject.createTodo("eat food", "nom", new Date("September 27, 2025"), "high")
Project.currentProject.createTodo("lift weights", "heavy ones", new Date("September 25, 2025"), "normal")

Project.addProject(new Project("Study"))

Project.switchCurrentProject(Project.projects[1])
Project.currentProject.createTodo("read book", "read", new Date("September 26, 2025"), "normal")

Display.displayProjects(Project.projects)
Display.displayTodos(Project.currentProject.todos)