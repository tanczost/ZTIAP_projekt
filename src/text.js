import { canvasFunctions } from './objectCanvas';


export class Text extends canvasFunctions
{
    constructor(x, y, color, pixel, name)
    {
        super(name, x, y, color);
        this.pixel = pixel;
        this.text = null;
    }

    creat(text)
    {
        if(text) var title = text;
        else var title = this.text
        this.creatText(this.x, this.y, this.pixel, this.color, title);
    }
}