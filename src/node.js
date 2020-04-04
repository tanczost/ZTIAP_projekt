

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
    writeInStorage()
    {
        var names = JSON.parse(localStorage.getItem('names'));
        var scores = JSON.parse(localStorage.getItem('scores'));
        var i;
        /*for(i = 0; i < names.length; i++)
        {
            if(this.playersName === names[i])
            {
                names[i] = this.playersName; scores[i] = this.score; break;
            }
        }
        if(i == names.length)
        {
            names.push(this.playersName); scores.push(this.score);
        }*/

        var i = names.includes(this.playersName);
        if(i) scores[names.indexOf(this.playersName)] = this.score;
        else {names.push(this.playersName); scores.push(this.score);}


        localStorage.setItem('names',JSON.stringify(names));
        localStorage.setItem('scores',JSON.stringify(scores));
    }
    readFromStorage()
    {
        var names = JSON.parse(localStorage.getItem('names'));
        var scores = JSON.parse(localStorage.getItem('scores'));
    }
    
}