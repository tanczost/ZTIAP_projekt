import { Screen } from './screen';
import { Control } from './control';

//global variables
var time, myGame, controller;

window.onload = function() //initialisation
{
    if(localStorage.length === 0)
    {
        localStorage.setItem('names', JSON.stringify([]));
        localStorage.setItem('scores', JSON.stringify([]));
    }
    myGame = new Screen("Screen");
    controller = new Control();
    time = Date.now();
    main();
}

//actions
window.onkeydown = (e) => { if(myGame.gameMode == 1 || e.keyCode == 27) controller.buttonDown(myGame, e);}
window.onkeyup = (e) => {if(myGame.gameMode == 1) controller.buttonUp(myGame, e);}



export function main()
{
    switch (myGame.gameMode) //main game loop
    {
        case 0:
            myGame.mainMenu();
            break;
        case 1:
            var now = Date.now();
            var dt = (now - time) / 100;
            time = now;
            myGame.game(dt);
            requestAnimationFrame(main);
            break;
        case 2:
            myGame.restartScreen();
            break;
        case 3: 
            myGame.helpScreen();
            break;
        case 4: 
            myGame.scoreScreen();
            break;
        default:
            myGame.pauseScreen();
    }
}

