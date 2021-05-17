var enemyCount=0;
var enemyMax;
var spawnX = 15;
var shootInterval = 1000;
var spawnInterval = 5000;
var enemyTotal=0;

function enemy(width, height, x, y, type)
{
    this.active = true;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 3;
    this.x = x;
    this.y = y;
    this.type = type;
    this.draw = function(){
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        var enemy1img;
        switch(this.angle)
        {
            case 1: enemy1img = document.getElementById("enemy1"); break;
            case 2: enemy1img = document.getElementById("enemy2"); break;
            case 3: enemy1img = document.getElementById("enemy3"); break;
            case 4: enemy1img = document.getElementById("enemy4"); break;
            default: break;
        }

        ctx.drawImage(enemy1img, this.x, this.y, 50, 50);
    }
    this.direction = function(){
        let direction = getRandomInt(5);
            if(direction == 1){
                this.speedX = 0;
                this.speedY = -2;
                this.angle = 1;
            }else if (direction == 2){
                this.speedY = 0;
                this.speedX = 2;
                this.angle = 2;
            }else if (direction == 3){
                this.speedY = 2;
                this.speedX = 0;
                this.angle = 3;
            }else if (direction == 4){
                this.speedY = 0;
                this.speedX = -2;
                this.angle = 4;
            }
            else{
                this.speedX = 0;
                this.speedY = 0;
            }
    }
    this.stop = function() {
        this.speedY = 0;
        this.speedX = 0;
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

        enemyBullets.push(new Bullet({
                x: this.x + this.width/2,
                y: this.y,
                angle: this.angle,
                speed: 5,
                color: "black"
            }));   
    }
    this.die = function() {
        
        this.active = false;
        
    }
}

setInterval(function(){
    if(!paused){
       enemies.forEach(function(enemy) {
        enemy.direction();
    });   
    }
}, 1000);

setInterval(function(){
    if(!paused && start)
    {
       enemies.forEach(function(enemy) {
        enemy.shoot();
    });    
    }
}, shootInterval);

setInterval(function(){
    if(level != 0 && !paused && start){
        if(enemyCount<=enemyMax){
            for(i=0; i<3; i++)
            {
                enemies.push(new enemy(50, 50, spawnX, 0, 1));
                spawnX+= 260;
                if(spawnX > gameAreaWidth){
                    spawnX = 15;
                }
            }
            enemyCount += 3;
            enemyTotal += 3;
        }
    }   
}, spawnInterval);