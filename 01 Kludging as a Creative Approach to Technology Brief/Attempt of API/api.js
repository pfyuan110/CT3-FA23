import { config } from 'dotenv';
config()

import OpenAI from "openai";

const genWord = new String;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getResponse = async () => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Could you extract one animal word in this paragraph randomly? Please respone me with lowercase word only.   Beasts of England, beasts of Ireland,Beasts of every land and clime, Hearken to my joyful tidings Of the golden future time. Soon or late the day is coming, Tyrant Man shall be o’erthrown, And the fruitful fields of England Shall be trod by beasts alone. Rings shall vanish from our noses, And the harness from our back, Bit and spur shall rust forever, Cruel whips no more shall crack. Riches more than mind can picture, Wheat and barley, oats and hay, Clover, beans, and mangel-wurzels Shall be ours upon that day. Bright will shine the fields of England, Purer shall its waters be, Sweeter yet shall blow its breezes On the day that sets us free. For that day we all must labour, Though we die before it break; Cows and horses, geese and turkeys, All must toil for freedom’s sake. Beasts of England, beasts of Ireland, Beasts of every land and clime, Hearken well and spread my tidings Of the golden future time" }],
        model: "gpt-3.5-turbo",
      });

    //console.log(completion.choices[0].message.content);
    genWord = completion.choices[0].message.content;
    console.log(genWord);
}

//document.getElementById("trigger").addEventListener("click", getResponse);
getResponse();