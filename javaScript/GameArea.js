
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
       /* if(pausedOnce == 0)
        {
            this.context.fillStyle = 'White';
            this.context.globalAlpha = 0.2;
            this.context.fillRect(50,50, this.canvas.width-100, this.canvas.height-100);
            this.context.globalAlpha = 1.0;
            this.context.font = "bold 28px Arial";
            this.context.fillStyle = "Black";
            this.context.fillText("PAUSED", this.canvas.width/2 - 70, 115);
            this.context.font = "25px Arial";
            this.context.fillText("PRESS 'P' TO CONTINUE.", this.canvas.width/2 - 155, this.canvas.height/2+100);
           // this.context.drawImage(quitImg, )
        }*/
        this.context.drawImage(pausedScreen, 0 , 0);
        if(!selectQuit)
        {
            this.context.drawImage(quitBtn,buttonX[4] , buttonY[4], buttonWidth[4], buttonHeight[4]);  
        }else{
            this.context.drawImage(quitBtnSelect,buttonX[4] , buttonY[4], buttonWidth[4], buttonHeight[4]); 
        }
    }
}