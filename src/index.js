import TodoComponent from "./js/components/todo";
import "./scss/main.scss";
import "./css/main.css";
import { selectRole } from "./js/helpers";

document.addEventListener('DOMContentLoaded', () => {
  const todo = selectRole("todo");
  todo && TodoComponent(todo);
})
