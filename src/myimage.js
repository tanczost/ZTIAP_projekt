import { canvasFunctions } from './objectCanvas';


export class myImage extends canvasFunctions
{
    constructor(x, y, width, height, src, type, name)
    {
        super(name, x, y);
        this.width = width;
        this.height = height;
        this.type = type; 
        this.image = new Image();
        this.image.src = src;
        
    }
    creat()
    {
        if(this.type == "bg")
        {
             this.context.drawImage(this.image, this.x, this.y);
        } 
        else if(this.type == "player")
        {
            if((this.speed < 0 && this.speed > -2) || (this.speed > 0 && this.speed < 2)) this.speed *= 0.995;
            this.angle += this.moveAngle * Math.PI / 180;
            this.x += this.speed* Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);
            console.log(this.x);
            switch(true)
            {
                case(this.x > 1000):
                    this.x = 0; break;
                case(this.x < 0):
                    this.x = 1000; break;
                case(this.y > 500):
                    this.y = 0; break;
                case(this.y < 0):
                    this.y = 500; break;
            }
            this.rotateObject(this.x, this.y, this.width, this.height, this.angle, this.image);
        }
        else
        { 
            this.angle += this.moveAngle * Math.PI / 180;
            this.x += this.speed* Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);
            this.rotateObject(this.x, this.y, this.width, this.height, this.angle, this.image);
        }
    }
    collison(object)
    {
        var vector = [this.x  + (1 * Math.cos(this.angle)) - object.x, this.y + (3 * Math.sin(this.angle)) - object.y];
        return (Math.sqrt(vector[0] * vector[0] + vector[1]*vector[1]) <=  this.width / 2 + 2 );
    }
}