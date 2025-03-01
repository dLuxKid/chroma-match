import { FormData } from "@/app/product/product-form";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const data = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "assistant",
        content: [
          {
            type: "text",
            text: "You are a renowned stylist with extensive expertise in clothing, fashion trends, and color theory. I will provide you with detailed information about clothing items, including their colors, types (e.g., shirts, shoes, etc.), and contextual details. Your role is to analyze how well these pieces complement each other, offer professional insights to improve the outfit, and recommend additional items or accessories that can enhance the overall look and style.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: generateUserRoleContent(data),
          },
        ],
      },
    ],
    response_format: {
      type: "json_object",
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  try {
    return Response.json({
      status: "success",
      data: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      status: "error",
      message: "Error uploading image",
      error,
    });
  }
}

function generateUserRoleContent(formData: FormData): string {
  let output =
    "Here are the details of the clothes I want to put on:\n can you give me concise \n";

  Object.entries(formData).forEach(([key, item]) => {
    output += `${key}:\n`;
    output += `- Type: ${item.type || "Not specified"}\n`;
    output += `- Brand: ${item.brand || "Not specified"}\n`;
    output += `- Description: ${
      item.description || "No description provided"
    }\n`;

    if (item.image) {
      output += `- Image: (provided)\n`;
    } else {
      output += `- Image: Not provided\n`;
    }

    output += `- Colors:\n`;
    item.imageColors.forEach((color, colorIndex) => {
      output += `  Color ${colorIndex + 1}:\n`;
      output += `    - Hex: ${color.hex}\n`;
      output += `    - Hue: ${color.hue.toFixed(2)}°\n`;
      output += `    - Saturation: ${(color.saturation * 100).toFixed(1)}%\n`;
      output += `    - Lightness: ${(color.lightness * 100).toFixed(1)}%\n`;
    });

    output += `\nPlease return a single JSON object, not for each clothing accessory, but for all with the following properties: 
      - "rating" (a number representing the average rating of the fit(shirts + trousers + shoes), between 1 and 10),
      - "comment" (a nice comment about the fit),
      - "advice" (a short piece of advice to help elevate the fit).\n`;
  });

  return output.trim();
}
