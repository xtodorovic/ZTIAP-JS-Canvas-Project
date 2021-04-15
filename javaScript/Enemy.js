
function enemy(width, height, x, y, type)
{
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 1;
    this.x = x;
    this.y = y;
    this.type = type;
    this.draw = function(){
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        var enemy1 = document.getElementById("enemy1");
      /*  switch(this.angle)
        {
            case 1: tankImg = document.getElementById("tank1"); break;
            case 2: tankImg = document.getElementById("tank2"); break;
            case 3: tankImg = document.getElementById("tank3"); break;
            case 4: tankImg = document.getElementById("tank4"); break;
            default: break;
        }*/

        ctx.drawImage(enemy1, this.x, this.y, 50, 50);
    }
    this.direction = function(){
        let direction = getRandomInt(5);
            if(direction == 1){
                this.speedX = 0;
                this.speedY = -2;
            }else if (direction == 2){
                this.speedY = 0;
                this.speedX = 2;
            }else if (direction == 3){
                this.speedY = 2;
                this.speedX = 0;
            }else if (direction == 4){
                this.speedY = 0;
                this.speedX = -2;
            }
            else{
                this.speedX = 0;
                this.speedY = 0;
            }
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
}

setInterval(function(){
    for(i = 0; i < enemies.length; i++)
    {
        enemies[i].direction(); 
    }  
      
}, 1000);