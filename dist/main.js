!function(t){var e={};function s(i){if(e[i])return e[i].exports;var h=e[i]={i:i,l:!1,exports:{}};return t[i].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var h in t)s.d(i,h,function(e){return t[e]}.bind(null,h));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class i{constructor(t,e,s,i,h){this.type=t,this.id=e,this.inner=s,this.mode=i,this.parent=h,this.creat()}creat(){var t=this.mode;this.button=document.createElement(this.type),this.button.id=this.id,this.button.innerHTML=this.inner,parent=this.parent,this.button.onclick=function(){parent.gameMode=t},document.body.appendChild(this.button)}change(t,e,s){switch(parent=this.parent,t){case"zIndex":this.button.style.zIndex=e;break;case"inner":this.button.innerHTML=e;break;case"onclick":this.button.onclick=function(){parent.gameMode=e}}}}class h extends class{constructor(t,e,s,i){this.name=t,this.x=e,this.y=s,this.speed=0,this.angle=0,this.moveAngle=0,this.color=i,this.myChilds=[]}add(t){this.myChilds.push(t)}notify(t){if(t?console.log("I'm child of "+t+", my name is "+this.name):console.log("I'm root, my name is "+this.name),0!=this.myChilds.length){t=this.name;for(var e=0;e<this.myChilds.length;e++)this.myChilds[e]&&this.myChilds[e].notify(t)}else console.log("I've no childs")}movement(t){for(var e=0;e<this.myChilds.length;e++)this.myChilds[e]&&("bullet"==this.myChilds[e].name?this.myChilds[e].creat(t):this.myChilds[e].creat(),this.myChilds[e].movement(t))}writeInStorage(){var t=JSON.parse(localStorage.getItem("names")),e=JSON.parse(localStorage.getItem("scores"));t.includes(this.playersName)?e[t.indexOf(this.playersName)]=this.score:(t.push(this.playersName),e.push(this.score)),localStorage.setItem("names",JSON.stringify(t)),localStorage.setItem("scores",JSON.stringify(e))}readFromStorage(){for(var t=JSON.parse(localStorage.getItem("names")),e=JSON.parse(localStorage.getItem("scores")),s=document.getElementById("scoreTable"),i=0;i<e.length;i++){for(var h=i,o=i+1;o<e.length;o++)e[h]<e[o]&&(h=o);h!=i&&([e[h],e[i]]=[e[i],e[h]],[t[h],t[i]]=[t[i],t[h]])}var n=s.insertRow(0),a=n.insertCell(0),r=n.insertCell(1);a.innerHTML="Tomi",r.innerHTML="35",console.log(e),console.log(t)}killMyChilds(){for(var t=0;t<this.myChilds.length;t++){var e=this.myChilds[t];if(e.x<-40||e.x>1100||e.y<-40||e.y>600){var s=this.myChilds.indexOf(e);this.myChilds.splice(s,1)}else e.killMyChilds()}}}{constructor(t,e,s,i){super(t,e,s,i),this.context=document.getElementById("myCanvas").getContext("2d")}rotateObject(t,e,s,i,h,o){this.context.save(),this.context.translate(t,e),this.context.rotate(h),this.context.drawImage(o,s/-2,i/-2),this.context.restore()}creatText(t,e,s,i,h){this.context.fillStyle=i,this.context.font=s+" Arial",this.context.textAlign="center",this.context.fillText(h,t,e)}createCircle(t,e,s,i){this.context.beginPath(),this.context.arc(t,e,s,0,2*Math.PI),this.context.fillStyle=i,this.context.fill(),this.context.stroke()}clear(t,e,s,i,h){this.context.clearRect(t,e,s,i)}}class o extends h{constructor(t,e,s,i,h,o,n){super(n,t,e),this.width=s,this.height=i,this.type=o,this.image=new Image,this.image.src=h}creat(){"bg"==this.type?this.context.drawImage(this.image,this.x,this.y):((this.speed<0&&this.speed>-2||this.speed>0&&this.speed<2)&&(this.speed*=.995),this.angle+=this.moveAngle*Math.PI/180,this.x+=this.speed*Math.sin(this.angle),this.y-=this.speed*Math.cos(this.angle),this.rotateObject(this.x,this.y,this.width,this.height,this.angle,this.image))}collison(t){var e=[this.x+1*Math.cos(this.angle)-t.x,this.y+3*Math.sin(this.angle)-t.y];return Math.sqrt(e[0]*e[0]+e[1]*e[1])<=this.width/2+2}}class n extends h{constructor(t,e,s,i,h){super(h,t,e,s),this.pixel=i,this.text}creat(t){if(t)var e=t;else e=this.text;this.creatText(this.x,this.y,this.pixel,this.color,e)}}class a extends h{constructor(t,e,s,i,h,o){super(),this.width=h,this.color=o,this.speed=0,this.para_x=t,this.para_y=e,this.vector_x=s,this.vector_y=i,this.length=Math.sqrt(this.vector_x*this.vector_x+this.vector_y*this.vector_y),this.x=this.para_x+this.vector_x*this.speed,this.y=this.para_y+this.vector_y*this.speed,this.name="bullet"}creat(t){this.speed+=40/this.length*t,this.x=this.para_x+this.vector_x*this.speed,this.y=this.para_y+this.vector_y*this.speed,this.createCircle(this.x,this.y,this.width,this.color)}}class r extends h{constructor(t,e,s,i,h){super(h,t,e,i),this.radius=s,this.bubblesShot=!1}creat(){this.x+=this.speed*Math.sin(this.angle)*1,this.y-=this.speed*Math.cos(this.angle)*1,this.createCircle(this.x,this.y,this.radius,this.color)}attack(t){var e=[t.x- -50*Math.sin(t.angle)-this.x,t.y+-50*Math.cos(t.angle)-this.y];this.add(new a(this.x,this.y,e[0],e[1],5,"green"))}collison(t){var e=[this.x+2.5-t.x,this.y-2.5-t.y];return Math.sqrt(e[0]*e[0]+e[1]*e[1])<=t.width+this.radius}}class l extends h{constructor(t){super(t),this.score=0,this.frames=0,this.playersName=!1,this.life=0,this.sound=!1,this.shot=!0,this.gameMode=0,this.buttons=[],this.buttons.push(this.startButton=new i("div","startButton","Start",1,this)),this.buttons.push(this.helpButton=new i("div","helpButton","Help",3,this)),this.buttons.push(this.scoreButton=new i("div","scoreButton","Score",4,this)),this.buttons.push(this.backButton=new i("div","backButton","Main Menu",0,this)),this.backButton.change("zIndex",-1),this.statusButton=document.createElement("img"),this.statusButton.src="../images/pause.png",this.statusButton.id="statusButton",document.body.appendChild(this.statusButton),this.audioButton=document.createElement("img"),this.audioButton.src="../images/soundon.png",this.audioButton.id="audioButton",document.body.appendChild(this.audioButton),this.shotSound=new Audio("../sounds/strela.mp3"),this.matchSound=new Audio("../sounds/pop.mp3"),this.gameoverSound=new Audio("../sounds/game_over.mp3"),this.contactSound=new Audio("../sounds/kontakt.mp3"),this.helpImg=document.createElement("img"),this.helpImg.src="../images/help.png",this.helpImg.id="helpImg",document.body.appendChild(this.helpImg),this.add(this.backGround=new o(0,0,750,500,"../images/background.png","bg","Background")),this.add(this.lifeImg=new o(100,100,128,32,"../images/life3.png","none","Life")),this.add(this.showScore=new n(150,70,"white","50px","Score")),this.add(this.player=new o(500,250,38,28,"../images/jet.png","none","player")),this.title=new n(500,120,"red","100px")}mainMenu(){this.backGround.creat(),this.title.creat("Bubble War"),this.playersName=!1,this.frames=0;for(var t=0;t<this.buttons.length-1;t++)this.buttons[t].change("zIndex",1);document.getElementById("score").style.zIndex=-1,this.backButton.change("zIndex",-1),this.statusButton.style.zIndex=this.audioButton.style.zIndex=this.helpImg.style.zIndex=-1,this.helpButton.change("inner","Help"),this.helpButton.change("onclick",3,this),this.showScore.x=150,this.showScore.y=70,this.life=3}game(t){0==this.frames&&(this.score=0),this.frames++;for(var e=0;e<this.buttons.length;e++)this.buttons[e].change("zIndex",-1);switch(this.statusButton.style.zIndex=this.audioButton.style.zIndex=1,this.statusButton.onclick=function(){gameMode=5},this.statusButton.src="../images/pause.png",this.sound?this.audioButton.onclick=function(){this.sound=!1,this.audioButton.src="../images/soundoff.png"}:this.audioButton.onclick=function(){this.sound=!0,this.audioButton.src="../images/soundon.png"},!0){case this.score<=100:this.levelOne();break;case this.score>100&&this.score<=200:this.levelTwo();break;default:this.levelThree()}this.clear(0,0,1e3,500),this.movement(t);for(e=4;e<this.myChilds.length;e++)for(var s=0;s<this.player.myChilds.length;s++)if(this.myChilds[e].collison(this.player.myChilds[s])){this.sound&&this.matchSound.play();var i=this.myChilds.indexOf(this.myChilds[e]);this.myChilds.splice(i,1),i=this.player.myChilds.indexOf(this.player.myChilds[e]),this.player.myChilds.splice(i,1),this.score+=10}for(e=4;e<this.myChilds.length&&!this.player.collison(this.myChilds[e]);e++){for(s=0;s<this.myChilds[e].myChilds.length&&!this.player.collison(this.myChilds[e].myChilds[s]);s++);if(s!=this.myChilds[e].myChilds.length)break}e!=this.myChilds.length&&(this.life--,this.life>0&&this.sound?this.contactSound.play():this.sound&&this.gameoverSound.play(),this.player.x=Math.floor(900*Math.random()),this.player.y=Math.floor(400*Math.random()),0==this.life?this.gameMode=2:this.lifeImg.image.src=2==this.life?"../images/life2.png":"../images/life1.png"),this.killMyChilds(),this.showScore.x=150,this.showScore.y=70,this.showScore.color="white",this.showScore.text="Score: "+this.score}restartScreen(){this.playersName||(this.playersName=prompt("Enter your name!")),this.myChilds=this.myChilds.slice(0,4),this.frames&&this.writeInStorage(),this.player.speed=this.player.moveAngle=this.frames=0,this.backGround.creat(),this.lifeImg.image.src="../images/life3.png",this.statusButton.style.zIndex=this.audioButton.style.zIndex=-1,this.helpButton.change("zIndex",1),this.helpButton.change("inner","Restart"),this.helpButton.change("onclick",1,this),this.backButton.change("zIndex",1),this.title.creat("Game Over!"),this.showScore.x=this.title.x,this.showScore.y=this.title.y+80,this.showScore.creat(this.playersName+"'s score: "+this.score),this.player.angle=0,this.player.x=500,this.player.y=250,this.life=3}scoreScreen(){this.backGround.creat(),document.getElementById("score").style.zIndex=1,"red"!=this.showScore.color&&this.readFromStorage(),this.showScore.color="red",this.showScore.creat("Best Players");for(var t=0;t<this.buttons.length-1;t++)this.buttons[t].change("zIndex",-1);this.backButton.change("zIndex",1)}helpScreen(){this.backGround.creat();for(var t=0;t<this.buttons.length-1;t++)this.buttons[t].change("zIndex",-1);this.backButton.change("zIndex",1),this.helpImg.style.zIndex=1}pauseScreen(){this.statusButton.onclick=function(){this.gameMode=1},this.statusButton.src="../images/play.png"}levelOne(){if(this.frames%20==0)switch(Math.floor(4*Math.random())+1){case 1:this.add(this.creatBubble([120,240],[100,650],[-10,-20],13,"yellow",2));break;case 2:this.add(this.creatBubble([65,-65],[100,650],[510,520],13,"yellow",2));break;case 3:this.add(this.creatBubble([45,135],[-10,-20],[100,400],13,"yellow",2));break;case 4:this.add(this.creatBubble([225,315],[1010,1020],[100,400],13,"yellow",2))}}levelTwo(){if(this.frames%15==0)switch(Math.floor(4*Math.random())+1){case 1:this.add(this.creatBubble([120,240],[100,650],[-10,-20],15,"red",2));break;case 2:this.add(this.creatBubble([65,-65],[100,650],[510,520],15,"red",2));break;case 3:this.add(this.creatBubble([45,135],[-10,-20],[100,400],15,"red",2));break;case 4:this.add(this.creatBubble([225,315],[1010,1020],[100,400],15,"red",2))}}levelThree(){if(this.frames%20==0)switch(Math.floor(4*Math.random())+1){case 1:this.add(this.creatBubble([120,240],[100,650],[-10,-20],15,"red",2.5));break;case 2:this.add(this.creatBubble([65,-65],[100,650],[510,520],15,"red",2.5));break;case 3:this.add(this.creatBubble([45,135],[-10,-20],[100,400],15,"red",2.5));break;case 4:this.add(this.creatBubble([225,315],[1010,1020],[100,400],15,"red",2.5))}for(var t=4;t<this.myChilds.length;t++)this.myChilds[t]&&this.frames%200==0&&t%5==0&&this.myChilds[t].attack(this.player)}creatBubble(t,e,s,i,h,o){var n=Math.floor(Math.random()*(t[1]-t[0]))+t[0],a=Math.floor(Math.random()*(e[1]-e[0]))+e[0],l=Math.floor(Math.random()*(s[1]-s[0]))+s[0],c=new r(a,l,i,h,"Bubble");return c.speed=o,c.angle=n*Math.PI/180,c}}var c,d,u=0;function m(){switch(d.gameMode){case 0:d.mainMenu();break;case 1:var t=Date.now(),e=(t-c)/100;c=t,d.game(e);break;case 2:d.restartScreen();break;case 3:d.helpScreen();break;case 4:d.scoreScreen();break;default:d.pauseScreen()}requestAnimationFrame(m)}window.onload=function(){d=new l("Screen"),c=Date.now(),m()},window.onkeydown=t=>{27==t.keyCode&&1==d.gameMode?d.gameMode=5:27==t.keyCode&&5==d.gameMode&&(d.gameMode=1),77==t.keyCode&&d.sound?(d.sound=!1,d.audioButton.src="../images/soundoff.png"):77!=t.keyCode||d.sound||(d.sound=!0,d.audioButton.src="../images/soundon.png"),37==t.keyCode&&(d.player.moveAngle=-2),39==t.keyCode&&(d.player.moveAngle=2),40==t.keyCode&&(d.player.speed=-2),38==t.keyCode&&(d.player.speed=2),32==t.keyCode&&d.shot&&(d.sound&&d.shotSound.play(),u++,d.player.add(new o(d.player.x+2,d.player.y-2,5,5,"../images/bullet.png","none","bullet"+u)),d.player.myChilds[d.player.myChilds.length-1].speed=10,d.player.myChilds[d.player.myChilds.length-1].angle=d.player.angle,d.shot=!1)},window.onkeyup=t=>{37==t.keyCode&&(d.player.moveAngle=0),39==t.keyCode&&(d.player.moveAngle=0),40==t.keyCode&&(d.player.speed=-1.9),38==t.keyCode&&(d.player.speed=1.9),32==t.keyCode&&(d.shot=!0)}}]);