

export class Node
{
    constructor(name)
    {
        this.name = name;
        this.myChilds = [];
    }
    add(object)
    {
        this.myChilds.push(object);
    }
    notify(parent)
    {

        if(!parent) console.log("I'm root, my name is "+this.name);

        else console.log("I'm child of "+parent+", my name is "+this.name);

        if(this.myChilds.length == 0)
        {
            console.log("I've no childs");
            return;
        }
        else
        {
            var parent = this.name;

            for(var i = 0; i < this.myChilds.length; i++)
            {
                if(this.myChilds[i]) this.myChilds[i].notify(parent);
                
            }
        }
    }
    movement(dt)
    {
        for(var i = 0; i < this.myChilds.length; i++)
        {
            if(this.myChilds[i]) 
            {
                this.myChilds[i].creat();
                this.myChilds[i].movement();
            }
        }
    } 
    
}