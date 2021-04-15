
var canvas;
var ctx;
//   var width = canvas.getAttribute('width');
//   var height = canvas.getAttribute('height');
var tank;
var gameAreaWidth = 800;
var gameAreaHeight = 600;
var enemies = [];
var bullets = [];

var start = false;
var paused = false;
var pausedOnce = 0;
var instructions = false;

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
var selectQuit = false;
var selectSize = selectWidth;
var selectRotate = 0;

var fadeId = 0;

var frames = 30;
var timerId = 0;
var time = 0.0;
var music = true;

var pressed = 0;
var buttonX = [570, 570, 645, 10, 225];
var buttonY = [100, 150, 200, 10, 500];
var buttonWidth = [200, 200, 50, 35, 350];
var buttonHeight = [30, 25, 50, 35, 30];

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


window.onload = function loadGame() {

    if (!start) {
        mainMenuMusic = new sound("sounds/mainMenu/mMenu.mp3");
        mainMenuMusic.play();
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        canvas.addEventListener('keydown', onKeyDown);
        canvas.addEventListener('keyup', onKeyUp);
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

function fadeOut(){
    ctx.fillStyle = "rgba(0,0,0, 0.2)";
    ctx.fillRect (0, 0, gameAreaWidth, gameAreaHeight);
    time += 0.1;
    if(time >= 2){
        clearInterval(fadeId);
    }
}
function QuitGame(){
    paused = false;
    start = false;
    GameArea.stop();
    inGameMusic.stop();
    clearMenu();
    canvas.removeEventListener("mousemove", checkPos);
    canvas.removeEventListener("mouseup", checkClick);
    canvas.removeEventListener("keydown", onKeyDown);
    canvas.removeEventListener("keyup", onKeyUp);
    selectVisible = false;
    selectBack = false;
    selectQuit = false;
    /////TO DO : quit screen
}


function startGame() {
    start = true;
    GameArea.start();
    tank = new Player(50, 50, gameAreaWidth/2-25, gameAreaHeight/2-25);
    for(i=0; i< 5; i++)
    {
        enemies[i] = new enemy(50,50, 50, 50, 1);
    }
    
    mainMenuMusic.stop();
    if(music){
        inGameMusic = new sound("sounds/inGame/ingame.wav");
        inGameMusic.play();
    }
    
}

function GameOver(){
    GameArea.stop();
    inGameMusic.stop();
    ctx.fillStyle = 'White';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(50,50, this.canvas.width-100, this.canvas.height-100);
    ctx.globalAlpha = 1.0;
    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("GAME OVER", this.canvas.width/2 - 70, 115);
    ctx.font = "25px Arial";
    ctx.fillText("YOUR TANK GOT DESTROYED", this.canvas.width/2 - 155, this.canvas.height/2+100);
    canvas.removeEventListener("mousemove", checkPos);
    canvas.removeEventListener("mouseup", checkClick);
    canvas.removeEventListener("keydown", onKeyDown);
    canvas.removeEventListener("keyup", onKeyUp);
    // TO DO : add play again button
}

function shoot() {
    tank.fireRate = 1;
}
function dontshoot() {
    tank.fireRate = 0;
}

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