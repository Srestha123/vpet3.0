
var database,dog2,foodS,foodStock,dog,happyDog,tm,hr,dn,garden,gardenImg,injection,inj,vaccine,sleep,sleepImg,play,gm,playImg,foodstock,bath,bathImg,dead,lazy,running,gamestate;
function preload()
{
 dog1=loadImage("Dog.png");
 dog2=loadImage("dogImg1.png");
 bathImg=loadImage("Wash Room.png");
 playImg=loadImage("Living Room.png");
 gardenImg=loadImage("Garden.png");
 sleepImg=loadImage("Bed Room.png");
 lazy=loadImage("Lazy.png");
 injection=loadImage("Injection.png");
 dead=loadImage("dead.jpg");
}
function setup() {
  createCanvas(500, 500);
  feed=createButton("FEED THE DOG");
  feed.position(700,70);
  refill=createButton("ADD FOOD");
  refill.position(700,95);
  refill.mousePressed(addFood);

  feed.hide();
  refill.hide();
  vaccine=createSprite(250,250,20,20);
  vaccine.addImage(injection);
  vaccine.visible=false;
  inj=createButton("vaccine");
  inj.position(700,120);
  inj.mousePressed(vl);
  inj2=createButton("vaccination done");
  inj2.position(700,150);
  inj2.mousePressed(vl2);
  database=firebase.database();
  dog=createSprite(250,400,10,10);
  dog.scale=0.2;
  ground=createSprite(250,490,500,10);
  ground.visible=false;
  dog.addImage(dog1);
  bath=createSprite(250,250,500,500);
  bath.addImage(bathImg);
  bath.visible=false;
  garden=createSprite(250,250,500,500);
  garden.addImage(gardenImg);
  garden.visible=false;
  sleep=createSprite(250,250,500,500);
  sleep.addImage(sleepImg);
  sleep.visible=false;
  play=createSprite(250,250,500,500);
  play.addImage(playImg);
  play.visible=false;
  hr=hour();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  timefed=database.ref('lastfed');
  timefed.on("value",readtm);
  gamestate=database.ref('gameState');
  gamestate.on("value",readgm);
  milk=new Food();
}
function draw() {  
background(46,139,87);
if(hr===11){
  gamestate="bath";
}
else if(hr===12){
  gamestate="garden";
}
else if(hr===14){
  gamestate="play";
}
else if(hr===21||hr===22||hr===23||hr===0||hr===1||hr===2||hr===3||hr===4||hr===5||hr===6||hr===7){
  gamestate="sleep";
}
else{
  gamestate="feed";
}
if(gamestate==="bath"){
bath.visible=true;
}
if(gamestate==="garden"){
  garden.visible=true;
  bath.visible=false;
  }
  if(gamestate==="play"){
    play.visible=true;
    garden.visible=false;
    bath.visible=false;
  }
  if(gamestate==="sleep"){
    sleep.visible=true;
    play.visible=false;
    garden.visible=false;
    bath.visible=false;
  }
  if(gamestate==="feed"){
    sleep.visible=false;
    play.visible=false;
    garden.visible=false;
    bath.visible=false;
    refill.show();
    feed.show();
  }
  
 
  
  if(foodS===0){
    gamestate="dead"
  }
  if(gamestate==="dead"){
    sleep.visible=false;
    play.visible=false;
    garden.visible=false;
    bath.visible=false;
    refill.show();
    feed.show();
    dog.addImage(dead);
  }
  writegm(gamestate);
dog.collide(ground);
milk.display();
mp();
  drawSprites();
 fill("yellow");
 textSize(15); 
 text("FOOD REMAINING:"+foodS,10,15);
 if(hr===0){
   text("LAST-FED:"+tm+"AM",10,30)
 }
if(hr<12){
 text("LAST-FED:"+tm+"AM",10,30); 
}
if(hr>=12){
  text("LAST-FED:"+tm+"PM",10,30);
}
 text("don't let the food be zero",250,160);
 
text(dn,100,100);
}
function readStock(data){
  foodS=data.val();
}
function writeStock(){
  if(foodS<=0){
    foodS= 0;
  }
  else{
    foodS=foodS-1
  }
    database.ref('/').update({
        Food:foodS
      })
      writetm(tm);
      if(foodS!=0&&foodS>=1){
      dog.velocityY=-20;
      }
     dog.addImage(dog2);
}
function addFood(){
  if(foodS>=30){
    foodS=30;
  }
  else{
    foodS=foodS+1;
  }
  database.ref('/').update({
   Food:foodS 
  })
  dog.addImage(dog1);
}
function readtm(data){
tm=data.val();
}
function writetm(z){
  z=hour();
  if(z>12){
    z=z-12;
  }
  if(z===0){
    z=12;
  }
  database.ref('/').update({
    lastfed:z
  })
}
function writegm(z){
database.ref('/').update({
  gameState:z
})
}
function mp(){
  feed.mousePressed(writeStock);
  if (dog.y<=130){
dog.velocityY=dog.velocityY+30;
  }
  }
  function readgm(gm){
gm=data.val();
  }
  function vl(){
    vaccine.visible=true;
  }
  function vl2(){
    vaccine.visible=false;
  }
 
