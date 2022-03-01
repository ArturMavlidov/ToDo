import {
  selectComponent,
  addHtml,
  closestRole,
  selectId,
  selectRole,
  buildTask
} from "../../helpers";

import TodoForm from "./todo-form";
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
        html: buildTask(item),
      });
    });
  };

  const showIcons = (taskItem) => {
    const taskClose = selectRole("task-close", taskItem);
    const taskEdit = selectRole("task-edit", taskItem);
    const taskCancel = selectRole("task-cancel", taskItem);
    const taskAccept = selectRole("task-accept", taskItem);

    taskClose.classList.toggle("dn");
    taskEdit.classList.toggle("dn");
    taskCancel.classList.toggle("dn");
    taskAccept.classList.toggle("dn");
  };

  const handleEditCancel = ({target}) => {
    const taskItem = closestRole(target, "task-wrapper");
    const taskInput = selectRole("tasks-value", taskItem);
    const task = tasks.find(item => item.id == taskItem.dataset.id);
    taskInput.value = task.text;
    taskInput.setAttribute("readonly", true);
    showIcons(taskItem);
  }

  const handleEditAccept = ({ target }) => {
    const taskItem = closestRole(target, "task-wrapper");
    const taskInput = selectRole("tasks-value", taskItem);
    taskInput.setAttribute("readonly", true);

    if (taskInput.value.trim() != '') {
      showIcons(taskItem);
      const task = tasks.find((item) => item.id == taskItem.dataset.id);
      return task.text = taskInput.value;
    }

    handleEditCancel({ target });
  };

  const attachEditEvents = (taskItem) => {
    const taskCancel = selectRole("task-cancel", taskItem);
    const taskAccept = selectRole("task-accept", taskItem);

    taskCancel.addEventListener("click", handleEditCancel);
    taskAccept.addEventListener("click", handleEditAccept);
  };

  const handleTaskDelete = (target, taskItem) => {
    const taskCloseId = taskItem.dataset.id;
    tasks = tasks.filter((item) => item.id != taskCloseId);
    taskItem.remove();
    return StorageService.update(tasks);
  };

  const handleTaskEdit = (taskEdit, taskItem) => {
    if (!taskEdit) return;

    const taskInput = selectRole("tasks-value", taskItem);
    showIcons(taskItem);
    taskInput.removeAttribute("readonly");
    taskInput.focus();
    taskInput.selectionStart = taskInput.value.length;
    return attachEditEvents(taskItem);
  };

  const clickTasksContainer = ({ target }) => {
    const taskClose = closestRole(target, "task-close");
    const taskItem = closestRole(target, "task-wrapper");
    const taskEdit = closestRole(target, "task-edit");

    if (!taskItem) return;

    if (taskClose)
    return handleTaskDelete(target, taskItem);
    handleTaskEdit(taskEdit, taskItem);

    StorageService.update(tasks);
  };

  const changeDoneStatus = ({ target }) => {
    const taskItem = closestRole(target, "task-wrapper");
    if (!taskItem) return;
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

  const getTasks = (isDone) => {
    if (isDone) {
      return tasks.filter((task) => task.isDone == true);
    } else {
      return tasks;
    }
  };

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
  };

  const bindEvents = () => {
    tasksContainer.addEventListener("click", clickTasksContainer);
    tasksContainer.addEventListener("dblclick", changeDoneStatus);
  };

  const init = () => {
    initComponents();
    bindEvents();
    pageUpdated();
    const taskValue = selectRole("tasks-value");
  };

  init();

  return {
    init,
  };
}
