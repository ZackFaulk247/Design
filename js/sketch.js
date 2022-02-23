let sounds = new Tone.Players(
  {
    'pluck': 'media/pluck.mp3',
    'drum': 'media/drum.mp3',
    'electric': 'media/electric.mp3',
    'spock' : 'media/spock.mp3'
  }
)

const delay = new Tone.FeedbackDelay("8n", 0.5);
let slider;





function setup() {
  createCanvas(400, 250);
  sounds.connect(delay);
  delay.toDestination();

  slider = createSlider(0., 1., 0.5, 0.05);
  slider.mouseReleased( ()=>{
    delay.delayTime.value = slider.value();
  })

  textSize(30);
  text('delay', 50, 240);

  let purple  = color(155, 0,   155);
  button = createButton('drum');
  button.style('font-size', '50px');
  button.style('background-color', purple);
  button.position(5,5);
  button.mousePressed( () => playSound('drum')   );

  button = createButton('electric');
  button.style('font-size', '50px');
  button.style('background-color', purple);
  button.position(205,5);
  button.mousePressed( () => playSound('electric')   );

  button = createButton('pluck');
  button.style('font-size', '50px');
  button.style('background-color', purple);
  button.position(5,105);
  button.mousePressed( () => playSound('pluck')   );

  button = createButton('spock');
  button.style('font-size', '50px');
  button.style('background-color', purple);
  button.position(205,105);
  button.mousePressed( () => playSound('spock')   );
}



function draw() {
  
}

function keyPressed(){
  if (keyCode === UP_ARROW) {
    sounds.Players.start();
  }
}

function playSound(whichSound='shot') {
  sounds.player(whichSound).start();

}