import { selectRole } from "../../../helpers";

export default function searchPanel({ showTasks, getTasks, context }) {
  const searchInput = selectRole("search-input", context);

  const search = ({ target: { value } }) => {
    const tasks = getTasks();
    const searchTasks = tasks.filter(( item ) => item.text.toLowerCase().includes(value.toLowerCase()));
    showTasks(searchTasks);
  };

  const bindEvents = () => {
    searchInput.addEventListener("input", search);
  };

  const unbindEvents = () => {};

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
