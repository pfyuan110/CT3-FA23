// Request the ChatGPT
import { config } from 'dotenv';
config()

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getResponse = async () => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });

    console.log(completion.choices[0]);
}

getResponse();

//Models list
// async function main() {
//     const list = await openai.models.list();
  
//     for await (const model of list) {
//       console.log(model);
//     }
//   }
//   main();

// function setup() {
//     createCanvas(400, 400);
//   }
  
//   function draw() {
//     background(220);
//   }