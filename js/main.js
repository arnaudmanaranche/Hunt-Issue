// Replace the current link by your own link 
var hunt_issue = new Firebase("https://hunt-issue.firebaseio.com/");

function loadExistingTasks() {
    var tasks = hunt_issue;
    tasks.once("value", function(snapshot) {
        var tasksList = document.getElementById("tasks");
        if (snapshot.hasChildren()) {
            tasksList.innerHTML = "";
            snapshot.forEach(function(dataSnapshot) {
                insertNewTask(dataSnapshot);
            });
        } else {
            tasksList.innerHTML = "Everything is fine.";
        }
    }, function(errorObject) {
        console.log("Failed to read from Firebase: " + errorObject.code);
    });
};

function addTaskHandler(e) {
    if (e.keyCode == 13) {
        var tasksUrl = hunt_issue;
        tasksUrl.push({
            text: this.value,
            completed: false
        });
        tasksUrl.once('child_added', function(dataSnapshot) {
            insertNewTask(dataSnapshot);
            document.getElementById("newTodo").value = '';
        });
    }
};

function insertNewTask(dataSnapshot) {
    var tasksList = document.getElementById("tasks").querySelector("ul");
    if (tasksList === null) {
        document.getElementById("tasks").innerHTML = "";
        var tasksList = document.createElement("ul");
        document.getElementById("tasks").appendChild(tasksList);
    }
    newTask = buildNewTaskRow(dataSnapshot);
    tasksList.appendChild(newTask);
};

function buildNewTaskRow(dataSnapshot) {
    var obj = dataSnapshot.val();
    var newLiElement = document.createElement("li");
    newLiElement.id = "task-" + dataSnapshot.key();
    newLiElement.className = obj.completed ? 'completed' : '';
    newLiElement.textContent = obj.text
    var newCheckboxElement = document.createElement("input");
    newCheckboxElement.type = 'checkbox'
    newCheckboxElement.setAttribute('data-id', dataSnapshot.key())
    newCheckboxElement.checked = obj.completed
    if (obj.completed) {
        document.totalCompleted++;
        document.getElementById("clearCompletedTasks").className = '';
    }
    newCheckboxElement.addEventListener('change', updateTask);
    var newSpanElement = document.createElement("span");
    newSpanElement.setAttribute('data-id', dataSnapshot.key());
    newSpanElement.textContent = 'X';
    newSpanElement.addEventListener('click', deleteTaskElement);
    newLiElement.appendChild(newCheckboxElement);
    newLiElement.appendChild(newSpanElement);
    return newLiElement;
};

function updateTask(e) {
    var id = e.target.attributes['data-id'].value;
    var task = hunt_issue.child(id);
    task.update({ completed: e.target.checked });
    task.once('value', function(childSnapshot) {
        e.target.parentElement.className = (e.target.checked ? 'completed' : '')
        if (e.target.checked) {
            document.totalCompleted++;
        } else {
            document.totalCompleted--;
        }
        hideShowCompletedTasksButton();
    });
};

function deleteTaskElement(e) {
    if (e.target.parentElement.children[0].checked) {
        document.totalCompleted--;
    }
    removeTask(e.target);
};

function hideShowCompletedTasksButton() {
    if (document.totalCompleted > 0) {
        document.getElementById("clearCompletedTasks").className = '';
    } else {
        document.getElementById("clearCompletedTasks").className = 'disabled';
    }
}

function removeTask(element) {
    var id = element.attributes['data-id'].value;
    var task = hunt_issue.child(id);
    task.remove(function(error) {
        if (error) {
            console.log("Failed to delete from Firebase: " + error);
        } else {
            element.parentElement.remove();
            var tasksList = document.getElementById("tasks").querySelector("ul");
            if (tasksList.children.length == 0) {
                tasksList.parentElement.innerHTML = "Everything is fine.";
            }
            hideShowCompletedTasksButton();
        }
    });
}

function clearCompletedTasks(e) {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'checkbox' && inputs[i].checked == true) {
            document.totalCompleted--;
            removeTask(inputs[i]);
        }
    }
};
document.addEventListener('DOMContentLoaded', function() {
    document.totalCompleted = 0;
    loadExistingTasks();
    document.getElementById("newTodo").addEventListener('keyup', addTaskHandler);
    document.getElementById("clearCompletedTasks").addEventListener('click', clearCompletedTasks);
}, false);
