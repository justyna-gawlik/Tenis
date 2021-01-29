const canv = document.querySelector('canvas');
const ctx=canv.getContext('2d');

let pPoints=document.getElementById("playerPoints");
let aPoints=document.getElementById("computerPoints");
let message=document.getElementById("message");
let restart=document.getElementById("restart");


canv.width=1140;
canv.height=450;


const cw=canv.width;
const ch=canv.height;

const ballSize=20;

let ballX= cw/2-ballSize/2;
let ballY= ch/2-ballSize/2;

const lineWidth=6;
const lineHeight=16;

let aiPoints=0;
let playerPoints=0;

const paddelHeight=100;
const paddelWidth=10;

const playerX=70;
const aiX=1060;

let playerY=175;
let aiY=175;

let ballSpeedX=1;
let ballSpeedY=1;

function player(){
    ctx.fillStyle='#ea97ad';
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
}

function ai(){
    ctx.fillStyle='#5aa469';
    ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
}

function ball(){
    ctx.fillStyle='white';
    ctx.fillRect(ballX, ballY, ballSize,ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0 || ballY + ballSize >= ch){
        ballSpeedY =- ballSpeedY;
        speedUp();
    }
    
    if(ballX <=0 || ballX + ballSize >= cw){
        ballSpeedX =- ballSpeedX;
        speedUp();
    }

    if (ballX <= 0) {
        loose();
   
    } else if (ballX + ballSize >= cw) {
        win();
    }
    if (ballX - paddelWidth <= playerX && ballY >= playerY - ballSize && ballY <= playerY + paddelHeight){
        ballSpeedX = -ballSpeedX;
       }
    if (ballX + ballSize >= aiX && ballY <= aiY + paddelHeight && ballY >= aiY - ballSize){
        ballSpeedX = -ballSpeedX;
    }


}

function win(){
    correct();
    clearInterval(game);
    message.innerHTML="🎉CONGRATULATIONS, YOU WON!"
    playerPoints+=1;
    pPoints.innerHTML=playerPoints;
    ballX= cw/2-ballSize/2;
    ballY= ch/2-ballSize/2;
    ballSpeedX=1;
    ballSpeedY=1;
}

function loose(){
    wrong();
    clearInterval(game);
    message.innerHTML="YOU LOOSE!😔";
    aiPoints+=1;
    aPoints.innerHTML=aiPoints;
    ballX= cw/2-ballSize/2;
    ballY= ch/2-ballSize/2;
    ballSpeedX=1;
    ballSpeedY=1;
    
}

function table(){
    ctx.fillStyle='#a7c5eb';
    ctx.fillRect(0,0,cw,ch)
    for(let i=20; i<ch; i+=30){
        ctx.fillStyle='#e6e6e6';
        ctx.fillRect(cw/2-lineWidth/2, i, lineWidth, lineHeight)
    }
}

topCanvas=canv.offsetTop;

canv.addEventListener("mousemove",(e)=>{
    playerY= e.clientY - topCanvas - paddelHeight/2;

    if(playerY >= ch - paddelHeight){
        playerY = ch - paddelHeight;
    }

    if(playerY <=0){
        playerY=0;
    }

});

function aiPosition(){
    let middlePaddel= aiY+paddelHeight/2;
    let middleBall= ballY+ballSize/2;

    if(ballX > 500){
      if(middlePaddel - middleBall >200){
        aiY -=20;
      } else if(middlePaddel - middleBall > 50){
        aiY -=10;
      }else if(middlePaddel - middleBall < -200){
        aiY +=20;
        }else if(middlePaddel - middleBall < -50){
        aiY +=10;
        }
    }else if(ballX <= 500 && ballX > 150){
        if(middlePaddel -middleBall > 100){
            aiY -= 3;
        }else if(middlePaddel - middleBall < -100){
            aiY += 3;
        }
    }
}

function speedUp(){
    if(ballSpeedX > 0 && ballSpeedX < 15){
        ballSpeedX += 1;
    }else if (ballSpeedX <0 && ballSpeedX > -15){
        ballSpeedX -= 0.4;
    }
    if(ballSpeedY > 0 && ballSpeedY < 15){
        ballSpeedY += 1;
    }else if (ballSpeedY <0 && ballSpeedY > -15){
        ballSpeedY -= 0.3;
    }
}

function correct() {
    let correct = document.getElementById("win");
    correct.currentTime = 0;
    correct.play();
}

function wrong() {
    let wrong = document.getElementById("loose");
    wrong.currentTime = 0;
    wrong.play();
}

restart.addEventListener("click", ()=>{
    window.location.reload();
});

function game(){
    table()
    ball()
    player()
    ai()
    aiPosition()
}

setInterval(game, 1000 / 60);

if (screen.width <= 699) {
document.location = "mobile.html";
}


