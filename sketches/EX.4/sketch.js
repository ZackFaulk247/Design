function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(0, 0, 140);
  noStroke();
  
  fill(256, 256, 256);
  circle(150, 150, 175);
  
  fill(0, 150, 0);
  circle(150, 150, 165);
  
  fill(256, 256, 256);
  star(150, 150, 100, 40, 5);
  
  fill(256, 0 , 0);
  star(150, 150, 80, 30, 5);
  

}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
