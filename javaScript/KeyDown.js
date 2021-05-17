// keydown functions
function onKeyDown(event) {
    keyState[event.keyCode] = true;
    console.log(event.keyCode);
}

function onKeyUp(event) {
    keyState[event.keyCode] = false;
}

document.onkeydown = function(e){
    if(stop1 != true){
        if(e.keyCode == keyUp || e.keyCode == keyUpArrow){
            tank.speedY = -5;
            tank.speedX = 0;
            tank.angle = 1;
            stop4 = false;
        }
    }
    if(stop2 != true){
        if(e.keyCode == keyDown || e.keyCode == keyDownArrow){
            tank.speedY = 5;
            tank.speedX = 0;
            tank.angle = 3;
            stop3 = false;
        }
    }
    if(stop3 != true){
        if(e.keyCode == keyLeft || e.keyCode == keyLeftArrow){
            tank.speedX = -5;
            tank.speedY = 0;
            tank.angle = 4;
            stop1 = false;
        }
    }
    if(stop4 != true){
        if(e.keyCode == keyRight || e.keyCode == keyRightArrow){
            tank.speedX = 5;
            tank.speedY = 0;
            tank.angle = 2;
            stop2 = false;
        }
    }
    if(e.keyCode == keyShoot){
        tank.shoot();
    }
    if(e.keyCode == keyShoot && e.target == document.body) {
        e.preventDefault();
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