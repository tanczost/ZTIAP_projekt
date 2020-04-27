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

    creat()
    {
        this.x += (this.speed * Math.sin(this.angle) * 1);
        this.y -= (this.speed * Math.cos(this.angle) * 1);
        this.createCircle(this.x, this.y, this.radius,this.color);
    }

    attack(object)
    {
        this.color = "green";
        setTimeout(this.attackEnd, 2000, object, this);
        
    }
    attackEnd(object, me)
    {
        var vector = [(object.x -  -50 * Math.sin(object.angle))- me.x, (object.y + -50 * Math.cos(object.angle)) - me.y];
        me.add(new Bullet(me.x, me.y, vector[0], vector[1], 5, "green"));
        me.color = "red";
    }
    collison(object) //controll collision
    {
        var vector = [(this.x + 2.5)  - object.x, (this.y - 2.5) - object.y];
        return (Math.sqrt(vector[0] * vector[0] + vector[1]*vector[1]) <=  (object.width + this.radius )  );
    } 
}