import { selectRole } from "../../../helpers";

export default function filters({ showTasks, tasks }) {
  const btnAll = selectRole("btn-all");
  const btnDone = selectRole("btn-done");

  const clickBtnDone = () => {
    let doneTasks = tasks.filter((task) => task.isDone == true)
    showTasks(doneTasks);
  };

  const clickBtnAll = () => {
    showTasks(tasks);
  }

  const bindEvents = () => {
    btnDone.addEventListener("click", clickBtnDone);
    btnAll.addEventListener("click", clickBtnAll);
  };

  const unbindEvents = () => {
    btnDone.removeEventListener("click", clickBtnDone);
    btnAll.removeEventListener("click", clickBtnAll);
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
