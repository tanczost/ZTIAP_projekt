import { canvasFunctions } from './objectCanvas';


export class Text extends canvasFunctions
{
    constructor(x, y, color, pixel, name)
    {
        super(name);
        this.x = x;
        this.y = y;
        this.color = color;
        this.pixel = pixel;
        this.text;
        
    }

    creat(text)
    {
        if(text)
        {
            var title = text;
        }
        else
        {
            var title = this.text
        }
        this.creatText(this.x, this.y, this.pixel, this.color, title);
    }
}