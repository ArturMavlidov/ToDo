import { selectRole } from "../../../helpers";
import { v4 } from "uuid";

export default function todoForm({ addTask }) {
  const addInput = selectRole("add-input");
  const todoForm = selectRole("todo-form");
  let date;

  const setDate = () => {
    let now = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString().slice(0, -3);
    date = now + " " + time;
  };

  const getTask = () => {
    setDate();

    return {
      text: addInput.value,
      date: date,
      isDone: false,
      id: v4(),
    };
  };

  const sendForm = (e) => {
    e.preventDefault();
    if (getTask().text.trim() != "") {
      addTask(getTask());
    }
    addInput.value = "";
  };

  todoForm.addEventListener("submit", sendForm);
}
