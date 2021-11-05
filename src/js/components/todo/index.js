import { selectComponent, addHtml } from "../../helpers"
import TodoForm from "./todoForm";

export default function todoComponent() {
  const tasksContainer = selectComponent('todo-tasks');
  const todo = selectComponent("");
  let thisTask;

  let tasks = [];

  const addTask = (task) => {
    tasks.push(task);
    taskUpdated();
  }

  const buildTask = () => {
    return `<div class="tasks-item" data-role="tasks-item">
              <div class="tasks-text">${tasks[thisTask].text}</div>
              <div class="tasks-date">${tasks[thisTask].date}</div>
            </div>`;
  };

  const taskUpdated = () => {
    thisTask = tasks.length - 1;
    addHtml({ component: tasksContainer, html: buildTask() });
  }

  const initComponents = () => {
    TodoForm({ addTask });
  }

  const init = () => {
    initComponents();
  }

  init();

  return {
    init,
  };
}
