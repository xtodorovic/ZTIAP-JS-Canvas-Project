var level=0;
var nextlevel=true;
var changelevel = true;
var enemiesLeft = 0;
var base;
var gameover = false;

var stop1 = false;
var stop2 = false;
var stop3 = false;
var stop4 = false;

var GameArea = {
    start : function() {
        if(!start){
            this.interval = setInterval(updateGameArea, 20);
        }
        else{
            this.canvas = document.getElementById("myCanvas");
            this.context = this.canvas.getContext("2d");
            this.infocanvas = document.getElementById("infoCanvas");
            this.infocontext = this.infocanvas.getContext("2d");
            this.context.drawImage(backgroundImg,0,0);

            this.frameNo = 0;
            }
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(backgroundImg,0,0);
        this.infocontext.clearRect(0, 0, this.infocanvas.width, this.infocanvas.height);
        this.infocontext.fillStyle = 'Black';
        this.infocontext.fillRect(0,0, this.infocanvas.width, this.infocanvas.height);
        this.infocontext.fillStyle = 'White';
        this.infocontext.font = "bold 24px Arial";
        this.infocontext.fillText("SCORE:", 0, 50);
        this.infocontext.fillText(tank.score, 120, 50);
        this.infocontext.fillText("LIVES:", 0, 150);
        this.infocontext.fillText(tank.lives, 120, 150);
        this.infocontext.fillText("LEVEL:", 0, 250);
        this.infocontext.fillText(level, 120, 250);
        this.infocontext.fillText("ENEMIES:", 0, 350);
        this.infocontext.fillText((enemyMax-enemiesLeft), 120, 350);
    },
    stop : function() {
        clearInterval(this.interval);        
    },
    pause : function() {
        this.context.drawImage(pausedScreen, 0 , 0);

        if(!selectQuit)
        {
            this.context.drawImage(quitBtn,buttonX[4] , buttonY[4], buttonWidth[4], buttonHeight[4]);  
        }else{
            this.context.drawImage(quitBtnSelect,buttonX[4] , buttonY[4], buttonWidth[4], buttonHeight[4]); 
        }
    },
    nextstage: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'Black';
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'White';
        this.context.font = "bold 28px Arial";
        this.context.fillText("LEVEL", this.canvas.width/2 - 70, 115);
        this.context.fillText(level, this.canvas.width/2+50, 115);
    },
    gameover: function() {
        inGameMusic.stop();
        ctx.fillStyle = 'White';
        ctx.globalAlpha = 0.2;
        ctx.fillRect(50,50, this.canvas.width-100, this.canvas.height-100);
        ctx.globalAlpha = 1.0;
        ctx.font = "bold 28px Arial";
        ctx.fillStyle = "Black";
        ctx.fillText("GAME OVER", this.canvas.width/2 - 70, 115);
        ctx.font = "25px Arial";
        if(tank.lives == 0){
            ctx.fillText("YOUR TANK GOT DESTROYED", this.canvas.width/2 - 155, this.canvas.height/2);
        }
        else{
            ctx.fillText("YOUR BASE GOT DESTROYED", this.canvas.width/2 - 155, this.canvas.height/2);
        }
        if(!selectPlayAgain){
            this.context.drawImage(playAgain, buttonX[5] , buttonY[5], buttonWidth[5], buttonHeight[5]);         
        }
        else{
            selectQuit = false;
            this.context.drawImage(playAgainSelect, buttonX[5] , buttonY[5], buttonWidth[5], buttonHeight[5]); 
        }
        if(!selectQuit)
        {
            this.context.drawImage(quitBtn,buttonX[4] , buttonY[4], buttonWidth[4], buttonHeight[4]);  
        }else{
            selectPlayAgain = false;
            this.context.drawImage(quitBtnSelect,buttonX[4] , buttonY[4], buttonWidth[4], buttonHeight[4]); 
        }
    }

}

function updateGameArea() {
    if(!start){
        updateMainMenu();
    }
    else{
        if(gameover == true){
            GameArea.gameover();
        }
        else if(changelevel == true){
            GameArea.nextstage();
            setTimeout(function(){ changelevel = false; }, 2000);
        }
        else if(!paused && !gameover )
        {
            
            if(nextlevel){
                switch(level){
                    case 1:
                        enemyTotal = 0;
                        enemyCount = 0;
                        enemiesLeft = 0;
                        base = new PlayerBase();
                        level1();
                        level2();
                        drawBase();
                        break;
                    case 2: 
                        drawBase();
                        level2();
                        break;
                    case 3:
                            
                        default:
                            break;
                }
                nextlevel = false;
            }
            if(enemyMax-enemiesLeft == 0){
                level++;
                enemyCount = 0;
                enemiesLeft = 0;
                changelevel = true;
                nextlevel = true;
            }

            GameArea.clear();
            tank.newPos();
            tank.draw();
            base.draw();
            if(base.health == 0 || tank.lives <= 0){
                gameover = true;
                gameoverScreen = true;
                canvas.addEventListener("mousemove", checkPos);
                canvas.addEventListener("mouseup", checkClick);
            }

            enemies.forEach(function(enemy) {
                enemy.newPos();
            });

            bullets.forEach(function(bullet) {
                bullet.update();
              });

            enemyBullets.forEach(function(bullet) {
                bullet.update();
            });

            collisionOccurs();

            bullets.forEach(function(bullet) {
                bullet.draw();
            });
            enemyBullets.forEach(function(bullet) {
                bullet.draw();
            });
            enemies.forEach(function(enemy) {
                enemy.draw();
            });
            brickBlocks.forEach(function(brick) {
                brick.draw();
              });
        }
        else{
            GameArea.pause();
            pausedOnce = 1;
        }
    }
}

function drawBase(){
    brickBlocks.push(new BrickBlock(gameAreaWidth/2-100, gameAreaHeight-25, 50, 50));
    brickBlocks.push(new BrickBlock(gameAreaWidth/2-100, gameAreaHeight-75, 50, 50));
    brickBlocks.push(new BrickBlock(gameAreaWidth/2-100, gameAreaHeight-125, 50, 50));
    brickBlocks.push(new BrickBlock(gameAreaWidth/2-50, gameAreaHeight-125, 50, 50));
    brickBlocks.push(new BrickBlock(gameAreaWidth/2, gameAreaHeight-125, 50, 50));
    brickBlocks.push(new BrickBlock(gameAreaWidth/2+50, gameAreaHeight-25, 50, 50));
    brickBlocks.push(new BrickBlock(gameAreaWidth/2+50, gameAreaHeight-75, 50, 50));
    brickBlocks.push(new BrickBlock(gameAreaWidth/2+50, gameAreaHeight-125, 50, 50));
}
function level1(){
    var yes = 0;
    for(i=0; i<5; i++)
    {   
        brickBlocks.push(new BrickBlock(yes, 150, 50, 50));
        yes += 50;
    }
    yes = canvas.width;
    for(i=0; i<5; i++)
    {   
        brickBlocks.push(new BrickBlock(yes, 150, 50, 50));
        yes -= 50;
    }
    enemyMax = 12;
}
function level2(){
    var yes = 150;
    for(i=0; i<10; i++)
    {   
        brickBlocks.push(new BrickBlock(yes, 300, 50, 50));
        yes += 50;
    }
    enemyMax = 15;
    shootInterval-=100;
    spawnInterval-=500;
}

function level3(){
    enemyMax = 21;
    shootInterval-=200;
    spawnInterval-=600;
}

  