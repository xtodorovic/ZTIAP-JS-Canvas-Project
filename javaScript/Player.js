
function Player(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.fireRate = 0;
    this.speedX = 0;
    this.speedY = 0; 
    this.angle = 1;   
    this.x = x;
    this.y = y; 
    
    this.draw = function(){
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        var tankImg;
        switch(this.angle)
        {
            case 1: tankImg = document.getElementById("tank1"); break;
            case 2: tankImg = document.getElementById("tank2"); break;
            case 3: tankImg = document.getElementById("tank3"); break;
            case 4: tankImg = document.getElementById("tank4"); break;
            default: break;
        }

        ctx.drawImage(tankImg, this.x, this.y, 50, 50);            
    }
    this.newPos = function() {
        // movements
        let newx = this.x + this.speedX;
        let newy = this.y + this.speedY;

        if (newx >= 0 && this.width + newx <= gameAreaWidth)
        {
            this.x = newx;
        }
        if (newy > 0 && this.height + newy <= gameAreaHeight)
        {
            this.y = newy;
        }
    }
    this.shoot = function() {

        bullets.push(new Bullet({
            x: this.x + this.width/2,
            y: this.y,
            angle: this.angle
        }));
           
    }
}