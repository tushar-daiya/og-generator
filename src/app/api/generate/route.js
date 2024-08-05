import { getLines } from "@/app/utils/linesWrap";
import { loadImage } from "canvas";
import { createCanvas } from "canvas";
import fs from "fs";
export async function POST(req, res) {
  try {
    const { id, title, desc, author, image } = await req.json();
    console.log(id);
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");
    const bgColor = "#fff";
    const textColor = "#000";
    const lightTextColor = "rgba(0, 0, 0, 0.6)";
    const headingSize = 40;
    const descSize = 30;
    const maxWidth = 1100;
    const lineHeight = 10;
    const maxHeadingLines = 4;
    const maxDescLines = 5;
    if (!image) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const avatar = await loadImage("./src/assets/avatar.png");
      ctx.drawImage(avatar, 50, 50, 80, 80);
      ctx.font = `bold ${descSize}px , sans-serif`;
      ctx.fillStyle = lightTextColor;
      ctx.fillText(author, 140, descSize + 72);
      ctx.font = `bold ${headingSize}px , sans-serif`;
      ctx.fillStyle = textColor;
      const lines = getLines(ctx, title, maxWidth, maxHeadingLines);
      let y = 40 + 100 + headingSize + lineHeight; // Starting y position for the title
      lines.forEach((line) => {
        ctx.fillText(line, 50, y);
        y += headingSize + lineHeight;
      });
      ctx.font = `normal ${descSize}px , sans-serif`;
      ctx.fillStyle = textColor;
      const descLines = getLines(ctx, desc, maxWidth, maxDescLines);
      y =
        40 +
        100 +
        lines.length * (headingSize + lineHeight) +
        descSize +
        lineHeight +
        20; // Starting y position for the description
      descLines.forEach((line) => {
        ctx.fillText(line, 50, y);
        y += descSize + lineHeight;
      });
      const linearGradient = ctx.createLinearGradient(
        0,
        canvas.height - 100,
        0,
        canvas.height
      );
      linearGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      linearGradient.addColorStop(1, "#fff");
      ctx.fillStyle = linearGradient;
      ctx.fillRect(0, 530, canvas.width, canvas.height);
    } else {
      const imageUrl = await loadImage(image);
      ctx.drawImage(imageUrl, 0, 0, 1200, 630);
      const linearGradient = ctx.createLinearGradient(0, 0, 0, 200);
      linearGradient.addColorStop(0, "rgba(0,0,0,1)");
      linearGradient.addColorStop(0.3, "rgba(0,0,0,0.7)");
      linearGradient.addColorStop(0.6, "rgba(0,0,0,0.5)");
      linearGradient.addColorStop(0.8, "rgba(0,0,0,0.2)");
      linearGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = linearGradient;
      ctx.fillRect(0, 0, canvas.width, 200);
      const avatar = await loadImage("./src/assets/avatar.png");
      ctx.drawImage(avatar, 50, 50, 80, 80);
      ctx.font = `bold ${descSize}px , sans-serif`;
      ctx.fillStyle = bgColor;
      ctx.fillText(author, 140, descSize + 72);
    }

    const logo = await loadImage("./src/assets/logo.png");
    ctx.drawImage(logo, 1050, 40, 100, 100);
    const out = fs.createWriteStream(`./public/opengraph/${id}.png`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      return new Response(JSON.stringify({ message: "ok" }));
    });
    return new Response(JSON.stringify({ message: "something wrong" }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "something wrong" }));
  }
}
