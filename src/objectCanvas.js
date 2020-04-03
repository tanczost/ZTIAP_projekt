import { Node } from './node';


export class canvasFunctions extends Node
{
    constructor(name)
    {
        super(name);
        this.context = document.getElementById("myCanvas").getContext("2d"); //context == canvas
    }
    rotateObject(x, y, width, height, angle, image)
    {
        this.context.save();
        this.context.translate(x , y);
        this.context.rotate(angle);
        this.context.drawImage(image, width / -2, height / -2);
        //this.context.strokeRect(width/-2, height/-2, width, height);
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
        this.context.fillStyle = color;
        this.context.fill();
        this.context.stroke();
    }
    clear(x, y, width, height,color)
    {
        this.context.clearRect(x, y, width, height);
    }
    deleteObject(object, parent)
    {
        console.log(parent.myChilds.length);

         if(object)
         {
            if(object.x < -40 || object.x > 1100 || object.y < -40 || object.y > 600)
            {
                var index = parent.myChilds.indexOf(object) ;
                var newArr = parent.myChilds.splice(0, index);
                newArr = parent.myChilds.splice(index + 1, parent.myChilds.length);
                parent.myChilds = newArr;
                console.log(parent.myChilds.length);
                return true;
                
            }
        }
    }

}