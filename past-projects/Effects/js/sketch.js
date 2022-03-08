let spriteSheet;
let mrMouse;
let petMe;

function preload(){
  count = 8;
  spriteSheet = loadImage("mouse.png");
  petMe = loadImage("pet.png");
}

//Squeak noise
let osc = new Tone.AMOscillator(400,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
const filter = new Tone.Filter(5000, "highpass");
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

let freqLFO = new Tone.LFO(5,600,3000).start();
freqLFO.connect(osc.frequency); 

//Music synth
let synth = new Tone.PolySynth().toDestination();
synth.set({ detune: -1200 });
synth.volume.value = -12;


function setup() {
  createCanvas(400, 270);
  imageMode(CENTER);
  synth.release = 2;
  synth.resonance = .98;
  mrMouse = new Mouse();
}


function mousePressed(){
  mrMouse.squeak();
}
function touchStarted(){
  mrMouse.squeak();
}


function mouseReleased(){
  mrMouse.petted = false;
}
function touchEnded(){
  mrMouse.petted = false;
}

let note = ["C6", "E6", "G6", "B6", "C5", "E5", "G5", "B5"];


function draw() {
  background(255, 192, 203);
  Tone.start();
  
  if((frameCount % (60 * 8)) == 1)
    {
      synth.triggerAttackRelease(random(note), '4n', '+2');
      synth.triggerAttackRelease(random(note), '4n', '+2.25');
      synth.triggerAttackRelease(random(note), '4n', '+2.5');
      synth.triggerAttackRelease(random(note), '4n', '+3');
      synth.triggerAttackRelease(random(note), '4n', '+3.25');
      synth.triggerAttackRelease(random(note), '4n', '+3.5');
      synth.triggerAttackRelease(random(note), '4n', '+6');
      synth.triggerAttackRelease(random(note), '4n', '+6.25');
      synth.triggerAttackRelease(random(note), '4n', '+6.5');
      synth.triggerAttackRelease(random(note), '4n', '+7');
      synth.triggerAttackRelease(random(note), '4n', '+7.25');
      synth.triggerAttackRelease(random(note), '4n', '+7.5');
    }


  mrMouse.draw();
}




class Mouse {
  constructor(){

    this.petted = false;



  }

  draw() {
    push();
    image(petMe, 200, 210,);
    if(this.petted == false)
    {
      image(spriteSheet, 180, 100, 240, 144, 0, 0, 240, 144 );
    }
    else 
    {
      image(spriteSheet, 180, 100, 240, 144, 240, 0, 240, 144 );
    }
    pop();
  }



  

  

  squeak(){

      this.petted = true;
      // synth.triggerAttackRelease('C5', '8n');
      ampEnv.triggerAttackRelease('8n');


  //   if (mouseX > this.x - 120 && mouseX < this.x + 120 && 
  //       mouseY > this.y - 120 && mouseY < this.y + 120 && this.petted == false)
  //   {
  //     this.petted = true;
  //     synth.triggerAttackRelease('C4', '8n');
  //     metal.triggerAttackRelease('C4', '8n');
  //     mono.triggerAttackRelease('C4', '8n')
  //     this.stop();
  //   }
  }
}