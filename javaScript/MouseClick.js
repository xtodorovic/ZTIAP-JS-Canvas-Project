
function checkPos(mouseEvent){
    if(mouseEvent.pageX || mouseEvent.pageY == 0){
        mouseX = mouseEvent.pageX - this.offsetLeft;
        mouseY = mouseEvent.pageY - this.offsetTop;
    }else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
        mouseX = mouseEvent.offsetX;
        mouseY = mouseEvent.offsetY;
    }
    if(!start)
    {
        if(instructions == false)
        {
            for(i = 0; i < 2; i++){
                if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
                    if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
                        selectVisible = true;
                        selectX[0] = buttonX[i] - (selectWidth/2) - 2;
                        selectY[0] = buttonY[i] - 6;
                        selectX[1] = buttonX[i] + buttonWidth[i] + (selectWidth/2); 
                        selectY[1] = buttonY[i] - 6;
                    }
                }else{
                    selectVisible = false;
                }
            }
            
        }else{
            if(mouseX > buttonX[3] && mouseX < buttonX[3] + 20 +buttonWidth[3]){
                if(mouseY > buttonY[3] && mouseY < buttonY[3] + buttonHeight[3]){
                    selectBack = true;
                }
            }
            else{
                selectBack = false;
            }
        } 
    }
    if(paused == true || gameoverScreen == true)
    {
        if(mouseX > buttonX[4] && mouseX < buttonX[4] + buttonWidth[4]){
            if(mouseY > buttonY[4] && mouseY < buttonY[4] + buttonHeight[4]){
                selectQuit = true;
            }
        }
        else{
            selectQuit = false;
        }
        if(mouseX > buttonX[5] && mouseX < buttonX[5] + buttonWidth[5]){
            if(mouseY > buttonY[5] && mouseY < buttonY[5] + buttonHeight[5]){
                selectPlayAgain = true;
            }
        }
        else{
            selectPlayAgain = false;
        }
    }
}

function checkClick(mouseEvent){
    for(i = 0; i < buttonX.length; i++){
            if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
                if(!start)
                {
                    if(mouseY > buttonY[0] && mouseY < buttonY[0] + buttonHeight[0]){
                        clearInterval(timerId);
                        canvas.removeEventListener("mousemove", checkPos);
                        canvas.removeEventListener("mouseup", checkClick);
                        startGame();
                    }
                    if(mouseY > buttonY[1] && mouseY < buttonY[1] + buttonHeight[1]){
                        
                        instructions = true;
                    }
                    if(mouseY > buttonY[2] && mouseY < buttonY[2] + buttonHeight[2]){
                        if(music){
                            music = false;
                            mainMenuMusic.stop();
                        }
                        else if(!music){
                            music = true;
                            mainMenuMusic.play();
                        }
                    }    
                }
                if(instructions == true){
                    if(mouseY > buttonY[3] && mouseY < buttonY[3] + buttonHeight[3]){
                        instructions = false;
                    }
                }
                if(paused == true || gameoverScreen == true)
                {
                    if(mouseY > buttonY[4] && mouseY < buttonY[4] + buttonHeight[4]){
                        //startGame();
                        QuitGame();
                       // console.log("Click");
                    }
                    if(mouseY > buttonY[5] && mouseY < buttonY[5] + buttonHeight[5]){
                        //startGame();
                        QuitGame();
                        startGame();
                       // console.log("Click");
                    }
                }
            }
    }
}