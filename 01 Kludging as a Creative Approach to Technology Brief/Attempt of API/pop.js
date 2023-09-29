class Pop {
    constructor() {
      this.r = 50;
      this.x = random(380);
      this.y = random(720);
  
      this.xspeed = 1;
      this.yspeed = 1;
  
      this.pic = imgs[int(random(0, imgs.length))];
    }
  
    show() {
      image(this.pic, this.x, this.y, this.r, this.r);
    }
  
    move() {
      this.x += this.xspeed;
      this.y += this.yspeed;
  
      if (this.x + this.r >= width) {
        this.xspeed = -this.xspeed;
        this.x = width - this.r;
      } else if (this.x <= 0) {
        this.xspeed = -this.xspeed;
        this.x = 0;
      }
  
      if (this.y + this.r >= height) {
        this.yspeed = -this.yspeed;
        this.y = height - this.r;
      } else if (this.y <= 0) {
        this.yspeed = -this.yspeed;
        this.y = 0;
      }
    }
  }  