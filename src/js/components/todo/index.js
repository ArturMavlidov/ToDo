import { selectComponent, addHtml, closestRole, selectId } from "../../helpers";

import TodoForm from "./todoForm";
import Filters from "./filters";
import SearchPanel from "./search-panel";
import StorageService from "../../service/storage";


export default function todoComponent(context) {
  const tasksContainer = selectComponent("todo-tasks", context);
  let tasks = [];

  const addTask = (task) => {
    tasks.push(task);
    taskUpdated(task);
    StorageService.set(JSON.stringify(tasks));
  };

  const showTasks = (tasks) => {
    tasksContainer.innerHTML = "";

    tasks.forEach((item) => {
      addHtml({
        component: tasksContainer,
        html: buildTask(item)
      })
    });
  };

  const clickTasksContainer = ({ target }) => {
    const taskItem = closestRole(target, "task-wrapper");
    const taskClose = closestRole(target, "task-close");

    if (!taskItem) return;

    if (taskClose) {
      const taskCloseId = taskItem.dataset.id;
      tasks = tasks.filter((item) => item.id != taskCloseId);
      taskItem.remove();
      return StorageService.update(tasks);
    }

    const { id: taskId } = taskItem.dataset;
    const targetTask = tasks.find((item) => item.id == taskId);
    targetTask.isDone = !targetTask.isDone;
    updateUi(targetTask);
    StorageService.update(tasks);
  };

  const updateUi = ({ id, isDone }) => {
    const taskWrapper = selectId(id);
    isDone
      ? taskWrapper.classList.add("done")
      : taskWrapper.classList.remove("done");
  };

  const buildTask = (lastTask) => {
    const doneClass = lastTask.isDone ? "done" : " ";
    return `<div class="tasks-wrapper ${doneClass}" data-role="task-wrapper" data-id="${lastTask.id}">
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

  const getTasks = (isDone) => {
    if (isDone) {
      return tasks.filter((task) => task.isDone == true);
    } else {
      return tasks
    }
  }

  const taskUpdated = (task) => {
    addHtml({ component: tasksContainer, html: buildTask(task) });
  };

  const initComponents = () => {
    TodoForm({ addTask });
    Filters({ showTasks, getTasks, context });
    SearchPanel({ showTasks, getTasks, context });
  };

  const pageUpdated = () => {
    StorageService.get(taskUpdated);
    tasks = StorageService.get();
  }

  const bindEvents = () => {
    tasksContainer.addEventListener("click", clickTasksContainer);
  };

  const init = () => {
    initComponents();
    bindEvents();
    pageUpdated();
  };

  init();

  return {
    init,
  };
}
