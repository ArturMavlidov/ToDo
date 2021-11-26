export default {
  set(tasks) {
    localStorage.setItem("tasks", tasks);
  },

  remove() {
    localStorage.removeItem("tasks");
  },

  update(tasks) {
    this.remove();
    this.set(JSON.stringify(tasks));
  },

  load(fn) {
    const todos = JSON.parse(localStorage.getItem("tasks")) || [];
    todos.forEach((item) => {
      fn(item);
    });
  }
};