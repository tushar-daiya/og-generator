export function getLines(ctx, text, maxWidth, maxLines) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      if (lines.length === maxLines) {
        break;
      }
      currentLine = word;
    }
  }

  if (lines.length < maxLines) {
    lines.push(currentLine);
  }
  if (lines.length === maxLines) {
    let lastLine = lines[maxLines - 1];
    while (ctx.measureText(lastLine + "...").width > maxWidth) {
      lastLine = lastLine.slice(0, -1);
    }
    lines[maxLines - 1] = lastLine + "...";
  }

  return lines;
}
