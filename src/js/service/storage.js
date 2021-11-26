export default {
  set(tasks) {
    localStorage.setItem("tasks", tasks);
  },

  remove() {
    localStorage.removeItem("tasks");
  },

  get(fn) {
    const todos = JSON.parse(localStorage.getItem("tasks")) || [];

    if (fn) {
      todos.forEach((item) => {
        fn(item);
      });
    }

    return todos;
  },

  update(tasks) {
    this.remove();
    this.set(JSON.stringify(tasks));
  }
};