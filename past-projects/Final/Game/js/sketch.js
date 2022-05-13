let spriteSheetCoin = [];
let spriteSheetChar;
let floor;
let treasure = [];
let count;
let startTime;
let endTime;
let stopTime;
let gameState = 'wait';
let foundCount = 0;
let score = 0;
let highScore = 9999;
let click;
let pressed;
let serialPDM;            // Variable to hold instance of serialport library
let portName = 'COM3';    // Fill in your serial port name here
let sensors;
let MC;
let loc = [0,1,2,3,4,5];
let JSx= 0;
let JSy= 0;
let coinLocPrev;
let colorCur;
let dot;
let isWall = [];

let note = ["C5", "D5", "G5", "A5", "F4", "D4", "G4", "B4"];

const sound = new Tone.Player("media/coin-collect.mp3");
sound.toDestination();


//Squeak noise
let osc = new Tone.AMOscillator(100,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
const filter = new Tone.Filter(1000, "highpass");
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(filter); 
filter.connect(ampEnv);

osc.volume.value = -10;

let freqLFO = new Tone.LFO(2,1000,1500).start();
freqLFO.connect(osc.frequency); 

//Music synth
let synth = new Tone.PolySynth().toDestination();
synth.set({ detune: -1200 });
synth.volume.value = -12;


function preload(){
  count = 8;
  spriteSheetCoin = loadImage("coin.png");
  spriteSheetChar = loadImage("Dude.png");
  floor = loadImage("castle.png");
}

function setup() {
    //Setup the serial port for communication
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  pressed = false;
  click = false;
    // Alias for the sensor Data . You can also just use serialPDM.sensorData...
  sensors = serialPDM.sensorData;
  createCanvas(600, 600);
  imageMode(CENTER);

  

  dot = new Dot(spriteSheetChar, 300, 300, 2);

  treasure[0] = new Treasure(spriteSheetCoin, random(loc));

  wall = new Wall();
  
}

function timer(){
  return int((millis() - startTime) / 1000);
}






function draw() {
  background(255, 255, 255);
  if(sensors.p7==1 && pressed == false){
    click = true;
    pressed = true;
  }else if(sensors.p7==0){
    click = false;
    pressed = false;
  }else{
    click = false;
  }
  
  

  // ellipse(50, 100, 75, 75);
  // ellipse(100, 550, 75, 75);
  // ellipse(315, 440 , 75, 75);
  // ellipse(530,300, 75, 75);
  // ellipse(500,500, 75, 75);
  // ellipse(300,100, 75, 75);

  
  

  JSx = sensors.a2;
  JSy = sensors.a1;


  
  
  if(gameState == 'wait'){
    textSize(30);

    if((frameCount % (60 * 4)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }

    text('press button to start',150, 300);
    if (click){
      startTime = millis();
      gameState = 'playing';
      
    }
  }else if (gameState == 'playing'){
    
    image(floor,300,320,600,540);
    treasure[foundCount].draw();
    
    let time = timer();
    
    if(click)
    {
      treasure[foundCount].find();
    }
    rect(0,   40,  600, 10);
    rect(0,   0,   10,  600);
    rect(590, 0,   10,  600);
    rect(0,   590, 600, 10);
    
    rect(210, 150, 170, 10);
    rect(210, 230, 250, 10);
    rect(460, 360, 140, 10);
    rect(240, 360, 140, 10);
    rect(90,  480, 70,  10);
  
    rect(460, 120, 10, 250);
    rect(80,  290, 10, 200);
    rect(110, 40,  10, 160);
    rect(370, 40,  10, 120);
    rect(380, 360, 10, 250);
    rect(240, 370, 10, 150);
    rect(150, 480, 10, 110);
    fill(0);

    if(score >= 6 && (frameCount % (60 * 1)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }else if(score >= 4 && (frameCount % (60 * 2)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }else if(score >= 2 && (frameCount % (60 * 3)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }else if((frameCount % (60 * 4)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }

    textSize(20);
    text('Time: ' + time, 10, 30);
    text('Score: ' + score+"/8", 110, 30);
    if(highScore == 9999)
      text('  Best Time: None', 210, 30);
    else
      text('  Best Time: ' + highScore, 210, 30);
    
    dot.draw();
    if(score == 8){
      gameState = 'end';
      endTime = millis();
      stopTime = timer();
    }
  }else if(gameState=='end'){
    
    if((frameCount % (60 * 4)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }

    if(stopTime<highScore)
      highScore = stopTime;
    if(millis() - endTime > 1500){
      text("Time: "+ stopTime, 150, 350);
      text("Best Time: "+highScore, 150, 300);
      text("Press button to restart", 150, 400);
      if(click){
        startTime = millis();
        score = 0;
        for(i = 0; i< foundCount; i++)
        {
          treasure.pop();
        }
        foundCount = 0;
        
        treasure[foundCount].found = false;
        treasure[foundCount].location = random(loc);
        dot.x = 300;
        dot.y = 300;
        gameState = 'playing';
      }
    }else{
      textSize(30);
      text("You Win!", 150, 400);
    }
  }
}


class Dot {
  constructor(spriteSheet, x, y, speed)
  {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.facing = 0;
    this.still = true;
  }

  inWall(x1,y1)
  {
    if( (x1>=210 && x1 <= 380 && y1 >= 130 && y1 <= 160) ||
        (x1>=210 && x1 <= 460 && y1 >= 210 && y1 <= 240) ||
        (x1>=460 && x1 <= 600 && y1 >= 340 && y1 <= 370) ||
        (x1>=240 && x1 <= 380 && y1 >= 340 && y1 <= 370) ||
        (x1>=90 && x1 <= 160 && y1 >= 460 && y1 <= 490)  ||

        (x1>=460 && x1 <= 470 && y1 >= 100 && y1 <= 370) ||
        (x1>=80 && x1 <= 90 && y1 >= 280 && y1 <= 490)   ||
        (x1>=110 && x1 <= 120 && y1 >= 20 && y1 <= 200)  ||
        (x1>=370 && x1 <= 380 && y1 >= 20 && y1 <= 160)  ||
        (x1>=380 && x1 <= 390 && y1 >= 340 && y1 <= 600) ||
        (x1>=240 && x1 <= 250 && y1 >= 350 && y1 <= 520) ||
        (x1>=150 && x1 <= 160 && y1 >= 460 && y1 <= 590)
    )
    {
      return true;
    }else
      return false;
  }


  draw() {
    push();
    fill(0);

    let temp;

    if(this.still == true)
    {
      
      image(this.spriteSheet, this.x, this.y, 80, 80, 0, 128, 64, 64);
    }else if(this.facing == 0)
    {
      image(this.spriteSheet, this.x, this.y, 80, 80, 64 * (this.sx+1), 128, 64, 64);
    }
    else if(this.facing == 1)
    {
      image(this.spriteSheet, this.x, this.y, 80, 80, 64 * (this.sx+1), 0, 64, 64);
    }
    else if(this.facing == 2)
    {
      image(this.spriteSheet, this.x, this.y, 80, 80, 64 * (this.sx+1), 64, 64, 64);
    }
    else if(this.facing == 3)
    {
      image(this.spriteSheet, this.x, this.y, 80, 80, 64 * (this.sx+1), 192, 64, 64);
    }
    
    if(frameCount % 5 == 0){
      this.sx = (this.sx +1) % 8;
    }


    if(JSx < 400 && this.x > 36){
      temp = this.x - this.speed;
      if(this.inWall(temp,this.y) == false)
      {
        this.x = temp;
        this.facing = 2;
        this.still = false;
      }
      
    }else if(JSx > 624 && this.x < 568){

      temp = this.x + this.speed;
      if(this.inWall(temp,this.y) == false)
      {
        this.x = temp;
        this.facing = 3;
        this.still = false;
      }
      
    }

    if(JSy < 400 && this.y > 80){
      temp  = this.y - this.speed;
      if(this.inWall(this.x,temp) == false)
      {
        this.y = temp;
        this.facing = 1;
        this.still = false;
      }
    }else if(JSy > 624 && this.y < 560){
      temp = this.y + this.speed;
      if(this.inWall(this.x,temp) == false)
      {
        this.y = temp;
        this.facing = 0;
        this.still = false;
      }
    }
    
    if(JSx > 400 && JSx < 624 && JSy > 400 && JSy < 624){
      this.still = true;
    }
    pop();
  }
}



class Wall {
  constructor(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
  }
  draw(){
    rect(this.x,this.y,this.w,this.h);
  }
}

class Treasure {
  constructor(spriteSheet, location){
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x;
    this.y;
    this.location = location;

    this.found = false;



  }

  draw() {

    if(this.location == 0){
      this.x = 50;
      this.y = 100;
    }else if(this.location == 1){
      this.x = 100;
      this.y = 550;
    }else if(this.location == 2){
      this.x = 315;
      this.y = 440;
    }else if(this.location == 3){
      this.x = 530;
      this.y = 300;
    }else if(this.location == 4){
      this.x = 500;
      this.y = 500;
    }else if(this.location == 5){
      this.x = 300;
      this.y = 100;
    }

    push();
    if(this.found == true)
    {
      image(this.spriteSheet, this.x, this.y, 80, 80, 320, 80, 80, 80);
    }
    else{
      image(this.spriteSheet, this.x, this.y, 80, 80, 80 * (this.sx ), 80 * this.sy, 80, 80);
    }
    if(frameCount % 10 == 0){
      this.sx = (this.sx +1) % 4;
    }
    pop();
  }


  next(){
    let temp = coinLocPrev;
    let done = false;
    while(!done)
    {
      if(temp == coinLocPrev)
      {
        temp = random(loc);
      }
      else {
        done = true;
      }
    }
    append(treasure, new Treasure(spriteSheetCoin, temp));
    coinLocPrev = temp;
  }
    
  find(){
    
    if (dot.x > this.x - 20 && dot.x < this.x + 20 && 
        dot.y > this.y - 20 && dot.y < this.y + 20 && this.found == false)
    {
      this.found = true;
      foundCount++;
      score++;
      sound.start();
      serialPDM.transmit('led',1);
      console.log(serialPDM.sensorsConnected());
      this.next();

    }
  }

}




