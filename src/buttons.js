import { main } from './index';


export class Buttons
{
    constructor(type, id, inner, gamemode, object, commands)
    {
        this.type = type;
        this.id = id;
        this.inner = inner;
        this.mode = gamemode;
        this.parent = object;
        this.commands = commands;
        this.creat();
    }
    creat()
    {
        var Mode = this.mode;
        this.button = document.createElement(this.type);
        this.button.id = this.id;
        this.button.className = "button";
        if(this.type == "img") this.button.src = this.inner;
        else this.button.innerHTML =this.inner;
        parent = this.parent;
        if(this.id == "audioButton") this.button.onclick = function(){ parent.sound = Mode;};
        //else if(this.type == "img") this.button.onclick = function(){ parent.gameMode = Mode; };
        else this.button.onclick = function(){ parent.gameMode = Mode; main();};
        document.body.appendChild(this.button);

    }
    change(changeType, value)
    {
        parent = this.parent;
        switch(changeType)
        {
            case ("zIndex"):
                this.button.style.zIndex = value;
                break;
            case ("inner"):
                if(this.type == "img") this.button.src = value;
                else this.button.innerHTML = value;
                break;
            case ("onclick"):
                if(this.id == "audioButton") this.button.onclick = function(){ parent.sound = value;};
                //else if(this.type == "img")this.button.onclick = function(){parent.gameMode = value;};
                else this.button.onclick = function(){parent.gameMode = value; main();};
                break;
        }
    }
}