
var canvas;
var ctx;
var infoCanvas;
var infoCtx;
//   var width = canvas.getAttribute('width');
//   var height = canvas.getAttribute('height');
var tank;
var gameAreaWidth = 800;
var gameAreaHeight = 600;
var enemies = [];
var bullets = [];
var enemyBullets = [];

// Blocks
var brickBlocks = [];

var start = false;
var paused = false;
var pausedOnce = 0;
var instructions = false;
var gameoverScreen = false;
    // input setup
//  var keyState = []; 
//  keyState.length = 256;
var mouseX;
var mouseY;

var selectX = [0,0];
var selectY = [0,0];
var selectWidth = 35;
var selectHeight = 40;
 
var selectVisible = false;
var selectBack = false;
var selectPlayAgain = false;
var selectQuit = false;
var selectSize = selectWidth;
var selectRotate = 0;

var fadeId = 0;

var frames = 30;
var timerId = 0;
var time = 0.0;
var music = true;

var pressed = 0;
var buttonX = [570, 570, 645, 10, 225, 250];
var buttonY = [100, 150, 200, 10, 500, 450];
var buttonWidth = [200, 200, 50, 35, 350, 250 ];
var buttonHeight = [30, 25, 50, 35, 30, 30];

// key setup
var keyUp = 87;
var keyDown = 83;
var keyLeft = 65;
var keyRight = 68;
var keyUpArrow = 38;
var keyDownArrow = 40;
var keyLeftArrow = 37;
var keyRightArrow = 39;
var keyShoot = 32;
var keyPause = 80;
var keyEscape = 27;

//images
var menuImg = new Image();
var backgroundImg = new Image();
var titleImg = new Image();
var startImg = new Image();
var selectImg = new Image();
var quitImg = new Image();
var instructionsImg = new Image();
var instructionScreen = new Image();
var backBtnSelect = new Image();
var backBtn = new Image();
var quitBtnSelect = new Image();
var quitBtn = new Image();
var pausedScreen = new Image();
var musicOn = new Image();
var musicOff = new Image();
var playAgain = new Image();
var playAgainSelect = new Image();
menuImg.src = "resources/main_menu/mmenu1.png";
backgroundImg.src = "resources/background/background1.jpg";
titleImg.src = "resources/main_menu/gameTitle.png"
startImg.src = "resources/main_menu/startGame.png";
selectImg.src = "resources/main_menu/select.png";
quitImg.src = "resources/main_menu/quit.png";
instructionsImg.src = "resources/main_menu/instructions.png";
instructionScreen.src = "resources/main_menu/instructionScreen.png";
backBtnSelect.src = "resources/main_menu/backBtn.png";
backBtn.src = "resources/main_menu/backBtnSelect.png";
quitBtnSelect.src = "resources/main_menu/quitSelect.png";
quitBtn.src = "resources/main_menu/quit.png";
pausedScreen.src = "resources/main_menu/pause.png";
musicOn.src = "resources/main_menu/musicOn.png";
musicOff.src = "resources/main_menu/musicOff.png";
playAgain.src = "resources/main_menu/playAgain.png";
playAgainSelect.src = "resources/main_menu/playAgainSelect.png";

//Explosion Array
var explosionArray = new Array();
explosionArray[0] = new Image();
explosionArray[1] = new Image();
explosionArray[2] = new Image();
explosionArray[3] = new Image();
explosionArray[4] = new Image();
explosionArray[5] = new Image();
explosionArray[6] = new Image();
explosionArray[7] = new Image();
explosionArray[8] = new Image();
explosionArray[9] = new Image();

explosionArray[0].src = "resources/boom/explode1.png";
explosionArray[1].src = "resources/boom/explode2.png";
explosionArray[2].src = "resources/boom/explode3.png";
explosionArray[3].src = "resources/boom/explode4.png";
explosionArray[4].src = "resources/boom/explode5.png";
explosionArray[5].src = "resources/boom/explode6.png";
explosionArray[6].src = "resources/boom/explode7.png";
explosionArray[7].src = "resources/boom/explode8.png";
explosionArray[8].src = "resources/boom/explode9.png";
explosionArray[9].src = "resources/boom/explode10.png";



window.onload = function loadGame() {

    if (!start) {
        mainMenuMusic = new sound("sounds/mainMenu/mMenu.mp3");
        mainMenuMusic.play();
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        infoCanvas = document.getElementById("infoCanvas");
        infoCtx = infoCanvas.getContext("2d");
        canvas.addEventListener("mousemove", checkPos);
        canvas.addEventListener("mouseup", checkClick);
        
        GameArea.start();
    }
}

function updateMainMenu() {
    clearMenu();
    drawMenu();
}

function clearMenu(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawMenu(){
    if(start == false && instructions == false)
    {
        ctx.fillStyle = "White";
        ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
        ctx.drawImage(menuImg, -50 , -25, this.canvas.width+50, this.canvas.height);
        ctx.drawImage(titleImg, 100, gameAreaHeight-150, 600, 150);
        ctx.drawImage(startImg,buttonX[0], buttonY[0],buttonWidth[0], buttonHeight[0]);
        ctx.drawImage(instructionsImg, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
        if(music){
            ctx.drawImage(musicOn, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
        }else{
            ctx.drawImage(musicOff, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
        }
    }
    if(instructions == true)
    {
        selectVisible = false;
        ctx.drawImage(instructionScreen, 0, 0);
            if(selectBack == false){
                ctx.drawImage(backBtn, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
            }else{
                ctx.drawImage(backBtnSelect, buttonX[3], buttonY[3], 55, buttonHeight[3]);
            }
    }
    
    if(selectVisible == true){
        if(instructions == false){
            ctx.drawImage(selectImg, selectX[0] - (selectSize/2), selectY[0], selectSize, selectHeight);
            ctx.drawImage(selectImg, selectX[1] - (selectSize/2), selectY[1], selectSize, selectHeight);
        }
    }
}

function QuitGame(){
    paused = false;
    pausedOnce = 0;
    start = false;
    gameoverScreen = false;
    gameover = false;
    GameArea.clear();
    level = 0;
    nextlevel = true;
    infoCtx.clearRect(0, 0, infoCanvas.width, infoCanvas.height);
    infoCtx.fillStyle = 'Black';
    infoCtx.fillRect(0,0, infoCanvas.width, infoCanvas.height);
    canvas.removeEventListener("keydown", onKeyDown);
    canvas.removeEventListener("keyup", onKeyUp);
    enemies.forEach(function(enemy){
        enemy.die();
    });
    
    enemyBullets.forEach(function(bullet){
        bullet.die();
    });

    bullets.forEach(function(bullet){
        bullet.die();
    });  
}


function startGame() {
    start = true;
    GameArea.start();
    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('keyup', onKeyUp);
    tank = new Player(50, 50, 600, 500);
    level = 1;
    mainMenuMusic.stop();
    if(music){
        inGameMusic = new sound("sounds/inGame/ingame.wav");
        inGameMusic.play();
    }
    
}
/*
function GameOver(){
    
    canvas.removeEventListener("mousemove", checkPos);
    canvas.removeEventListener("mouseup", checkClick);
    canvas.removeEventListener("keydown", onKeyDown);
    canvas.removeEventListener("keyup", onKeyUp);
}*/

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }