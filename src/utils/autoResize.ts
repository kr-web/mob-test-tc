export const autoResize = (el: HTMLTextAreaElement) => {
  el.style.height = "auto";

  const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
  const minHeight = lineHeight + 6;
  el.style.height = Math.max(el.scrollHeight, minHeight) + "px";
};
