import { selectRole } from "../../../helpers";

export default function filters({ showTasks, tasks, getTasks }) {
  const btnAll = selectRole("btn-all");
  const btnDone = selectRole("btn-done");

  const clickBtnDone = () => {
    showTasks(getTasks('done'));
  };

  const clickBtnAll = () => {
    showTasks(getTasks());
  };

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
  };

  const destroy = () => {
    unbindEvents();
  };

  init();

  return {
    init,
    destroy,
  };
}
