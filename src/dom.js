export class Display {
    static displayProjects(projects) {
        document.getElementById("projects").innerHTML = ""
        for (let i = 0; i < projects.length; i++) {
            const projectText = document.createElement("p")
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