let spriteSheet = [];
let bug = [];
let count;
let startTime;
let endTime;
let gameState = 'wait';
let squishCount = 0;
let score = 0;
let highScore = 0;
let click;
let pressed;
let serialPDM;            // Variable to hold instance of serialport library
let portName = 'COM3';    // Fill in your serial port name here
let sensors;

let JSx= 0;
let JSy= 0;

let dot;

let note = ["C6", "D6", "G6", "A6", "F5", "D5", "G5", "B5"];

const sound = new Tone.Player("media/squish.mp3");
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
  spriteSheet[0] = loadImage("bugYellow.png");
  spriteSheet[1] = loadImage("bugRed.png");
  spriteSheet[2] = loadImage("bugBlue.png");
  spriteSheet[3] = loadImage("bugPurple.png");
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


  dot = new Dot(300, 300, 5);


  for(i = 0; i < count; i++)
  {
    bug[i] = new Bug(random(spriteSheet),
                   random(100, 500),
                   random(100, 500),
                   1+(5*squishCount),
                   random([-1,1]));
  }

  
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
    
    for(i = 0; i< count+squishCount; i++){
      bug[i].draw();
    }
    let time = timer();
    
    if(click)
    {
      for(i = 0; i < count+squishCount; i++){
        bug[i].squish();
      }
    }

    if(time >= 22.5 && (frameCount % (60 * 1)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }else if(time >= 15 && (frameCount % (60 * 2)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+0');
      synth.triggerAttackRelease(random(note), '4n', '+0.25');
      synth.triggerAttackRelease(random(note), '4n', '+0.5');
      synth.triggerAttackRelease(random(note), '4n', '+1');
      synth.triggerAttackRelease(random(note), '4n', '+1.25');
      synth.triggerAttackRelease(random(note), '4n', '+1.5');
    }else if(time >= 7.5 && (frameCount % (60 * 3)) == 1)
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
    text('Score: ' + score, 110, 30);
    if(score>highScore)
      text('High Score: ' + score, 210, 30);
    else
    text('High Score: ' + highScore, 210, 30);
    
    dot.draw();
    if(time >=30){
      gameState = 'end';
      endTime = millis();
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

    if(score>highScore)
      highScore = score;
    if(millis() - endTime > 1500){
      text("Score: "+ score, 150, 350);
      text("High Score: "+highScore, 150, 300);
      text("Press button to restart", 150, 400);
      if(click){
        startTime = millis();
        score = 0;
        for(i = 0; i< squishCount; i++)
        {
          bug.pop()
        }
        squishCount = 0;
        for(i = 0; i< count; i++)
        {
          bug[i].squished = false;
          bug[i].go(random([1,-1]));
        }
        
        gameState = 'playing';
      }
    }else{
      textSize(30);
      text("Game Over", 150, 400);
    }
  }
}


class Dot {
  constructor(x, y, speed)
  {
    this.x = x;
    this.y = y;
    this.speed = speed;

  }

  draw() {
    push();
    fill(0);
    ellipse(this.x,this.y, 20 ,20);

    if(JSx < 400 && this.x > 10){
      this.x -= this.speed;
    }else if(JSx > 624 && this.x < 590){
      this.x += this.speed;
    }

    if(JSy < 400 && this.y > 10){
      this.y -= this.speed;
    }else if(JSy > 624 && this.y < 590){
      this.y += this.speed;
    }
    // translate(this.x, this.y);
    pop();
  }

}




class Bug {
  constructor(spriteSheet, x, y, speed, move){
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x= x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
    this.speed = speed;
    this.move = move;
    this.facing = move;
    this.squished = false;



  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing,1);
    
    if(this.move == 0)
    {
      
      rotate(PI / 180 * 90);
      image(this.spriteSheet, 0, 0, 80, 80, 0, 80, 80, 80);
    }
      
    else 
    {
      
      rotate(PI / 180 * 90);
      image(this.spriteSheet, 0, 0, 80, 80, 80 * (this.sx + 1), 80 * this.sy, 80, 80);
    }
      
   
    
      
    
    if(frameCount % 1 == 0){
      this.sx = (this.sx +1) % 7;
    }
    this.x += this.speed*this.move;

    if (this.x < 30){
      this.move = 1;
      this.facing = 1;
    }
    else if(this.x > width - 30){
      this.move = -1;
      this.facing = -1;
    }

    pop();
  }


  go(direction){
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  

  stop(){
    this.move = 0;
  }
    
  squish(){
    
    if (dot.x > this.x - 20 && dot.x < this.x + 20 && 
        dot.y > this.y - 20 && dot.y < this.y + 20 && this.squished == false)
    {
      this.squished = true;
      squishCount++;
      score++;
      this.stop();
      sound.start();
      serialPDM.transmit('led',1);
      console.log(serialPDM.sensorsConnected());
      append(bug, new Bug(random(spriteSheet),  random(100, 500),random(100, 500), 1+(.1*squishCount), random([-1,1])));

    }
  }

}
