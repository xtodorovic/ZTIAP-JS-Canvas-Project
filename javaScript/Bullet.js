
// Bullet Class
function Bullet(bullet) {
    this.active = true;
    this.color = "yellow";
    this.speed = 7;
    this.width = 4;
    this.height = 8;
    this.x = bullet.x;
    this.y = bullet.y;
    this.angle = bullet.angle;
    
    this.inBounds = function(){
        return this.x >= 0 && this.x <= canvas.width &&
           this.y >= 0 && this.y <= canvas.height;
    }
    this.draw = function(){
        ctx.fillStyle = this.color;
        switch(this.angle){
            case 1: ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case 2: ctx.fillRect(this.x +tank.height/2, this.y+tank.width/2, this.height, this.width );
                break;
            case 3: ctx.fillRect(this.x, this.y+tank.height, this.width, this.height);
                break;
            case 4: ctx.fillRect(this.x-tank.height/2, this.y+tank.height/2, this.height, this.width );
                break;
            default: break;
        }
        
    }
    this.update = function() {
        switch(this.angle){
            case 1: this.y -= this.speed;
                break;
            case 2: this.x += this.speed;
                break;
            case 3: this.y += this.speed;
                break;
            case 4: this.x-= this.speed;
                break;
            default: break;
        }
        this.active = this.inBounds() && this.active;
    }
    this.die = function() {
        this.active = false;
    }
  }

  bullets.forEach(function(bullet) {
    bullet.update();
  });

  bullets.forEach(function(bullet) {
    bullet.draw();
  });