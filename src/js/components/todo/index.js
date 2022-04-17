import {
  selectComponent,
  addHtml,
  closestRole,
  selectId,
  selectRole,
  selectRoles,
  buildTask,
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
    updateTasks(task);
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
    const taskIcons = selectRoles("task-icon", taskItem);
    taskIcons.forEach((icon) => icon.classList.toggle("dn"));
  };

  const handleEditCancel = ({ target }) => {
    const taskItem = closestRole(target, "task-wrapper");
    const taskInput = selectRole("task-value", taskItem);
    const task = tasks.find((item) => item.id == taskItem.dataset.id);

    taskInput.value = task.text;
    taskInput.setAttribute("readonly", true);
    showIcons(taskItem);
  };

  const handleEditAccept = ({ target }) => {
    const taskItem = closestRole(target, "task-wrapper");
    const taskInput = selectRole("task-value", taskItem);
    taskInput.setAttribute("readonly", true);

    if (taskInput.value.trim() != "") {
      showIcons(taskItem);
      const task = tasks.find((item) => item.id == taskItem.dataset.id);
      return (task.text = taskInput.value);
    }

    handleEditCancel({ target });
  };

  const attachEditEvents = (taskItem) => {
    const taskCancel = selectRole("task-cancel", taskItem);
    const taskAccept = selectRole("task-accept", taskItem);

    taskCancel.addEventListener("click", handleEditCancel);
    taskAccept.addEventListener("click", handleEditAccept);
  };

  const handleTaskDelete = (taskItem) => {
    const taskCloseId = taskItem.dataset.id;
    tasks = tasks.filter((item) => item.id != taskCloseId);
    taskItem.remove();
    return StorageService.update(tasks);
  };

  const handleTaskEdit = (taskEdit, taskItem) => {
    if (!taskEdit) return;

    const taskInput = selectRole("task-value", taskItem);

    showIcons(taskItem);
    taskInput.removeAttribute("readonly");
    taskInput.focus();
    taskInput.selectionStart = taskInput.value.length;
    return attachEditEvents(taskItem);
  };

  const handleTaskDone = (taskItem, icon) => {
    const { id: taskId } = taskItem.dataset;
    const targetTask = tasks.find((item) => item.id == taskId);

    icon.classList.toggle('active');

    targetTask.isDone = !targetTask.isDone;
    updateUi(targetTask);
    StorageService.update(tasks);
  };

  const clickTasksContainer = ({ target }) => {
    const taskItem = closestRole(target, "task-wrapper");
    const taskClose = closestRole(target, "task-close");
    const taskEdit = closestRole(target, "task-edit");
    const taskDone = closestRole(target, "task-done");

    if (!taskItem) return;

    if (taskDone) return handleTaskDone(taskItem, taskDone);
    if (taskClose) return handleTaskDelete(taskItem);
    handleTaskEdit(taskEdit, taskItem);

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

  const updateTasks = (task) => {
    addHtml({ component: tasksContainer, html: buildTask(task) });
  };

  const initComponents = () => {
    TodoForm({ addTask });
    Filters({ showTasks, getTasks, context });
    SearchPanel({ showTasks, getTasks, context });
  };

  const pageUpdated = () => {
    StorageService.get(updateTasks);
    tasks = StorageService.get();
  };

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
