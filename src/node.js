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
        if(color == "red") this.life = 2;
        else this.life = 1;
        this.myChilds = [];
    }
    add(object) 
    {
        this.myChilds.push(object);
    }
    killMyChildren() //remove childrens
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

            object.killMyChildren();
        }
    }
    movement(dt)//function to move all objects
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
    writeInStorage() //write new score to localstorage
    {
        var names = JSON.parse(localStorage.getItem('names'));
        var scores = JSON.parse(localStorage.getItem('scores'));
        var exist = names.includes(this.playersName);
        if(exist && this.score > scores[names.indexOf(this.playersName)]) scores[names.indexOf(this.playersName)] = this.score;
        else if(!exist) {names.push(this.playersName); scores.push(this.score);}
        

        localStorage.setItem('names',JSON.stringify(names));
        localStorage.setItem('scores',JSON.stringify(scores));
    }
    readFromStorage() //read score table from localstorage
    {
        var names = JSON.parse(localStorage.getItem('names'));
        var scores = JSON.parse(localStorage.getItem('scores'));
        var table = document.getElementById('scoreTable');
        table.innerHTML = "";

        if(scores.length == 0) return;

        for(var i = 0; i < scores.length; i++) //sortovanie score
        {
            var maxIndex = i;
            for(var j = i + 1; j < scores.length; j++) if(scores[maxIndex] < scores[j]) maxIndex = j;
            if(maxIndex != i)
            {
                [scores[maxIndex], scores[i]] = [scores[i], scores[maxIndex]];
                [names[maxIndex], names[i]] = [names[i], names[maxIndex]];
            }
        }


        for(var i = 0,  j = 0 ; i < 8 && j < scores.length ; i++, j++)
        {
            var row = table.insertRow(-1);

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
    }
}