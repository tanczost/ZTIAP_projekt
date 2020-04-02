import { canvasFunctions } from './objectCanvas';


export class myImage extends canvasFunctions
{
    constructor(x, y, width, height, src, type)
    {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.speed = 0;
        this.angle = 0;
        this.myShots = [];
        this.moveAngle = 0; 
        this.image = new Image();
        this.image.src = src;
        console.log(src);
    }
    creat()
    {
        if(this.type == "bg")
        {
             this.context.drawImage(this.image, this.x, this.y);
        } 
        else
        {
            if((this.speed < 0 && this.speed > -2) || (this.speed > 0 && this.speed < 2)) this.speed *= 0.995;
            this.angle += this.moveAngle * Math.PI / 180;
            var newX = this.speed* Math.sin(this.angle);
            var newY = this.speed * Math.cos(this.angle);
            
            if(!(this.x + newX > 1000 || this.x + newX <= 0 || this.y - newY > 500 || this.y - newY <= 0))
            {
                this.x += newX; this.y -= newY;
            }
            this.rotateObject(this.x, this.y, this.width, this.height, this.angle, this.image);
        }
    }
    collison(object)
    {
        var vector = [this.x  + (1 * Math.cos(this.angle)) - object.x, this.y + (3 * Math.sin(this.angle)) - object.y];
        return (Math.sqrt(vector[0] * vector[0] + vector[1]*vector[1]) <=  this.width / 2 + 2 );
    }
}