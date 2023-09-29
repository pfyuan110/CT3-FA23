// import { config } from 'dotenv';
// config()

// import OpenAI from "openai";

let textfield;
let output;

let lines;
let words;
let pgh;

let allW = [];
let emojis = ["🧑", "🧑", "🙇", "🙇‍♀️"];
let imgs = [];
let pops = [];

let seed = 0;
let op = 0;
let x, y, xspeed, yspeed;

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const getResponse = async () => {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: "Could you extract one animal word in this paragraph randomly? Please respone me with lowercase word only.   Beasts of England, beasts of Ireland,Beasts of every land and clime, Hearken to my joyful tidings Of the golden future time. Soon or late the day is coming, Tyrant Man shall be o’erthrown, And the fruitful fields of England Shall be trod by beasts alone. Rings shall vanish from our noses, And the harness from our back, Bit and spur shall rust forever, Cruel whips no more shall crack. Riches more than mind can picture, Wheat and barley, oats and hay, Clover, beans, and mangel-wurzels Shall be ours upon that day. Bright will shine the fields of England, Purer shall its waters be, Sweeter yet shall blow its breezes On the day that sets us free. For that day we all must labour, Though we die before it break; Cows and horses, geese and turkeys, All must toil for freedom’s sake. Beasts of England, beasts of Ireland, Beasts of every land and clime, Hearken well and spread my tidings Of the golden future time" }],
//         model: "gpt-3.5-turbo",
//       });

//     //console.log(completion.choices[0].message.content);
//     genWord = completion.choices[0].message.content;
//     console.log(genWord);
// }

//document.getElementById("trigger").addEventListener("click", getResponse);
//getResponse();

function preload() {
  imgs.push(loadImage("pic/beasts.png"));
  imgs.push(loadImage("pic/chicken.png"));
  imgs.push(loadImage("pic/cow.png"));
  imgs.push(loadImage("pic/future.png"));
  imgs.push(loadImage("pic/goose.png"));
  imgs.push(loadImage("pic/pig.png"));
}

function setup() {
  let canvas = createCanvas(380, 720);
  canvas.position(0, 0);
  
  colorMode(HSB, 100);

  textfield = select("#input");
  output = select("#output");
  newText();
}

function draw() {
  background(0);

  for (let p of pops) {
    p.show();
    p.move();
  }
}

function newText() {
  let s = textfield.value();
  lines = s.split(/\n/);

  for (let i = 0; i < lines.length; i++) {
    let pgh = createP();
    pgh.parent(output);

    words = lines[i].split(/(\W+)/);
    for (let j = 0; j < words.length; j++) {
      let span = createSpan(words[j]);
      span.parent(pgh);

      if (/s$/.test(words[j])) {
        allW.push(span);
      }
    }
  }
}

function keyPressed() {
  //getResponse();
  seed = int(random(0, allW.length));
  op = int(random(0, 3));
  //console.log(op);

  if (op == 0) {
    let c = color(random(15), 100, 100);
    allW[seed].style("background-color", c);
    allW[seed].html("human");
  } else if (op == 1) {
    allW[seed].html(random(emojis));
  } else if (op == 2) {
    pops.push(new Pop());
  }
}