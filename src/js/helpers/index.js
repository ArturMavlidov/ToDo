export const qs = (selector, context = null) =>
  (context || document).querySelector(selector);

export const qsa = (selector, context = null) =>
  (context || document).querySelectorAll(selector);

export const selectRole = (role, context = null) =>
  qs(`[data-role~="${role}"]`, context);

export const selectRoles = (selector, context = null) =>
  qsa(`[data-role~="${selector}"]`, context);

export const selectComponent = (component, context = null) =>
  qs(`[data-component~="${component}"]`, context);

export const selectComponents = (component = "*", context = null) =>
  qsa(
    component === "*" ? "[data-component]" : `[data-component~="${component}"]`,
    context
  );

export const addHtml = ({ component, place = "beforeend", html }) => {
  component.insertAdjacentHTML(`${place}`, `${html}`);
};
