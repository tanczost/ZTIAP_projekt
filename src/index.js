import { Screen } from './screen';
import { Control } from './control';


//global variables
var time, myGame, controller;

window.onload = function()
{
    if(localStorage.length == 0)
    {
    localStorage.setItem('names', JSON.stringify([]));
    localStorage.setItem('scores', JSON.stringify([]));
    }
    myGame = new Screen("Screen");
    controller = new Control();
    time = Date.now();
    main();
}

window.onkeydown = (e) => { if(myGame.gameMode == 1) controller.buttonDown(myGame, e);}

window.onkeyup = (e) => {if(myGame.gameMode == 1) controller.buttonUp(myGame, e);}

export function main()
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
            requestAnimationFrame(main);
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
            //requestAnimationFrame(main);
    }
}

