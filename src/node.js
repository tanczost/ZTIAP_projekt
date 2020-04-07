export class Node
{
    constructor(name, x, y, color)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.color = color;
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
                if(this.myChilds[i].name == "bullet") this.myChilds[i].creat(dt);
                else this.myChilds[i].creat();
                this.myChilds[i].movement(dt);
            }
        }
    } 
    writeInStorage()
    {
        var names = JSON.parse(localStorage.getItem('names'));
        var scores = JSON.parse(localStorage.getItem('scores'));
        var i = names.includes(this.playersName);
        if(i && this.score > scores[names.indexOf(this.playersName)]) scores[names.indexOf(this.playersName)] = this.score;
        else {names.push(this.playersName); scores.push(this.score);}


        localStorage.setItem('names',JSON.stringify(names));
        localStorage.setItem('scores',JSON.stringify(scores));
    }
    readFromStorage()
    {
        var names = JSON.parse(localStorage.getItem('names'));
        var scores = JSON.parse(localStorage.getItem('scores'));
        var table = document.getElementById('scoreTable');
        
        for(var i = 0; i < scores.length; i++) //sortovanie score
        {
            var maxIndex = i;
            for(var j = i + 1; j < scores.length; j++)
            {
                if(scores[maxIndex] > scores[j]) maxIndex = j;
            }
            if(maxIndex != i)
            {
                [scores[maxIndex], scores[i]] = [scores[i], scores[maxIndex]];
                [names[maxIndex], names[i]] = [names[i], names[maxIndex]];
            }
        }

        for(var i = 0,  j = scores.length  - 8 ; i < 8 ; i++, j++)
        {
            var row = table.insertRow(0);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = names[j];
            cell2.innerHTML = scores[j];
        }

        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "Player"
        cell2.innerHTML = "Score";

        console.log(names);
        console.log(scores);
    }
    killMyChilds()
    {
        for(var i = 0; i < this.myChilds.length; i++)
        {
            var object = this.myChilds[i];

            if(object.x < -40 || object.x > 1100 || object.y < -40 || object.y > 600)
            {
                var index = this.myChilds.indexOf(object);
                this.myChilds.splice(index, 1);
                continue;
            }

            object.killMyChilds();
        }
    }
    
}