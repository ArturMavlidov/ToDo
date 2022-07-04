import TodoComponent from "./js/components/todo";
import ThemeComponent from "./js/components/theme";
import "./scss/main.scss";
import { selectRole } from "./js/helpers";

document.addEventListener("DOMContentLoaded", () => {
  const todo = selectRole("todo");
  const themeBtn = selectRole("theme-btn");

  todo && TodoComponent(todo);
  themeBtn && ThemeComponent(themeBtn);
});
