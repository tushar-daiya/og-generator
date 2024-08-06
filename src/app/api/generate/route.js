import { getLines } from "@/app/utils/linesWrap";
import crypto from "crypto";
import { put } from "@vercel/blob";
import { loadImage } from "canvas";
import { createCanvas } from "canvas";
import path from "path";
import { registerFont } from "canvas";
export async function POST(req, res) {
  try {
    const { title, description, author, image } = await req.json();
    if (!title || !description || !author) {
      return new Response("Missing required fields", { status: 400 });
    }
    const logoPath = path.resolve(process.cwd(), "public/logo.png");
    const avatarPath = path.resolve(process.cwd(), "public/avatar.png");
    const poppins = path.resolve(process.cwd(), "public/Poppins-Regular.ttf");
    const poppinsBold = path.resolve(process.cwd(), "public/Poppins-Bold.ttf");
    registerFont(poppins, { family: "Poppins", weight: "normal" });
    registerFont(poppinsBold, { family: "Poppins", weight: "bold" });
    const id = crypto.randomUUID();
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
      const avatar = await loadImage(avatarPath);
      ctx.drawImage(avatar, 50, 50, 80, 80);
      ctx.font = `bold ${descSize}px , Poppins`;
      ctx.fillStyle = lightTextColor;
      ctx.fillText(author, 140, descSize + 72);
      ctx.font = `bold ${headingSize}px , Poppins`;
      ctx.fillStyle = textColor;
      const lines = getLines(ctx, title, maxWidth, maxHeadingLines);
      let y = 40 + 100 + headingSize + lineHeight;
      lines.forEach((line) => {
        ctx.fillText(line, 50, y);
        y += headingSize + lineHeight;
      });
      ctx.font = `normal ${descSize}px , Poppins`;
      ctx.fillStyle = textColor;
      const descLines = getLines(ctx, description, maxWidth, maxDescLines);
      y =
        40 +
        100 +
        lines.length * (headingSize + lineHeight) +
        descSize +
        lineHeight +
        20;
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
      const avatar = await loadImage(avatarPath);
      ctx.drawImage(avatar, 50, 50, 80, 80);
      ctx.font = `bold ${descSize}px , Poppins`;
      ctx.fillStyle = bgColor;
      ctx.fillText(author, 140, descSize + 72);
    }

    const logo = await loadImage(logoPath);
    ctx.drawImage(logo, 1050, 40, 100, 100);
    const blob = await put(`opengraph/${id}.png`, canvas.toBuffer(), {
      access: "public",
    });
    return new Response(blob.url, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
