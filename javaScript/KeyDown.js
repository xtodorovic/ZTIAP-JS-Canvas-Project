// keydown functions
function onKeyDown(event) {
    keyState[event.keyCode] = true;
    console.log(event.keyCode);
}

function onKeyUp(event) {
    keyState[event.keyCode] = false;
}

document.onkeydown = function(e){
    if(e.keyCode == keyUp || e.keyCode == keyUpArrow){
        tank.speedY = -5;
        tank.speedX = 0;
        tank.angle = 1;
    }
    if(e.keyCode == keyDown || e.keyCode == keyDownArrow){
        tank.speedY = 5;
        tank.speedX = 0;
        tank.angle = 3;
    }
    if(e.keyCode == keyLeft || e.keyCode == keyLeftArrow){
        tank.speedX = -5;
        tank.speedY = 0;
        tank.angle = 4;
    }
    if(e.keyCode == keyRight || e.keyCode == keyRightArrow){
        tank.speedX = 5;
        tank.speedY = 0;
        tank.angle = 2;
    }
    if(e.keyCode == keyShoot){
        tank.fireRate = 1;
    }
    if(e.keyCode == keyPause || e.keyCode == keyEscape){
        if (!paused)
        {
            canvas.addEventListener("mousemove", checkPos);
            canvas.addEventListener("mouseup", checkClick);
            paused = true;
        } else if (paused)
        {
            paused = false;
            pausedOnce = 0;
        }
    }
}

document.onkeyup = function(){
    tank.speedX = 0; 
    tank.speedY = 0; 
}