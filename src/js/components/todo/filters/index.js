import { selectRole } from "../../../helpers";

export default function filters({ showTasks, getTasks, context }) {
  const btnAll = selectRole("btn-all", context);
  const btnDone = selectRole("btn-done", context);

  const clickBtnDone = () => {
    showTasks(getTasks(true));
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
