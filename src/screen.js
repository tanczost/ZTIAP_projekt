import { Buttons } from './buttons';
import { myImage } from './myimage';
import { canvasFunctions } from './objectCanvas';
import {Text } from './text'
import { Circle } from './circle';
import { command } from './variables';


export class Screen extends canvasFunctions
{
    constructor(name)
    {
        super(name);
        this.score = 0;
        this.frames = 0;
        this.playersName = false;
        this.life = 0;
        this.sound = true; 
        this.shot = true;
        this.gameMode = 0;

        //buttons
        this.buttons = [];
        this.buttons.push(new Buttons("div", "startButton", "Start", 1, this, command.startButton));
        this.buttons.push(new Buttons("div", "helpButton", "Help", 3, this, command.helpButton));
        this.buttons.push( new Buttons("div", "scoreButton", "Score", 4, this, command.scoreButton));
        this.buttons.push(new Buttons("div", "backButton", "Main Menu", 0, this, command.backButton));
        this.buttons.push(new Buttons("img", "statusButton", "../images/pause.png" , 5, this, command.statusButton));
        this.buttons.push(this.audioButton = new Buttons("img", "audioButton", "../images/soundon.png" , false, this, command.audioButton));

        //audio
        this.shotSound = new Audio("../sounds/strela.mp3");
        this.matchSound = new Audio("../sounds/pop.mp3");
        this.gameoverSound = new Audio("../sounds/game_over.mp3");
        this.contactSound = new Audio("../sounds/kontakt.mp3");        
        //audio

        //help Image
        this.helpImg =  document.createElement("img");
        this.helpImg.src = '../images/help.png';
        this.helpImg.id = "helpImg";
        document.body.appendChild(this.helpImg);
        //help Image

        //child objects
        this.add(this.lifeImg = new myImage(120, 100, 128, 32, '../images/life3.png',"none", "Life")); 
        this.add(this.showScore = new Text(100, 70, "white", "40px", "Score"));
        this.add( this.player = new myImage(500, 250, 38, 28, '../images/jet.png',"player","Player")); //creat players object
        
        this.title = new Text(500, 120, "red", "100px");
        
    }
    mainMenu()
    {
        this.clear(0, 0, 1000, 500);
        this.title.creat("Bubble War");
        this.playersName = false;
        this.frames = 0;
        this.myChilds = this.myChilds.slice(0, 3); //delete bubbles from childs
        this.player.speed = this.player.moveAngle =  this.frames = 0;
        this.lifeImg.image.src = "../images/life3.png";


        /*button settings*/
        this.changeButtons("mainMenu");
        this.helpImg.style.zIndex = document.getElementById('score').style.zIndex = -1;
        /***************/

        /*set scores params */
        this.showScore.x = 150;
        this.showScore.y = 70;
        this.life = 3;
    }
    game(dt)
    {
        if(this.frames == 0) this.score = 0; //set score to 0
        this.frames++; 
       
        this.changeButtons("game");
        if(!this.sound){ this.audioButton.change("onclick", true);  this.audioButton.change("inner", "../images/soundoff.png");}
        else {this.audioButton.change("onclick", false);  this.audioButton.change("inner", "../images/soundon.png");};

        /***********LEVEL SWITCH************/
        switch(true)
        {
            case(this.score <= 100):
                this.levelOne();
                break;
            case(this.score > 100 && this.score <= 200):
                this.levelTwo();
                break;
            default:
                this.levelThree();
        }
        /***********************************/


        this.clear(0,0,1000,500); //clear the canvas

        this.movement(dt); //move all objects

        for(var i = 3; i < this.myChilds.length; i++)   //controll my shots and bubbles collison
        {
            for(var j = 0; j < this.player.myChilds.length; j++)
            { 
                if(this.player.myChilds[j] && this.myChilds[i] && this.myChilds[i].collison(this.player.myChilds[j])) //if collision true
                {
                    if(this.sound)  this.matchSound.play();
                    var index = this.myChilds.indexOf(this.myChilds[i]);
                    this.myChilds.splice(index, 1);
                    index = this.player.myChilds.indexOf(this.player.myChilds[j]);
                    this.player.myChilds.splice(index, 1);
                    this.score += 10; 
                }
            }
        }

        var i;
        for(i = 3;  i < this.myChilds.length; i++) //controll players collision /w other objects
        {
            if(this.player.collison(this.myChilds[i])) break;
            var j = 0;
            for(;  j < this.myChilds[i].myChilds.length; j++) if(this.player.collison(this.myChilds[i].myChilds[j])) break;
            if(j !=  this.myChilds[i].myChilds.length) break;
        }

        if(i !=  this.myChilds.length) //if i == this.myChilds.length then player didnt have collision 
        {
            this.life--;
            if(this.life > 0 && this.sound) this.contactSound.play();
            //else if(this.sound) this.gameoverSound.play();

            this.player.x = Math.floor(Math.random() * 900); this.player.y = Math.floor(Math.random() * 400);

            if(this.life == 0) this.gameMode = 2;
            else this.lifeImg.image.src = (this.life == 2 ? "../images/life2.png" : "../images/life1.png");
        }

        this.killMyChildren(); //remove unnecessary object
        
        /*******SET SCOREs ARGUMENTs********/
        this.showScore.x = 130;
        //this.showScore.y = 70;
        this.showScore.color = "white";
        this.showScore.text = "Score: "+this.score;
        /***********************************/

    }
    restartScreen()
    {
        this.clear(0, 0, 1000, 500);
        this.gameoverSound.play();
        while(!this.playersName) 
        {
            this.playersName = prompt("Enter your name!");
        }
        
        this.myChilds = this.myChilds.slice(0, 3); //delete bubbles from childs

        this.writeInStorage();

        this.player.speed = this.player.moveAngle =  this.frames = 0;
        
        this.lifeImg.image.src = "../images/life3.png";

        this.changeButtons("restartScreen");

        this.title.creat("Game Over!");
        this.showScore.x = this.title.x;
        this.showScore.y = this.title.y + 80;
        this.showScore.creat(this.playersName+"'s score: "+this.score);

        this.player.angle = 0;
        this.player.x = 500;
        this.player.y = 250;

        this.life = 3;
    }
    scoreScreen()
    {
        this.clear(0, 0, 1000, 500);
        document.getElementById('score').style.zIndex = 1;

        if(this.showScore.color != "red") this.readFromStorage();
        this.showScore.color = "red";
        this.showScore.creat("Best Players");

        this.changeButtons("scoreScreen");
    }
    helpScreen()
    {
        
        this.clear(0,0 ,1000, 500);
        this.changeButtons("helpScreen");
        this.helpImg.style.zIndex = 1 ;

    }
    pauseScreen()
    {
       this.changeButtons("pausescreen");
    }
    levelOne()
    {
        if(this.frames % 20 ==0) //creat new bubble
        {
            var a = Math.floor(Math.random() * 4) + 1;

            switch (a)
            {
                case 1: //down
                    this.add(this.creatBubble([120, 240],[100, 650], [-10, -20], 13, "yellow", 2));  //angle interval, position_x interval, position_y interval
                    break;
                case 2: //up
                    this.add(this.creatBubble([65,-65],[100, 650], [510, 520], 13, "yellow", 2));
                    break;
                case 3: //right
                    this.add(this.creatBubble([45, 135],[-10, -20], [100, 400], 13, "yellow", 2));
                    break;
                case 4: //left
                    this.add(this.creatBubble([225, 315],[1010, 1020], [100, 400], 13, "yellow", 2));
            }
        }  
    }
    levelTwo()
    {
        if(this.frames % 15 ==0) //creat new bubble
        {
            var a = Math.floor(Math.random() * 4) + 1;

            switch (a)
            {
                case 1: //down
                    this.add(this.creatBubble([120, 240],[100, 650], [-10, -20], 15, "red", 2));  //angle interval, position_x interval, position_y interval
                    break;
                case 2: //up
                    this.add(this.creatBubble([65,-65],[100, 650], [510, 520], 15, "red", 2));
                    break;
                case 3: //right
                    this.add(this.creatBubble([45, 135],[-10, -20], [100, 400], 15, "red", 2));
                    break;
                case 4: //left
                    this.add(this.creatBubble([225, 315],[1010, 1020], [100, 400], 15, "red", 2));
            }
        } 
    }
    levelThree()
    {
        if(this.frames % 20 ==0) //creat new bubble
        {
            var a = Math.floor(Math.random() * 4) + 1;

            switch (a)
            {
                case 1: //down
                    this.add(this.creatBubble([120, 240],[100, 650], [-10, -20], 15, "red", 2.5));  //angle interval, position_x interval, position_y interval
                    break;
                case 2: //up
                    this.add(this.creatBubble([65,-65],[100, 650], [510, 520], 15, "red", 2.5));
                    break;
                case 3: //right
                    this.add(this.creatBubble([45, 135],[-10, -20], [100, 400], 15, "red", 2.5));
                    break;
                case 4: //left
                    this.add(this.creatBubble([225, 315],[1010, 1020], [100, 400], 15, "red", 2.5));
            }
        } 
        for(var i = 4; i < this.myChilds.length; i++)
        {
            if(this.myChilds[i]) //if bubble exist
            {
                if(this.frames % 200 == 0 && i % 5 == 0 ) this.myChilds[i].attack(this.player);
            }
        }
    }
    creatBubble(interval, position_X, position_Y, radius, color, speed)
    {
        
        var randomAngle = Math.floor(Math.random() * (interval[1] - interval[0])) + interval[0];
        var randomX = Math.floor(Math.random() * (position_X[1] - position_X[0])) + position_X[0];
        var randomY = Math.floor(Math.random() * (position_Y[1] - position_Y[0])) + position_Y[0];
        var bubble = new Circle(randomX, randomY, radius, color, "Bubble");
        bubble.speed = speed;
        bubble.angle =  randomAngle * Math.PI/180;
        return bubble;
    }
    changeButtons(page)
    {
        for(var i = 0; i < this.buttons.length; i++)
        {
            var button = this.buttons[i].commands;
            var call = this.buttons[i]
            for(var row = 0; row < button.length; row++)
            {
                if(button[row][0] != page) continue;
                for(var command = 1; command < button[row].length; command++)
                {
                    call["change"]( button[row][command][0],button[row][command][1]);
                }
            }
        }
    }
}