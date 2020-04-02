import { myGame } from './index';


export class Buttons
{
    constructor(type, id, inner, gamemode)
    {
        this.type = type;
        this.id = id;
        this.inner = inner;
        this.mode = gamemode;
        this.creat();
    }
    creat()
    {
        var Mode = this.mode;
        this.button = document.createElement(this.type);
        this.button.id = this.id;
        this.button.innerHTML =this.inner;
        this.button.onclick = function(){ myGame.gameMode = Mode;};
        document.body.appendChild(this.button);

    }
    change(changeType, value)
    {
        switch(changeType)
        {
            case ("zIndex"):
                this.button.style.zIndex = value;
                break;
            case ("inner"):
                this.button.innerHTML = value;
                break;
            case ("onclick"):
                this.button.onclick = function(){myGame.gameMode = value;};
                break;
        }
    }
}