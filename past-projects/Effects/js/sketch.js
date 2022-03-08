let spriteSheet;
let mrMouse;

const synth = new Tone.Synth();
const mono = new Tone.MonoSynth();
const metal = new Tone.PluckSynth();

const filter = new Tone.Filter(1000, "highpass");
const reverb = new Tone.JCReverb(0.4).toDestination();


synth.connect(filter);
mono.connect(filter);
metal.connect(filter);

filter.connect(reverb);



let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function preload(){
  count = 8;
  spriteSheet = loadImage("mouse.png");
}

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


function draw() {
  background(255, 192, 203);
  

  
  mrMouse.draw();
}




class Mouse {
  constructor(){

    this.petted = false;



  }

  draw() {
    push();
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
      synth.triggerAttackRelease('C4', '8n');
      metal.triggerAttackRelease('C4', '8n');
      mono.triggerAttackRelease('C4', '8n')


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