// Request the ChatGPT
import { config } from 'dotenv';
config()

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getResponse = async () => {
    const response = await openai.completions.create ({
        model: "gpt-3.5-turbo",
        prompt: "Say this is a test.",
        max_tokens: 7,
        temperature: 0,
      });

    console.log(response);
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