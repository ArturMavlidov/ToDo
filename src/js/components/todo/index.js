import {
  selectComponent,
  addHtml,
  replaceHtml,
  closestRole,
  selectId,
} from "../../helpers";

import TodoForm from "./todoForm";
import filters from "./filters";

export default function todoComponent() {
  const tasksContainer = selectComponent("todo-tasks");
  let tasks = [];

  const addTask = (task) => {
    tasks.push(task);
    taskUpdated(task);
  };

  const showDoneTask = (tasks) => {
    tasksContainer.innerHTML = '';

    tasks.forEach(item => {
      addHtml({ component: tasksContainer, html: buildTask(item, "done") });
    })
  }

  const clickTasksContainer = ({ target }) => {
    const taskItem = closestRole(target, "task-wrapper");
    const taskClose = closestRole(target, "task-close");

    if (!taskItem) return;

    if (taskClose) {
      const taskCloseId = taskItem.dataset.id;
      tasks = tasks.filter((item) => item.id != taskCloseId);
      return taskItem.remove();
    }

    const { id: taskId } = taskItem.dataset;
    const targetTask = tasks.find((item) => item.id == taskId);
    targetTask.isDone = !targetTask.isDone;
    updateUi(targetTask);
  };

  const updateUi = ({ id, isDone }) => {
    const taskWrapper = selectId(id);
    isDone
      ? taskWrapper.classList.add("done")
      : taskWrapper.classList.remove("done");
  };

  const bindEvents = () => {
    tasksContainer.addEventListener("click", clickTasksContainer);
  };

  const buildTask = (lastTask, activeClass = '') => {
    return `<div class="tasks-wrapper ${activeClass}" data-role="task-wrapper" data-id="${lastTask.id}">
              <div class="tasks-item" data-role="tasks-item">
                <div class="tasks-text">${lastTask.text}</div>
                <div class="tasks-date">${lastTask.date}</div>
              </div>
              <div class="tasks-close" data-role="task-close">
                <svg width="16" height="16">
                  <use xlink:href="#icon"></use>
                </svg>
              </div>
            </div>`;
  };

  const taskUpdated = (task) => {
    addHtml({ component: tasksContainer, html: buildTask(task) });
  };

  const initComponents = () => {
    TodoForm({ addTask });
    filters({ showDoneTask, tasks });
  };

  const init = () => {
    initComponents();
    bindEvents();
  };

  init();

  return {
    init,
  };
}
