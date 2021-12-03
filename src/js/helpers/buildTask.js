export const buildTask = (lastTask) => {
  const doneClass = lastTask.isDone ? "done" : " ";
  return `<div class="tasks-wrapper ${doneClass}" data-role="task-wrapper" data-id="${lastTask.id}">
              <div class="tasks-item" data-role="tasks-item">
                <input type="text" class="tasks-text" value="${lastTask.text}" data-role="tasks-value" readonly/>
                <div class="tasks-date">${lastTask.date}</div>
              </div>
              <div class="task-icons" data-role="task-icons">
                <svg class="task-close" data-role="task-close" width="16" height="16">
                  <use xlink:href="#close"></use>
                </svg>
                <svg class="task-edit" data-role="task-edit" width="16" height="16">
                  <use xlink:href="#edit"></use>
                </svg>
                <svg class="cancel dn" data-role="task-cancel" width="16" height="16">
                  <use xlink:href="#cancel"></use>
                </svg>
                <svg class="accept dn" data-role="task-accept" width="20" height="20">
                  <use xlink:href="#accept"></use>
                </svg>
              </div>
            </div>`;
};
