!function(e){var t={};function s(i){if(t[i])return t[i].exports;var h=t[i]={i:i,l:!1,exports:{}};return e[i].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var h in e)s.d(i,h,function(t){return e[t]}.bind(null,h));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t),s.d(t,"main",(function(){return S}));class i{constructor(e,t,s,i,h,n){this.type=e,this.id=t,this.inner=s,this.mode=i,this.parent=h,this.commands=n,this.creat()}creat(){var e=this.mode;this.button=document.createElement(this.type),this.button.id=this.id,"img"==this.type?this.button.src=this.inner:this.button.innerHTML=this.inner,parent=this.parent,"audioButton"==this.id?this.button.onclick=function(){parent.sound=e}:this.button.onclick=function(){parent.gameMode=e,S()},document.body.appendChild(this.button)}change(e,t){switch(parent=this.parent,e){case"zIndex":this.button.style.zIndex=t;break;case"inner":"img"==this.type?this.button.src=t:this.button.innerHTML=t;break;case"onclick":"audioButton"==this.id?this.button.onclick=function(){parent.sound=t}:this.button.onclick=function(){parent.gameMode=t,S()}}}}class h extends class{constructor(e,t,s,i){this.name=e,this.x=t,this.y=s,this.speed=0,this.angle=0,this.moveAngle=0,this.color=i,this.myChilds=[]}add(e){this.myChilds.push(e)}killMyChildren(){for(var e=0;e<this.myChilds.length;e++){var t=this.myChilds[e];if(t.x<-40||t.x>1100||t.y<-40||t.y>600){var s=this.myChilds.indexOf(t);this.myChilds.splice(s,1)}else t.killMyChildren()}}movement(e){for(var t=0;t<this.myChilds.length;t++)this.myChilds[t]&&("bullet"==this.myChilds[t].name?this.myChilds[t].creat(e):this.myChilds[t].creat(),this.myChilds[t].movement(e))}writeInStorage(){var e=JSON.parse(localStorage.getItem("names")),t=JSON.parse(localStorage.getItem("scores")),s=e.includes(this.playersName);s&&this.score>t[e.indexOf(this.playersName)]?t[e.indexOf(this.playersName)]=this.score:s||(e.push(this.playersName),t.push(this.score)),localStorage.setItem("names",JSON.stringify(e)),localStorage.setItem("scores",JSON.stringify(t))}readFromStorage(){var e=JSON.parse(localStorage.getItem("names")),t=JSON.parse(localStorage.getItem("scores")),s=document.getElementById("scoreTable");s.innerHTML="";for(var i=0;i<t.length;i++){for(var h=i,n=i+1;n<t.length;n++)t[h]<t[n]&&(h=n);h!=i&&([t[h],t[i]]=[t[i],t[h]],[e[h],e[i]]=[e[i],e[h]])}for(i=0,n=0;i<8&&n<t.length;i++,n++){var r=(o=s.insertRow(-1)).insertCell(0),a=o.insertCell(1);r.innerHTML=e[n],a.innerHTML=t[n]}var o;r=(o=s.insertRow(0)).insertCell(0),a=o.insertCell(1);r.innerHTML="Player",a.innerHTML="Score"}notify(e){if(e?console.log("I'm child of "+e+", my name is "+this.name):console.log("I'm root, my name is "+this.name),0!=this.myChilds.length){e=this.name;for(var t=0;t<this.myChilds.length;t++)this.myChilds[t]&&this.myChilds[t].notify(e)}else console.log("I've no childs")}}{constructor(e,t,s,i){super(e,t,s,i),this.context=document.getElementById("myCanvas").getContext("2d")}rotateObject(e,t,s,i,h,n){this.context.save(),this.context.translate(e,t),this.context.rotate(h),this.context.drawImage(n,s/-2,i/-2),this.context.restore()}creatText(e,t,s,i,h){this.context.fillStyle=i,this.context.font=s+" Arial",this.context.textAlign="center",this.context.fillText(h,e,t)}createCircle(e,t,s,i){this.context.beginPath(),this.context.arc(e,t,s,0,2*Math.PI),this.context.fillStyle=i,this.context.fill(),this.context.stroke()}clear(e,t,s,i){this.context.clearRect(e,t,s,i)}}class n extends h{constructor(e,t,s,i,h,n,r){super(r,e,t),this.width=s,this.height=i,this.type=n,this.image=new Image,this.image.src=h}creat(){if("bg"==this.type)this.context.drawImage(this.image,this.x,this.y);else if("player"==this.type){switch((this.speed<0&&this.speed>-2||this.speed>0&&this.speed<2)&&(this.speed*=.995),this.angle+=this.moveAngle*Math.PI/180,this.x+=this.speed*Math.sin(this.angle),this.y-=this.speed*Math.cos(this.angle),!0){case this.x>1e3:this.x=0;break;case this.x<0:this.x=1e3;break;case this.y>500:this.y=0;break;case this.y<0:this.y=500}this.rotateObject(this.x,this.y,this.width,this.height,this.angle,this.image)}else this.angle+=this.moveAngle*Math.PI/180,this.x+=this.speed*Math.sin(this.angle),this.y-=this.speed*Math.cos(this.angle),this.rotateObject(this.x,this.y,this.width,this.height,this.angle,this.image)}collison(e){var t=[this.x+1*Math.cos(this.angle)-e.x,this.y+3*Math.sin(this.angle)-e.y];return Math.sqrt(t[0]*t[0]+t[1]*t[1])<=this.width/2+2}}class r extends h{constructor(e,t,s,i,h){super(h,e,t,s),this.pixel=i,this.text}creat(e){if(e)var t=e;else t=this.text;this.creatText(this.x,this.y,this.pixel,this.color,t)}}class a extends h{constructor(e,t,s,i,h,n){super(),this.width=h,this.color=n,this.speed=0,this.para_x=e,this.para_y=t,this.vector_x=s,this.vector_y=i,this.length=Math.sqrt(this.vector_x*this.vector_x+this.vector_y*this.vector_y),this.x=this.para_x+this.vector_x*this.speed,this.y=this.para_y+this.vector_y*this.speed,this.name="bullet"}creat(e){this.speed+=40/this.length*e,this.x=this.para_x+this.vector_x*this.speed,this.y=this.para_y+this.vector_y*this.speed,this.createCircle(this.x,this.y,this.width,this.color)}}class o extends h{constructor(e,t,s,i,h){super(h,e,t,i),this.radius=s,this.bubblesShot=!1}creat(){this.x+=this.speed*Math.sin(this.angle)*1,this.y-=this.speed*Math.cos(this.angle)*1,this.createCircle(this.x,this.y,this.radius,this.color)}attack(e){var t=[e.x- -50*Math.sin(e.angle)-this.x,e.y+-50*Math.cos(e.angle)-this.y];this.add(new a(this.x,this.y,t[0],t[1],5,"green"))}collison(e){var t=[this.x+2.5-e.x,this.y-2.5-e.y];return Math.sqrt(t[0]*t[0]+t[1]*t[1])<=e.width+this.radius}}const l=[["mainMenu",["zIndex",1],["onclick",1],["inner","Start"]],["game",["zIndex",-1],["onclick",1],["inner","Start"]],["restartScreen"],["scoreScreen",["zIndex",-1]],["helpScreen",["zIndex",-1]],["pausescreen"]],c=[["mainMenu",["zIndex",1],["onclick",3],["inner","Help"]],["game",["zIndex",-1]],["restartScreen",["zIndex",1],["onclick",1],["inner","Restart"]],["scoreScreen",["zIndex",-1]],["helpScreen",["zIndex",-1]],["pausescreen",["zIndex",1],["onclick",1],["inner","Resume"]]],d=[["mainMenu",["zIndex",1],["onclick",4],["inner","Score"]],["game",["zIndex",-1]],["restartScreen"],["scoreScreen",["zIndex",-1]],["helpScreen",["zIndex",-1]],["pausescreen",["zIndex",1],["onclick",0],["inner","Main Menu"]]],u=[["mainMenu",["zIndex",-1],["onclick",0],["inner","Main Menu"]],["game",["zIndex",-1]],["restartScreen",["zIndex",1]],["scoreScreen",["zIndex",1]],["helpScreen",["zIndex",1]],["pausescreen"]],m=[["mainMenu",["zIndex",-1],["onclick",5],["inner","../images/pause.png"]],["game",["zIndex",1],["onclick",5],["inner","../images/pause.png"]],["restartScreen",["zIndex",-1]],["scoreScreen",["zIndex",-1]],["helpScreen",["zIndex",-1]],["pausescreen",["zIndex",1],["onclick",1],["inner","../images/play.png"]]],y=[["mainMenu",["zIndex",-1],["onclick",!1],["inner","../images/soundon.png"]],["game",["zIndex",1]],["restartScreen",["zIndex",-1]],["scoreScreen",["zIndex",-1]],["helpScreen",["zIndex",-1]],["pausescreen"]];class p extends h{constructor(e){super(e),this.score=0,this.frames=0,this.playersName=!1,this.life=0,this.sound=!0,this.shot=!0,this.gameMode=0,this.buttons=[],this.buttons.push(new i("div","startButton","Start",1,this,l)),this.buttons.push(new i("div","helpButton","Help",3,this,c)),this.buttons.push(new i("div","scoreButton","Score",4,this,d)),this.buttons.push(new i("div","backButton","Main Menu",0,this,u)),this.buttons.push(new i("img","statusButton","../images/pause.png",5,this,m)),this.buttons.push(this.audioButton=new i("img","audioButton","../images/soundon.png",!1,this,y)),this.shotSound=new Audio("../sounds/strela.mp3"),this.matchSound=new Audio("../sounds/pop.mp3"),this.gameoverSound=new Audio("../sounds/game_over.mp3"),this.contactSound=new Audio("../sounds/kontakt.mp3"),this.helpImg=document.createElement("img"),this.helpImg.src="../images/help.png",this.helpImg.id="helpImg",document.body.appendChild(this.helpImg),this.add(this.lifeImg=new n(120,100,128,32,"../images/life3.png","none","Life")),this.add(this.showScore=new r(150,70,"white","50px","Score")),this.add(this.player=new n(500,250,38,28,"../images/jet.png","player","Player")),this.title=new r(500,120,"red","100px")}mainMenu(){this.clear(0,0,1e3,500),this.title.creat("Bubble War"),this.playersName=!1,this.frames=0,this.changeButtons("mainMenu"),this.helpImg.style.zIndex=document.getElementById("score").style.zIndex=-1,this.showScore.x=150,this.showScore.y=70,this.life=3}game(e){switch(0==this.frames&&(this.score=0),this.frames++,this.changeButtons("game"),this.sound?(this.audioButton.change("onclick",!1),this.audioButton.change("inner","../images/soundon.png")):(this.audioButton.change("onclick",!0),this.audioButton.change("inner","../images/soundoff.png")),!0){case this.score<=100:this.levelOne();break;case this.score>100&&this.score<=200:this.levelTwo();break;default:this.levelThree()}this.clear(0,0,1e3,500),this.movement(e);for(var t=3;t<this.myChilds.length;t++)for(var s=0;s<this.player.myChilds.length;s++)if(this.player.myChilds[s]&&this.myChilds[t]&&this.myChilds[t].collison(this.player.myChilds[s])){this.sound&&this.matchSound.play();var i=this.myChilds.indexOf(this.myChilds[t]);this.myChilds.splice(i,1),i=this.player.myChilds.indexOf(this.player.myChilds[s]),this.player.myChilds.splice(i,1),this.score+=10}for(t=3;t<this.myChilds.length&&!this.player.collison(this.myChilds[t]);t++){for(s=0;s<this.myChilds[t].myChilds.length&&!this.player.collison(this.myChilds[t].myChilds[s]);s++);if(s!=this.myChilds[t].myChilds.length)break}t!=this.myChilds.length&&(this.life--,this.life>0&&this.sound?this.contactSound.play():this.sound&&this.gameoverSound.play(),this.player.x=Math.floor(900*Math.random()),this.player.y=Math.floor(400*Math.random()),0==this.life?this.gameMode=2:this.lifeImg.image.src=2==this.life?"../images/life2.png":"../images/life1.png"),this.killMyChildren(),this.showScore.x=150,this.showScore.y=70,this.showScore.color="white",this.showScore.text="Score: "+this.score}restartScreen(){for(this.clear(0,0,1e3,500);!this.playersName;)this.playersName=prompt("Enter your name!");this.myChilds=this.myChilds.slice(0,4),this.writeInStorage(),this.player.speed=this.player.moveAngle=this.frames=0,this.lifeImg.image.src="../images/life3.png",this.changeButtons("restartScreen"),this.title.creat("Game Over!"),this.showScore.x=this.title.x,this.showScore.y=this.title.y+80,this.showScore.creat(this.playersName+"'s score: "+this.score),this.player.angle=0,this.player.x=500,this.player.y=250,this.life=3}scoreScreen(){this.clear(0,0,1e3,500),document.getElementById("score").style.zIndex=1,"red"!=this.showScore.color&&this.readFromStorage(),this.showScore.color="red",this.showScore.creat("Best Players"),this.changeButtons("scoreScreen")}helpScreen(){this.clear(0,0,1e3,500),this.changeButtons("helpScreen"),this.helpImg.style.zIndex=1}pauseScreen(){this.changeButtons("pausescreen")}levelOne(){if(this.frames%20==0)switch(Math.floor(4*Math.random())+1){case 1:this.add(this.creatBubble([120,240],[100,650],[-10,-20],13,"yellow",2));break;case 2:this.add(this.creatBubble([65,-65],[100,650],[510,520],13,"yellow",2));break;case 3:this.add(this.creatBubble([45,135],[-10,-20],[100,400],13,"yellow",2));break;case 4:this.add(this.creatBubble([225,315],[1010,1020],[100,400],13,"yellow",2))}}levelTwo(){if(this.frames%15==0)switch(Math.floor(4*Math.random())+1){case 1:this.add(this.creatBubble([120,240],[100,650],[-10,-20],15,"red",2));break;case 2:this.add(this.creatBubble([65,-65],[100,650],[510,520],15,"red",2));break;case 3:this.add(this.creatBubble([45,135],[-10,-20],[100,400],15,"red",2));break;case 4:this.add(this.creatBubble([225,315],[1010,1020],[100,400],15,"red",2))}}levelThree(){if(this.frames%20==0)switch(Math.floor(4*Math.random())+1){case 1:this.add(this.creatBubble([120,240],[100,650],[-10,-20],15,"red",2.5));break;case 2:this.add(this.creatBubble([65,-65],[100,650],[510,520],15,"red",2.5));break;case 3:this.add(this.creatBubble([45,135],[-10,-20],[100,400],15,"red",2.5));break;case 4:this.add(this.creatBubble([225,315],[1010,1020],[100,400],15,"red",2.5))}for(var e=4;e<this.myChilds.length;e++)this.myChilds[e]&&this.frames%200==0&&e%5==0&&this.myChilds[e].attack(this.player)}creatBubble(e,t,s,i,h,n){var r=Math.floor(Math.random()*(e[1]-e[0]))+e[0],a=Math.floor(Math.random()*(t[1]-t[0]))+t[0],l=Math.floor(Math.random()*(s[1]-s[0]))+s[0],c=new o(a,l,i,h,"Bubble");return c.speed=n,c.angle=r*Math.PI/180,c}changeButtons(e){for(var t=0;t<this.buttons.length;t++)for(var s=this.buttons[t].commands,i=this.buttons[t],h=0;h<s.length;h++)if(s[h][0]==e)for(var n=1;n<s[h].length;n++)i.change(s[h][n][0],s[h][n][1])}}class g{constructor(){this.none=!1}buttonDown(e,t){27==t.keyCode&&1==e.gameMode?e.gameMode=5:27==t.keyCode&&5==e.gameMode&&(e.gameMode=1,S()),77==t.keyCode&&e.sound?(e.sound=!1,e.audioButton.src="../images/soundoff.png"):77!=t.keyCode||e.sound||(e.sound=!0,e.audioButton.src="../images/soundon.png"),37==t.keyCode&&(e.player.moveAngle=-2),39==t.keyCode&&(e.player.moveAngle=2),40==t.keyCode&&(e.player.speed=-2),38==t.keyCode&&(e.player.speed=2),32==t.keyCode&&e.shot&&(e.sound&&e.shotSound.play(),e.player.add(new n(e.player.x+2,e.player.y-2,5,5,"../images/bullet.png","none","bullet")),e.player.myChilds[e.player.myChilds.length-1].speed=10,e.player.myChilds[e.player.myChilds.length-1].angle=e.player.angle,e.shot=!1)}buttonUp(e,t){37==t.keyCode&&(e.player.moveAngle=0),39==t.keyCode&&(e.player.moveAngle=0),40==t.keyCode&&(e.player.speed=-1.9),38==t.keyCode&&(e.player.speed=1.9),32==t.keyCode&&(e.shot=!0)}}var x,f,b;function S(){switch(f.gameMode){case 0:f.mainMenu();break;case 1:var e=Date.now(),t=(e-x)/100;x=e,f.game(t),requestAnimationFrame(S);break;case 2:f.restartScreen();break;case 3:f.helpScreen();break;case 4:f.scoreScreen();break;default:f.pauseScreen()}}0==localStorage.length&&(localStorage.setItem("names",JSON.stringify([])),localStorage.setItem("scores",JSON.stringify([]))),window.onload=function(){f=new p("Screen"),b=new g,x=Date.now(),S()},window.onkeydown=e=>{b.buttonDown(f,e)},window.onkeyup=e=>{b.buttonUp(f,e)}}]);