const input = document.querySelector("input");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("ul");

let tasks = []


//Even listenr for addition of task 
addBtn.addEventListener("click", addTask)
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
})

function addTask() {
    const inputText = input.value.trim();

    if (!inputText) return;

    const task = {
        id: Date.now(),
        text: inputText
    };

    tasks.push(task);
    saveTasks();
    renderTask(task);
    input.value = "";

}
function renderTask(task){
const li = document.createElement("li");
const span = document.createElement("span");
const deleteBtn = document.createElement("button");
deleteBtn.classList.add("delete-btn");

deleteBtn.textContent = "🗑️";

span.textContent = task.text;


deleteBtn.addEventListener("click", () => {
    li.remove();
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
});

li.appendChild(span);
li.appendChild(deleteBtn);
list.appendChild(li);
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


function loadTasks(){
    const stored = localStorage.getItem("tasks");
    if(stored){
        tasks = JSON.parse(stored);
        tasks.forEach(renderTask);
    }
}

loadTasks()