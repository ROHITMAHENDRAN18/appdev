// ===============================
// Task Management App
// ===============================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// ===============================
// Load Tasks
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

// ===============================
// Add Task
// ===============================

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        addTask();
    }

});

function addTask(){

    let text = taskInput.value.trim();

    if(text === ""){

        alert("Please enter a task.");

        return;
    }

    tasks.push({

        text:text,

        completed:false

    });

    saveTasks();

    displayTasks();

    taskInput.value="";

}

// ===============================
// Display Tasks
// ===============================

function displayTasks(){

    taskList.innerHTML="";

    tasks.forEach(function(task,index){

        let li=document.createElement("li");

        if(task.completed){

            li.classList.add("completed");

        }

        let span=document.createElement("span");

        span.innerText=task.text;

        // Button Container

        let buttons=document.createElement("div");

        buttons.className="buttons";

        // Complete Button

        let completeBtn=document.createElement("button");

        completeBtn.innerText= task.completed ? "Undo" : "Complete";

        completeBtn.className="complete-btn";

        completeBtn.onclick=function(){

            tasks[index].completed=!tasks[index].completed;

            saveTasks();

            displayTasks();

        };

        // Delete Button

        let deleteBtn=document.createElement("button");

        deleteBtn.innerText="Delete";

        deleteBtn.className="delete-btn";

        deleteBtn.onclick=function(){

            if(confirm("Delete this task?")){

                tasks.splice(index,1);

                saveTasks();

                displayTasks();

            }

        };

        buttons.appendChild(completeBtn);

        buttons.appendChild(deleteBtn);

        li.appendChild(span);

        li.appendChild(buttons);

        taskList.appendChild(li);

    });

    updateCounter();

}

// ===============================
// Counter
// ===============================

function updateCounter(){

    let total=tasks.length;

    let completed=tasks.filter(task=>task.completed).length;

    let pending=total-completed;

    totalTasks.innerText=total;

    completedTasks.innerText=completed;

    pendingTasks.innerText=pending;

}

// ===============================
// Local Storage
// ===============================

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

// ===============================
// Clear All
// ===============================

clearAll.addEventListener("click",function(){

    if(tasks.length===0){

        alert("No tasks available.");

        return;

    }

    if(confirm("Are you sure you want to clear all tasks?")){

        tasks=[];

        saveTasks();

        displayTasks();

    }

});