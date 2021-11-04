import { selectComponent, selectRole, addHtml } from "../helpers";

export default function addTasks() {
  const todoTasks = selectComponent("todo-tasks");
  const addInput = selectRole("add-input");
  const addButton = selectRole("add-button");

  let inputTask;
  let now;
  let time;
  let date;

  const setDate = () => {
    now = new Date().toLocaleDateString(); // 19.12.2019
    time = new Date().toLocaleTimeString().slice(0, -3);
    date = now + " " + time;
  };

  const newTask = () => {
    return `
      <div class="tasks-item" data-role="tasks-item">
          <div class="tasks-text">${inputTask}</div>
          <div class="tasks-date">${date}</div>
      </div>
    `;
  };

  const buildNewTask = () => {
    addHtml({ component: todoTasks, html: newTask() });
  };

  const clickAddButton = () => {
    inputTask = addInput.value;
    if (inputTask != '') {
      setDate();
      buildNewTask();
      addInput.value = "";
    }
  }

  addButton.addEventListener("click", clickAddButton);
}

addTasks();
