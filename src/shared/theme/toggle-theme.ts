export function toggleTheme() {
  const current = document.documentElement.dataset["theme"];

  if (current === "dark") document.documentElement.dataset["theme"] = "light";
  else document.documentElement.dataset["theme"] = "dark";
}
