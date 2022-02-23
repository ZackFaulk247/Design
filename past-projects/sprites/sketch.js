let spriteSheet = [];
let character = [];
let count;

function preload(){
  count = random(8, 16)
  spriteSheet[0] = loadImage("Purple.png");
  spriteSheet[1] = loadImage("Green.png");
  spriteSheet[2] = loadImage("SpelunkyGuy.png");
  spriteSheet[3] = loadImage("Meatboy.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);

  for(i = 0; i < count; i++)
  {
    character[i] = new Character(random(spriteSheet),  50 + 50 * random(10), 50 + 50 * random(9));
  }

  
}

function keyPressed(){
  if(keyCode == RIGHT_ARROW)
  {
    for(i = 0; i < count; i++)
      character[i].go(1);

  }else if (keyCode == LEFT_ARROW)
  {
    for(i = 0; i < count; i++)
      character[i].go(-1);
  }
}

function keyReleased(){
  for(i = 0; i < count; i++)
      character[i].stop();
}


function draw() {
  background(255, 255, 255);
  for(i = 0; i < count; i++)
      character[i].draw();
}




class Character {
  constructor(spriteSheet, x, y){
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x= x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing,1);
    
    if(this.move == 0)
      image(this.spriteSheet, 0, 0, 80, 80, 0, 0, 80, 80);
    else 
      image(this.spriteSheet, 0, 0, 80, 80, 80 * (this.sx + 1), 80 * this.sy, 80, 80);
   
    
      
    
    if(frameCount % 5 == 0){
      this.sx = (this.sx +1) % 8;
    }
    this.x += 2*this.move;
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
    
  

}