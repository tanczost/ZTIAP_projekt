import { myImage } from './myimage';
import { main } from './index';


export class Control
{
    constructor()
    {
        this.none = false;
    }
    buttonDown(object, event)
    {
        if(event.keyCode == 27 && object.gameMode == 1) object.gameMode = 5; //pause
        else if(event.keyCode == 27 && object.gameMode == 5) {object.gameMode = 1; main();}//play

        if(event.keyCode == 77 &&  object.sound) {object.sound = false; object.audioButton.src = "../images/soundoff.png";}//mute
        else if(event.keyCode == 77 && !object.sound){object.sound = true; object.audioButton.src = "../images/soundon.png";}//unmute


        if(event.keyCode == 37) object.player.moveAngle = -2; //left
        if(event.keyCode == 39) object.player.moveAngle = 2;  //right
        if(event.keyCode == 40) object.player.speed = -2;//backward
        if(event.keyCode == 38) object.player.speed = 2;//forward
        if(event.keyCode == 32 && object.shot) //shot
        {
            if(object.sound) object.shotSound.play();
            object.player.add(new myImage(object.player.x + 2, object.player.y - 2, 5, 5, '../images/bullet.png', "none", "bullet"));
            object.player.myChilds[object.player.myChilds.length - 1].speed = 10;
            object.player.myChilds[object.player.myChilds.length - 1].angle = object.player.angle;
            object.shot = false;
        }
    }

    buttonUp(object, event)
    {
        if(event.keyCode == 37) object.player.moveAngle = 0; 
        if(event.keyCode == 39) object.player.moveAngle = 0;
        if(event.keyCode == 40) object.player.speed = -1.9;
        if(event.keyCode == 38) object.player.speed = 1.9;
        if(event.keyCode == 32) object.shot = true;
    }

}