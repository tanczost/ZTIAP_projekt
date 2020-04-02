import { canvasFunctions } from './objectCanvas';

export class Bullet  extends canvasFunctions
{
    constructor(para_x, para_y, vector_x, vector_y, width, color)
    {
        super();
        this.width = width;
        this.color = color;
        this.speed = 0;
        this.para_x = para_x;
        this.para_y = para_y;
        this.vector_x = vector_x;
        this.vector_y = vector_y;
        this.length = Math.sqrt(this.vector_x * this.vector_x + this.vector_y * this.vector_y);
        this.x = this.para_x + (this.vector_x * this.speed);
        this.y = this.para_y + (this.vector_y * this.speed);
        
    }

    creat(dt)
    {
        this.speed += (40 / this.length ) * dt;
        this.x = this.para_x + (this.vector_x * this.speed);
        this.y = this.para_y + (this.vector_y * this.speed);
        this.createCircle(this.x, this.y, this.width, this.color);
    }
}