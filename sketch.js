var colorRN;

function setup() {
  createCanvas(600, 400);
  colorRN = (0,0,0);
}

function palette(x, y, c){
  this.x = x;
  this.y = y;
  this.c = c;
  
  fill(c);
  strokeWeight(0);
  rect(this.x, this.y, 25 ,25);
}

function changeColor(c){
  colorRN = c;
}

function draw() {
  let red     = color(255, 0,   0  );
  let orange  = color(255, 165, 0  ); 
  let yellow  = color(255, 255, 0  );
  let green   = color(0,   255, 0  );
  let cyan    = color(0,   255, 255);
  let blue    = color(0,   0 ,  255);
  let purple  = color(255, 0,   255);
  let brown   = color(100, 50,  0  );
  let white   = color(255, 255, 255);
  let black   = color(0  , 0  , 0  );

  
  palette(0, 0, red);
  palette(0, 25, orange);
  palette(0, 50, yellow);
  palette(0, 75, green);
  palette(0, 100, cyan);
  palette(0, 125, blue);
  palette(0, 150, purple);
  palette(0, 175, brown);
  palette(0, 200, white);
  palette(0, 225, black);
  
  if(mouseIsPressed && mouseX <=25 && mouseY <=25){
     changeColor(red);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=50){
     changeColor(orange);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=75){
     changeColor(yellow);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=100){
     changeColor(green);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=125){
     changeColor(cyan);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=150){
     changeColor(blue);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=175){
     changeColor(purple);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=200){
     changeColor(brown);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=225){
     changeColor(white);
   }else if(mouseIsPressed && mouseX <=25 && mouseY <=250){
     changeColor(black);
   }else if(mouseIsPressed){
     stroke(colorRN);
     strokeWeight(3);
     line(mouseX, mouseY, pmouseX, pmouseY);
   }
}
