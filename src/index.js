import { Screen } from './screen';
import { myImage} from './myimage';


//global variables
var time
var myGame;



window.onload = function()
{
    myGame = new Screen("Screen");
    time = Date.now();
    main();
}

window.onkeydown = (e) =>
{
    
    if(e.keyCode == 27 && myGame.gameMode == 1) myGame.gameMode = 5; //pause
    else if(e.keyCode == 27 && myGame.gameMode == 5) myGame.gameMode = 1; //play

    if(e.keyCode == 77 &&  myGame.sound) {myGame.sound = false; myGame.audioButton.src = "../images/soundoff.png";}//mute
    else if(e.keyCode == 77 && !myGame.sound){myGame.sound = true; myGame.audioButton.src = "../images/soundon.png";}//unmute


    if(e.keyCode == 37) myGame.player.moveAngle = -2; //left
    if(e.keyCode == 39) myGame.player.moveAngle = 2;  //right
    if(e.keyCode == 40) myGame.player.speed = -2;//backward
    if(e.keyCode == 38) myGame.player.speed = 2;//forward
    if(e.keyCode == 32 && myGame.shot) //shot
    {
        if(myGame.sound) myGame.shotSound.play();
        var gol = new myImage(myGame.player.x + 2, myGame.player.y - 2, 5, 5, '../images/bullet.png', "none", "bullet");
        myGame.player.myShots.push(gol);
        myGame.player.add(gol);
        myGame.player.myShots[myGame.player.myShots.length - 1].speed = 5;
        myGame.player.myShots[myGame.player.myShots.length - 1].angle = myGame.player.angle;
        myGame.shot = false;
        myGame.notify();
    }
    
}

window.onkeyup = (e) =>  //movement
{
    
    if(e.keyCode == 37) myGame.player.moveAngle = 0; 
    if(e.keyCode == 39) myGame.player.moveAngle = 0;
    if(e.keyCode == 40) myGame.player.speed = -1.9;
    if(e.keyCode == 38) myGame.player.speed = 1.9;
    if(e.keyCode == 32) myGame.shot = true;
}

function main()
{
    switch (myGame.gameMode)
    {
        case 0: //main menu
            myGame.mainMenu();
            break;

        case 1: //game screen
            var now = Date.now();
            var dt = (now - time) / 100;
            time = now;
            myGame.game(dt);
            break;

        case 2: //restart screen
            myGame.restartScreen();
            break;

        case 3: //help screen
            myGame.helpScreen();
            break;

        case 4: //score screen
            myGame.scoreScreen();
            break;
        default:
            myGame.pauseScreen();
    }

    requestAnimationFrame(main);
}

