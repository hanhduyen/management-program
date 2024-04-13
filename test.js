var listContainer = document.getElementsByClassName("container");

function openForm() {
  document.getElementById("form-container").showModal(); 
};

function closeForm() {
  document.getElementById("form-container").close();
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
  let data = ev.dataTransfer.getData("Text");
  ev.target.appendChild(document.getElementById(data));
  ev.preventDefault();
}

const STATUS = {
    TODO: "todo",
    DOING: "doing",
    BLOCKED: "blocked",
    COMPLETED: "completed",
  };
  
var listTask = [
    {
      id: 1,
      category: "marketing",
      title: "title",
      content: "content",
      status: STATUS.TODO,
    },
    {
      id: 2,
      category: "marketing1",
      title: "title1",
      content: "content",
      status: STATUS.TODO,
    },
    {
      id: 3,
      category: "marketing2",
      title: "title2",
      content: "content",
      status: STATUS.DOING,
    },
  ];
  function addTask(){
    var newTask = {
      id: listTask.length + 1,
      category: document.getElementById("category").value,
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      status: document.getElementById("status").value,
    };
    listTask.push(newTask);
  }
  
  function addOrUpdateTask() {
    var id = document.getElementById("id").value;
    if (id != undefined){
      var task = listTask.find(findId);
      function findId(task) {
        return task.id == id;
      }
      task.category = document.getElementById("category").value;
      task.title = document.getElementById("title").value;
      task.content = document.getElementById("content").value;
      task.status = document.getElementById("status").value;
    } else {
      addTask();
    }
    closeForm();
    setTaskInPanel();
    saveList();
  }

 
  function removeOldTask() {
    //Get Todo list
    var myTodoList = document.getElementById("todo-listbox");
    myTodoList.innerHTML = "";
    //Get Doing list
    var myDoingList = document.getElementById("doing-listbox");
    myDoingList.innerHTML = "";
    //Get Completed list
    var myCompletedList = document.getElementById("done-listbox");
    myCompletedList.innerHTML = "";
    //Get Blocked list
    var myBlockedList = document.getElementById("blocked-listbox");
    myBlockedList.innerHTML = "";
    saveList();
  }
  
  function setHeaderTask() {
    // todo
    var todoHeader =
      '<div class="todo-list" > \
            <span>Todo</span> \
            <span class="number" id="TodoCount"></span>\
          </div>';
  
    var child = document.createElement("div");
    child.innerHTML = todoHeader;
    child = child.firstChild;
  
    document.getElementById("todo-listbox").appendChild(child);

    //doing
    var doingHeader =
    `<div class="doing-list"> \
          <span>Doing</span> \
          <span class="number" id="doingCount"></span> \
        </div>`;

    var child =document.createElement("div");
    child.innerHTML = doingHeader;
    child = child.firstChild;
    document.getElementById("doing-listbox").appendChild(child);

    //completed
    var completedHeader =
    `<div class="done-list"> \
          <span>Completed</span> \
          <span class="number" id="completedCount"></span> \ 
        </div>`;
    
    var child = document.createElement("div");
    child.innerHTML = completedHeader;
    child = child.firstChild;
    document.getElementById("done-listbox").appendChild(child);

    //blocked
    var blockedHeader =
    `<div class="blocked-list"> \
          <span>Blocked</span> \
          <span class="number" id="blockedCount"></span> \
        </div>`;

    var child = document.createElement("div");
    child.innerHTML = blockedHeader;
    child = child.firstChild;
    document.getElementById("blocked-listbox").appendChild(child);
    saveList();
  }
  
  function setTaskInPanel() {
    // Clear old task and set header again
    removeOldTask();
    setHeaderTask();
  
    // Set task in list
    listTask.forEach((task) => {
      var taskStringHTML = `<div class="card" id="${task.id}"> 
          <div class="title"> \
              <p>${task.category}</p> \
              <i onclick="editTask(this)" class="fa-solid fa-pen"></i> \
              <i onclick="removeTask(this)" class="fa-solid fa-trash-can"></i>\
            </div> \
            <b>${task.title}</b> \
            <div class="line"></div> \
            <p> \
              ${task.content}\
            </p>\
          </div>
          </div>`;
  
      var child = document.createElement("div");
      child.innerHTML = taskStringHTML;
      child = child.firstChild;
  
      // Task to do
      if (task.status == STATUS.TODO) {
        document.getElementById("todo-listbox").appendChild(child);
      };
      //Task doing
      if(task.status == STATUS.DOING) {
        document.getElementById("doing-listbox").appendChild(child);
      };
      //Task done
      if(task.status == STATUS.COMPLETED) {
        document.getElementById("done-listbox").appendChild(child);
      };
      //Task blocked
      if(task.status == STATUS.BLOCKED) {
        document.getElementById("blocked-listbox").appendChild(child);
      };
    });
  
    //Update number of task
    document.getElementById("TodoCount").innerText = listTask.filter(
      (task) => task.status == STATUS.TODO
    ).length;

    document.getElementById("doingCount").innerText = listTask.filter(
      (task) => task.status == STATUS.DOING
    ).length;

    document.getElementById("completedCount").innerText = listTask.filter(
      (task) => task.status == STATUS.COMPLETED
    ).length;

    document.getElementById("blockedCount").innerText = listTask.filter(
      (task) => task.status == STATUS.BLOCKED
    ).length;
    saveList();

  };

  function removeTask(element) {
    var parent = element.parentNode.parentNode;
    // Get id of card
    var id = parent.getAttribute("id");
    var newListTaskAfterRemove = listTask.filter(findId);
    function findId(task){
      return task.id != id;
    }
    console.log(newListTaskAfterRemove);
    listTask = newListTaskAfterRemove;
    setTaskInPanel();
    saveList();
  }

  function editTask(element) {
    var parent = element.parentNode.parentNode;
    var id = parent.getAttribute("id");
    var task = listTask.find(findId);
    function findId(task){
      return task.id == id;
    }
    openForm();
    document.getElementById("category").value = task.category;
    document.getElementById("title").value = task.title;
    document.getElementById("content").value = task.content;
    document.getElementById("status").value = task.status;
    document.getElementById("id").value = task.id;
    saveList();
  }

  function saveList(){
    let string = JSON.stringify(listTask)
    localStorage.setItem("data", string);
  }

  function showList() {
    var data = localStorage.getItem("data");
    var listTaskStorage = JSON.parse(data);
    console.log(listTaskStorage);
    if(listTaskStorage.length != 0){
      listTask = listTaskStorage;
    }
  }

  showList();
  
 