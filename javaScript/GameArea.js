
var GameArea = {
    start : function() {
        if(!start){
            this.interval = setInterval(updateGameArea, 20);
        }
        else{
            this.canvas = document.getElementById("myCanvas");
            this.context = this.canvas.getContext("2d");
            this.context.drawImage(backgroundImg,0,0);
            this.frameNo = 0;
            }
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(backgroundImg,0,0);
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
    }
}

function updateGameArea() {
    if(!start){
        updateMainMenu();
    }
    else{
        if(!paused)
        {
            GameArea.clear();
            tank.newPos();
            tank.draw();
            for(i=0; i < 5; i++)
            {
                enemies[i].newPos();
                enemies[i].draw();
                if (collisionCheck(enemies[i], tank)) {
                    GameOver();
                }
            }
        }
        else{
            GameArea.pause();
            pausedOnce = 1;
        }
    }
}

function collisionCheck(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }