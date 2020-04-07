import { main } from './index';


export class Buttons
{
    constructor(type, id, inner, gamemode, object)
    {
        this.type = type;
        this.id = id;
        this.inner = inner;
        this.mode = gamemode;
        this.parent = object;
        this.creat();
    }
    creat()
    {
        var Mode = this.mode;
        this.button = document.createElement(this.type);
        this.button.id = this.id;
        this.button.innerHTML =this.inner;
        parent = this.parent;
        this.button.onclick = function(){ parent.gameMode = Mode; main();};
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
                this.button.innerHTML = value;
                break;
            case ("onclick"):
                this.button.onclick = function(){parent.gameMode = value; main();};
                break;
        }
    }
}