export const buildTask = (lastTask) => {
  const doneClass = lastTask.isDone ? "done" : " ";
  return `<div class="tasks-wrapper ${doneClass}" data-role="task-wrapper" data-id="${lastTask.id}">
              <div class="task-item" data-role="task-item">
                <input type="text" class="tasks-text" value="${lastTask.text}" data-role="task-value" readonly/>
                <div class="tasks-date">${lastTask.date}</div>
              </div>
              <div class="task-icons" data-role="task-icons">
                <svg class="task-icon task-close" data-role="task-close task-icon" width="16" height="16">
                  <use xlink:href="#close"></use>
                </svg>
                <svg class="task-icon task-edit" data-role="task-edit task-icon" width="16" height="16">
                  <use xlink:href="#edit"></use>
                </svg>
                <svg class="task-icon task-done" data-role="task-done task-icon" width="16" height="16">
                  <use xlink:href="#done"></use>
                </svg>
                <svg class="task-icon cancel dn" data-role="task-cancel task-icon" width="16" height="16">
                  <use xlink:href="#cancel"></use>
                </svg>
                <svg class="task-icon accept dn" data-role="task-accept task-icon" width="20" height="20">
                  <use xlink:href="#accept"></use>
                </svg>
              </div>
            </div>`;
};
