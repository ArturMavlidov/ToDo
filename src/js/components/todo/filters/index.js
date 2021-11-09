import { selectRole } from "../../../helpers";

export default function filters({ showDoneTask, tasks }) {
  const btnAll = selectRole("btn-all");
  const btnDone = selectRole("btn-done");

  const clickBtnDone = () => {
    console.log(tasks);
    showDoneTask((tasks.filter((task) => task.isDone == true)));
  };

  const bindEvents = () => {
    btnDone.addEventListener("click", clickBtnDone);
  };

  const unbindEvents = () => {
    btnDone.removeEventListener("click", clickBtnDone);
  };

  const init = () => {
    bindEvents();
  }

  const destroy = () => {
    unbindEvents();
  };

  init();

  return {
    init,
    destroy
  };
}
