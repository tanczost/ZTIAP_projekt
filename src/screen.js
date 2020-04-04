import { Buttons } from './buttons';
import { myImage } from './myimage';
import { canvasFunctions } from './objectCanvas';
import {Text } from './text'
import { Circle } from './circle';

export class Screen extends canvasFunctions
{
    constructor(name)
    {
        super(name);
        
        this.score = 0;
        this.frames = 0;
        this.playersName = false;
        this.life = 0;
        this.sound = false; //sound
        this.shot = true;
        this.gameMode = 0;


        //div buttons
        this.buttons = [];
        this.buttons.push(this.startButton = new Buttons("div", "startButton", "Start", 1, this));
        this.buttons.push(this.helpButton =  new Buttons("div", "helpButton", "Help", 3, this));
        this.buttons.push(this.scoreButton = new Buttons("div", "scoreButton", "Score", 4, this));
        this.buttons.push(this.backButton = new Buttons("div", "backButton", "Main Menu", 0, this));
        this.backButton.change("zIndex", -1);
        //div buttons

        //img buttons
        this.statusButton = document.createElement("img");
        this.statusButton.src = "../images/pause.png"
        this.statusButton.id = "statusButton";
        document.body.appendChild(this.statusButton);

        this.audioButton = document.createElement("img");
        this.audioButton.src ="../images/soundon.png"
        this.audioButton.id = "audioButton";
        document.body.appendChild(this.audioButton);
        //img buttons

        //audio
        this.shotSound = new Audio("../sounds/strela.mp3");
        this.matchSound = new Audio("../sounds/pop.mp3");
        this.gameoverSound = new Audio("../sounds/game_over.mp3");
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
        this.add(this.backGround = new myImage(0, 0, 750, 500, '../images/background.png', "bg", "Background"));  //creat background
        this.add(this.lifeImg = new myImage(100, 100, 128, 32, '../images/life3.png',"none", "Life")); 
        this.add(this.showScore = new Text(150, 70, "white", "50px", "Score"));
        this.add( this.player = new myImage(500, 250, 38, 28, '../images/jet.png',"none","player")); //creat players object
        
        this.title = new Text(500, 120, "red", "100px");
        
    }
    mainMenu()
    {
        this.backGround.creat();
        this.title.creat("Bubble War");
        this.playersName = false;
        this.frames = 0;

        /*button settings*/
        for(var i = 0; i < this.buttons.length - 1; i++) this.buttons[i].change("zIndex", 1); //show buttons
        document.getElementById('score').style.zIndex = -1;
        this.backButton.change("zIndex", -1);
        this.statusButton.style.zIndex = this.audioButton.style.zIndex = this.helpImg.style.zIndex = -1; 

        this.helpButton.change("inner", "Help");
        this.helpButton.change("onclick", 3, this);
        /***************/

        this.showScore.x = 150;
        this.showScore.y = 70;
        this.life = 3;
    }
    game(dt)
    {
        
        if(this.frames == 0) this.score = 0; //set score to 0
        this.frames++; 

        /*hide  buttons*/
        for(var i = 0; i < this.buttons.length; i++) this.buttons[i].change("zIndex", -1);
        /********/
               
        //image buttons settings      
        this.statusButton.style.zIndex = this.audioButton.style.zIndex =  1;
        this.statusButton.onclick = function(){gameMode = 5;};
        this.statusButton.src = "../images/pause.png";
        if(this.sound) this.audioButton.onclick = function(){this.sound = false; this.audioButton.src = "../images/soundoff.png";};
        else this.audioButton.onclick = function(){this.sound = true; this.audioButton.src = "../images/soundon.png";};
        //image buttons settings

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
        /*
        for(var i = 0; i < this.myChilds.length; i++) 
            for(var j = 0; j < this.myChilds[i].myChilds.length; j++) 
                if(this.deleteObject(this.myChilds[i].myChilds[j], this.myChilds[i]))
                    break;
        /*******MOVEMENT'S OF OBJECTS********/
        for(var i = 4; i < this.myChilds.length; i++)
        {
            if(this.myChilds[i]) 
            {
                if(this.player.collison(this.myChilds[i])) 
                { 
                    this.myChilds[i] = false;
                    this.life--;
                    if(this.life > 0 && this.sound) this.contactSound.play();
                    else if(this.sound)  this.gameoverSound.play();

                    this.player.x = Math.floor(Math.random() * 900); this.player.y = Math.floor(Math.random() * 400);
                    if(this.life == 0)
                    { 
                        this.gameMode = 2; 
                    }
                    else this.lifeImg.image.src = (this.life == 2 ? "../images/life2.png" : "../images/life1.png");
                    
                    break;
                    
                } 
                if(this.myChilds[i].bubblesShot)
                {
                    this.myChilds[i].bubblesShot.creat(dt);
                    if(this.player.collison(this.myChilds[i].bubblesShot)) 
                    { 
                        this.myChilds[i].bubblesShot = false;
                        this.life--;
                        if(this.life > 0 && this.sound) this.contactSound.play();
                        else if(this.sound) this.gameoverSound.play();

                        this.player.x = Math.floor(Math.random() * 900); this.player.y = Math.floor(Math.random() * 400);
                        if(this.life == 0)
                        {
                            this.gameMode = 2;
                        }
                        else this.lifeImg.image.src = (this.life == 2 ? "../images/life2.png" : "../images/life1.png");

                    }
                }    

            }
        }
        this.movement(); //move all objects
        for(var i = 4; i < this.myChilds.length; i++)   //controll my shots and bubbles collison
        {
            for(var j = 0; j < this.player.myChilds.length; j++)
            { 
                if(this.player.myChilds[j] && this.myChilds[i]) //if exist bullet and bubble
                {
                    if(this.myChilds[i].collison(this.player.myChilds[j])) //if collision true
                    {
                        if(this.sound)  this.matchSound.play();
                        this.myChilds[i] = false;
                        delete this.player.myChilds[j];
                        this.score += 10; 
                        continue;
                    }
                }
            }
            if(this.myChilds[i].bubblesShot) //if bubble have a shot
            {
                this.myChilds[i].bubblesShot.creat(dt); // bubble's shot move
                if(this.player.collison(this.myChilds[i].bubblesShot)) //controll the collison btw player and bubble's shot
                { 
                    this.myChilds[i].bubblesShot = false;
                    this.life--;

                    if(this.life > 0 && this.sound) this.contactSound.play();
                    else if(this.sound) this.gameoverSound.play();

                    this.player.x = Math.floor(Math.random() * 900); this.player.y = Math.floor(Math.random() * 400);

                    if(this.life == 0) this.gameMode = 2;
                    else this.lifeImg.image.src = (this.life == 2 ? "../images/life2.png" : "../images/life1.png");

                }
            }    
        }
        /***********************************/
        
        /*******SET SCORE ARGUMENTs********/
        this.showScore.x = 150;
        this.showScore.y = 70;
        this.showScore.color = "white";
        this.showScore.text = "Score: "+this.score;
        /***********************************/

    }
    restartScreen()
    {

        if(!this.playersName) 
        {
            this.playersName = prompt("Enter your name!");
        }
        this.myChilds = this.myChilds.slice(0, 4); //delete bubbles from childs

        if(this.frames) this.writeInStorage();

        this.player.speed = this.player.moveAngle =  this.frames = 0;
        this.backGround.creat();
        
        this.lifeImg.image.src = "../images/life3.png";

        this.statusButton.style.zIndex = this.audioButton.style.zIndex = -1;

        this.helpButton.change("zIndex", 1);
        this.helpButton.change("inner", "Restart");
        this.helpButton.change("onclick", 1, this);

        this.backButton.change("zIndex", 1);

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
        this.backGround.creat();
        document.getElementById('score').style.zIndex = 1;
        

        

        if(this.showScore.color != "red") this.readFromStorage();
        this.showScore.color = "red";
        this.showScore.creat("Best Players");

        for(var i = 0; i < this.buttons.length - 1; i++) //hide buttons
            this.buttons[i].change("zIndex", -1);
        this.backButton.change("zIndex", 1);


    }
    helpScreen()
    {
        this.backGround.creat();

        for(var i = 0; i < this.buttons.length - 1; i++) //hide buttons
            this.buttons[i].change("zIndex", -1);
        this.backButton.change("zIndex", 1);
        this.helpImg.style.zIndex = 1 ;

    }
    pauseScreen()
    {
        this.statusButton.onclick = function(){this.gameMode = 1;};
        this.statusButton.src = "../images/play.png";

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
                if(this.frames % 200 == 0 && i % 15 == 0 ) this.myChilds[i].attack(this.player);
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
}