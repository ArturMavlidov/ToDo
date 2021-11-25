import { selectRole } from "../../../helpers";
import { v4 } from "uuid";

export default function todoForm({ addTask }) {
  const addInput = selectRole("add-input");
  const formButton = selectRole("add-button");
  let now;
  let time;
  let date;

  const setDate = () => {
    now = new Date().toLocaleDateString();
    time = new Date().toLocaleTimeString().slice(0, -3);
    date = now + " " + time;
  };

  const getTask = () => {
    setDate();

    return {
      text: addInput.value,
      date: date,
      isDone: false,
      id: v4()
    };
  };

  const clickFormButton = () => {
    if (getTask().text.trim() != "") {
      addTask(getTask());
    }
    addInput.value = "";
  };

  const pressEnter = (event) => {
    if (event.code === "Enter") {
      clickFormButton();
    }
  };

  addInput.addEventListener("keyup", pressEnter);
  formButton.addEventListener("click", clickFormButton);
}