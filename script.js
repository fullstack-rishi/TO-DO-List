// GET ELEMENTS
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskHours = document.getElementById("taskHours");
const taskMinutes = document.getElementById("taskMinutes");
const ampm = document.getElementById("ampm");
const priority = document.getElementById("priority");

const todo = document.getElementById("todo");
const progress = document.getElementById("progress");
const done = document.getElementById("done");
const pending = document.getElementById("pending");

const stats = document.getElementById("stats");
const calendarDate = document.getElementById("calendarDate");
const calendarTasks = document.getElementById("calendarTasks");

const dashboard = document.getElementById("dashboard");
const tasksSection = document.getElementById("tasksSection");
const calendar = document.getElementById("calendar");

// LOAD TASKS
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
taskDate.value = new Date().toISOString().split("T")[0];

// ADD TASK
function addTask() {
  if(!taskInput.value || !taskTime.value) {
    alert("Fill all fields");
    return;
  }

  let [h,m] = taskTime.value.split(":");
  h = parseInt(h);

  if(ampm.value==="PM" && h<12) h+=12;
  if(ampm.value==="AM" && h===12) h=0;

  let hours = parseInt(taskHours.value) || 0;
  let minutes = parseInt(taskMinutes.value) || 0;

  tasks.push({
    text:taskInput.value,
    date:taskDate.value,
    time:`${h}:${m}`,
    display:taskTime.value+" "+ampm.value,
    priority:priority.value,
    status:"todo",
    hours,minutes,
    completed:false,
    notified:false,
    missed:false,
    timerEnd:null
  });

  save(); render();
}

// RENDER
function render(){
  todo.innerHTML="";
  progress.innerHTML="";
  done.innerHTML="";
  pending.innerHTML="";

  let completed=0;

  tasks.forEach((t,i)=>{
    let cls = t.completed?"completed":t.missed?"missed":"";
    if(t.completed) completed++;

    let percent = 0;

    if (t.status === "progress" && t.timerEnd) {
      let total = (t.hours * 3600000) + (t.minutes * 60000);
      let remaining = t.timerEnd - Date.now();
      percent = Math.max(0, Math.min(100, 100 - (remaining / total) * 100));
    }

    const card=document.createElement("div");
    card.className="task-card "+cls;

    card.innerHTML=`
      <strong>${t.text}</strong><br>
      <small>${t.display}</small><br>
      <span class="tag ${t.priority}">${t.priority}</span>

      <div class="progress mt-2">
        <div class="progress-bar" style="width:${percent}%"></div>
      </div>

      <div class="mt-2">
        <button onclick="move(${i})" class="btn btn-success btn-sm">➜</button>
        <button onclick="editTask(${i})" class="btn btn-warning btn-sm">✏</button>
        <button onclick="deleteTask(${i})" class="btn btn-danger btn-sm">🗑</button>
        <button onclick="reschedule(${i})" class="btn btn-secondary btn-sm">⏰</button>
      </div>
    `;

    if(t.status==="todo") todo.appendChild(card);
    else if(t.status==="progress") progress.appendChild(card);
    else done.appendChild(card);

    if(t.missed && !t.completed){
      pending.appendChild(card.cloneNode(true));
    }
  });

  stats.innerText = `Total: ${tasks.length} | Completed: ${completed}`;
}

// MOVE
function move(i){
  if(tasks[i].status==="todo") {
    tasks[i].status="progress";

    let duration = (tasks[i].hours*3600000)+(tasks[i].minutes*60000);

    if(duration === 0){
      alert("Set duration first");
      return;
    }

    tasks[i].timerEnd = Date.now() + duration;
  }
  else {
    tasks[i].status="done";
    tasks[i].completed=true;
  }

  save(); render();
}

// EDIT
function editTask(i){
  const txt=prompt("Edit:",tasks[i].text);
  if(txt) tasks[i].text=txt;
  save(); render();
}

// DELETE
function deleteTask(i){
  if(confirm("Delete?")){
    tasks.splice(i,1);
    save(); render();
  }
}

// RESCHEDULE
function reschedule(i){
  const newTime=prompt("New time (HH:MM):",tasks[i].time);
  if(newTime){
    tasks[i].time=newTime;
    tasks[i].notified=false;
  }
  save(); render();
}

// REMINDER SYSTEM
setInterval(()=>{
  const now = new Date();

  tasks.forEach(t=>{
    const [y,m,d]=t.date.split("-");
    const [h,min]=t.time.split(":");

    const taskTime=new Date(
      parseInt(y),
      parseInt(m)-1,
      parseInt(d),
      parseInt(h),
      parseInt(min)
    );

    const diff=(now-taskTime)/1000;

    if(!t.completed && !t.notified && diff >= 0){
      const ok = confirm("⏰ "+t.text+"\nStart task?");

      if(ok){
        let duration = (t.hours*3600000)+(t.minutes*60000);

        if(duration === 0){
          alert("Set duration first");
          return;
        }

        t.status="progress";
        t.timerEnd = Date.now() + duration;
      } else {
        t.missed=true;
      }

      t.notified=true;
    }

    if(t.status==="progress" && t.timerEnd){
      if(Date.now() >= t.timerEnd){
        t.status="done";
        t.completed=true;
        t.timerEnd=null;
        alert("✅ Task Completed!");
      }
    }

    if(!t.completed && diff > 300){
      t.missed=true;
    }
  });

  save(); render();

},1000);

// CALENDAR
calendarDate.onchange=()=>{
  calendarTasks.innerHTML="";
  const d=calendarDate.value;

  tasks.filter(t=>t.date===d).forEach(t=>{
    const div=document.createElement("div");
    div.className="task-card";
    div.innerText = `${t.text} - ${t.display}`;
    calendarTasks.appendChild(div);
  });
};

// NAVIGATION
function showSection(sec){
  dashboard.style.display="none";
  tasksSection.style.display="none";
  calendar.style.display="none";

  if(sec==="dashboard") dashboard.style.display="block";
  if(sec==="tasks") tasksSection.style.display="block";
  if(sec==="calendar") calendar.style.display="block";
}

// SAVE
function save(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

render();