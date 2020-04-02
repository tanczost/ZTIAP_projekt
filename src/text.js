import { canvasFunctions } from './objectCanvas';


export class Text extends canvasFunctions
{
    constructor(x, y, color, pixel)
    {
        super();
        this.x = x;
        this.y = y;
        this.color = color;
        this.pixel = pixel;
        
    }

    creat(text)
    {
        this.creatText(this.x, this.y, this.pixel, this.color, text);
    }
}