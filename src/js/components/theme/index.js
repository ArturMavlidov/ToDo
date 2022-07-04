export default function theme(context) {
  let isThemeLight = localStorage.getItem("theme") === "light";

  console.log(isThemeLight);

  const switchThemeToDark = () => {
    localStorage.setItem("theme", "dark");
    isThemeLight = false;
    document.body.classList.add("dark");
    context.classList.add("active");
  };

  const switchThemeToLight = () => {
    localStorage.setItem("theme", "light");
    isThemeLight = true;
    document.body.classList.remove("dark");
    context.classList.remove("active");
  };

  const handleSwitchTheme = () => {
    isThemeLight ? switchThemeToDark() : switchThemeToLight();
  };

  const checkTheme = () => {
    isThemeLight ? switchThemeToLight() : switchThemeToDark();
  };

  const bindEvents = () => {
    context.addEventListener("click", handleSwitchTheme);
  };

  const unbindEvents = () => {};

  const init = () => {
    checkTheme();
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
