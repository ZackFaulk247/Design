let slider;
let slider1;


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

function setup() {
  createCanvas(400, 400);
  synth.release = 2;
  synth.resonance = .98;

  slider = new Nexus.Slider('#slider');
  slider.on('change', function(v){
    reverb.roomSize.value = v;
  })
  slider1 = new Nexus.Slider('#slider1');
  slider1.on('change', function(t){
    filter.frequency.value = t*5000;
  })

  

  
}



function draw() {

}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);

  synth.triggerAttackRelease(toPlay, '8n');
  metal.triggerAttackRelease(toPlay, '8n', );
  mono.triggerAttackRelease(toPlay, '8n')
}