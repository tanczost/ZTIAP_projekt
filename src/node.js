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
        if(!parent) console.log("I'm parent "+this.name);
        else console.log("I'm child, my parent is "+ parent);
        if(this.myChilds == []) console.log("I've no childs");

        var parent1 = this.name;

        for(var i = 0; i < this.myChilds.length; i++)
        {
           this.myChilds[i].notify(parent1);
        }
    }
    add(child)
    {
        this.myChilds.push(child);
    }
}