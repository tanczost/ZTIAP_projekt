import { canvasFunctions } from './objectCanvas';
import { Bullet } from './bullet';

export class Circle extends canvasFunctions
{
    constructor(x, y, radius, color,name)
    {
        super(name, x, y, color);
        this.radius = radius;
        this.bubblesShot = false;
    }

    creat() //redraw object
    {
        this.x += (this.speed * Math.sin(this.angle) * 1);
        this.y -= (this.speed * Math.cos(this.angle) * 1);
        this.createCircle(this.x, this.y, this.radius,this.color);
    }
    attack(object) //creat new bullet
    {
        this.color = "green";
        setTimeout( () => {
        
            var vector = [(object.x -  -50 * Math.sin(object.angle))- this.x, (object.y + -50 * Math.cos(object.angle)) - this.y];
            this.add(new Bullet(this.x, this.y, vector[0], vector[1], 5, "green"));
            this.color = "red";
        
        } ,2000 , this, object);
        
    }
    collison(object) //controll collision
    {
        var vector = [(this.x + 2.5)  - object.x, (this.y - 2.5) - object.y];
        return (Math.sqrt(vector[0] * vector[0] + vector[1]*vector[1]) <=  (object.width + this.radius )  );
    } 
}