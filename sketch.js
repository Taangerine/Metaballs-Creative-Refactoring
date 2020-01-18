new p5();

/******************
 * Blob Object Type
 *******************/

var blob = function(x, y, speed) {
  this.x = x;
  this.y = y;
  let angle = random(0, 2 * PI);
  this.xspeed = speed * Math.cos(angle);
  this.yspeed = speed * Math.sin(angle);
  this.r = random(120, 240);
}

blob.prototype.update = function() {

  this.x += this.xspeed;
  this.y += this.yspeed;

  if (this.x > width || this.x < 0) {
    this.xspeed *= -1;

    if (this.xspeed > 0) {
      this.xspeed += 0.5;
    } else if (this.xspeed < 0) {
      this.xspeed -= 0.5;
    }
  }

  if (this.y > height || this.y < 0) {
    this.yspeed *= -1;
    if (this.yspeed > 0) {
      this.yspeed += 0.5;
    } else if (this.yspeed < 0) {
      this.yspeed -= 0.5;
    }

  }
}

/******************
 * Colorblob Object Type
 *******************/

var Colorblob = function(x, y, speed) {
  blob.call(this, x, y, speed);
}

Colorblob.prototype = Object.create(blob.prototype);

Colorblob.prototype.draw = function() {
  fill(0);
  stroke(0);
  strokeWeight(4);
  ellipse(this.x, this.y, this.r / 4, this.r / 4);

}

Colorblob.prototype.colTrue = function() {

  var collision;

  if (this.x > width || this.x < 0) {
    collision = true;
  } else if (this.y > height || this.y < 0) {
    collision = true;
  } else {
    collision = false;
  }

  return (collision);
}

/******************
 * Main Program
 *******************/

var colorBlob3 = [];

function setup() {
  createCanvas(400, 200);
  colorMode(HSB);
  for (i = 0; i < 10; i++) colorBlob3.push(new Colorblob(random(0, width), random(0, height), 5));
}

var drawScene = function() {
  background(51);
  for (d = 0; d < colorBlob3.length; d++) {
    colorBlob3[d].draw();
  }
}

var totalCount = 0;
var collision;

function draw() {

  collision = false;

  for (u = 0; u < colorBlob3.length; u++) {
    colorBlob3[u].update();
  }

  for (b = 0; b < colorBlob3.length; b++) {
    collision = colorBlob3[b].colTrue();
    if (collision == true) {
      totalCount++;
    }
  }

  drawScene();

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < colorBlob3.length; i++) {
        let xdif = x - colorBlob3[i].x;
        let ydif = y - colorBlob3[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += 10 * colorBlob3[i].r / d;
      }
      set(x, y, color(sum, 255, 255));
    }
  }

  updatePixels();
  textSize(25);
  text(totalCount, 350, 30);

}
