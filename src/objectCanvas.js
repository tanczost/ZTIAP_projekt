import { Node } from './node';

export class canvasFunctions extends Node
{
    constructor(name, x, y, color)
    {
        super(name, x, y, color);
        this.context = document.getElementById("myCanvas").getContext("2d"); //context == canvas
    }
    rotateObject(x, y, width, height, angle, image)
    {
        this.context.save();
        this.context.translate(x , y);
        this.context.rotate(angle);
        this.context.drawImage(image, width / -2, height / -2);
        this.context.restore();
    }
    creatText(x, y, pixel, color, text)
    {
        this.context.fillStyle = color;
        this.context.font = pixel+" Arial";
        this.context.textAlign = "center";
        this.context.fillText(text, x, y);
    }
    createCircle(x, y, radius, color)
    {
        this.context.beginPath();
        this.context.arc(x, y, radius ,0 , Math.PI * 2 );
        var grd = this.context.createRadialGradient(x, y, radius, x+radius, y+radius, radius/2);
        grd.addColorStop(0, color);
        grd.addColorStop(1, "white");
        this.context.fillStyle = grd;
        this.context.fill();
        this.context.stroke();
    }
    clear(x, y, width, height)
    {
        this.context.clearRect(x, y, width, height);
    }
}