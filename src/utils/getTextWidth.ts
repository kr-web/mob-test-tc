export const getTextWidth = (
  text: string,
  fontSize = "16px",
  fontFamily = "Pretendard",
  fontWeight = "400",
): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
  const metrics = context.measureText(text);
  return metrics.width;
};
