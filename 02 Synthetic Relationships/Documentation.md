# Synthetic Relationships

## Proposal and Diagram
The whole installation will be a close loop inspired by the story of Sisyphus's stone. The sevor motor controls the height of the stone while we use a distance sensor to detect it. 
The distance data affects the volume of sound. The microphone detects the volume and we visualize it. 
At the last, a photoresistor senses the brightness to change the sevor motor movement.

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/09d8dc2f-fd24-46ef-90bb-2fa84dbb4f9c)
![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/c6371afe-fc21-4b37-b03f-af3a04e13200)

## Update
We make it a loop which could be closed or open.

![image](https://github.com/pfyuan110/CT3-FA23/assets/113642868/f8649865-ce34-492e-b2e5-e934397af012)
I am responsible for receiving distance data and converting it into volume, and uploading brightness data.

## Code
### Arduino
```
#include "config.h"
#define pResistor A2

AdafruitIO_Feed *myPFeed = io.feed("p_feed");
AdafruitIO_Feed *JYFeed = io.feed("tech3-group-project","JINYU");

void setup() {
  Serial.begin(115200);

  while(! Serial);

  Serial.print("Connecting to Adafruit IO");
  io.connect();

  JYFeed->onMessage(handleMessage);

  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.println(io.statusText());
  JYFeed->get();

  pinMode(pResistor, INPUT);
}

void loop() {
  io.run();

  int value = analogRead(pResistor);

  //Serial.print("sending -> ");
  //Serial.println(value);
  myPFeed->save(value);
  delay(2000);
}

void handleMessage(AdafruitIO_Data *data) {

  //Serial.print("received <- ");
  Serial.println(data->value());
}
```

### Processing
I use processing to play the sound and process distance data into volume.
```
import processing.serial.*;
import processing.sound.*;
SoundFile sFile;

Serial myPort;
static String val;
int getVal = 0;

float sAmp = 0.5;

void setup(){
  String portName = "COM10";
  myPort = new Serial(this, portName, 115200);
  
  sFile = new SoundFile(this, "relax-ambient-music.mp3");
  sFile.loop();
}

void draw(){
  if ( myPort.available() > 0) { 
  val = myPort.readStringUntil('\n'); 
  try {
   getVal = Integer.valueOf(val.trim());
  }
  catch(Exception e) {    //Ignore the error. E.g. Not interger string.
  ;
  }
  println(getVal);
  }
  
  sAmp = map(getVal, 0, 140, 0, 1.0);
  sFile.amp(sAmp);
  
  println(sAmp);
}
```

## Final Installation
![微信图片_20231025205135](https://github.com/pfyuan110/CT3-FA23/assets/113642868/c902a4f0-c7d2-4468-8235-c3a78433113d)

## Data Transfer
- Uploading Data of Photoresistor

![微信截图_20231025201804](https://github.com/pfyuan110/CT3-FA23/assets/113642868/9cb21697-7f8f-4b77-aa93-cecf8751786a)

- Receiving Data from Distance Sensor

![微信截图_20231025202539](https://github.com/pfyuan110/CT3-FA23/assets/113642868/decda7f7-579f-4d8a-9394-e485d8465d06)

## Video
https://vimeo.com/878148501
