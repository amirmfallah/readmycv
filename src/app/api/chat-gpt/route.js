import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const params = await request.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "I will send you my CV, based on my CV create a readme file for my github profile.",
      },
      {
        role: "user",
        content: params.prompt, // user promps
      },
    ],
  });
  return NextResponse.json(response);
}
