var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var gameState;
var bedroom,garden,livingroom,washroom;

function preload(){
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
  bedroom = loadImage("images/Bed Room.png");
  washroom = loadImage("images/Wash Room.png");
  garden = loadImage("images/Garden.png");
  livingroom = loadImage("images/Living Room.png");
  milkImg = loadImage("images/Milk.png");

}

function setup() {
  
  createCanvas(1000, 600);

  database = firebase.database();

  foodObj=new Food();
  
  dog = createSprite(500,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  milkBotltle1 = createSprite(140,535,10,10);
  milkBotltle1.addImage(milkImg);
  milkBotltle1.scale = 0.06;

  milkBotltle2 = createSprite(210,280,10,10);
  milkBotltle2.addImage(milkImg);
  milkBotltle2.scale = 0.06;
  milkBotltle2.visible = false;

}


function draw() {  
  background("yellow")

  foodObj.display();
  writeStock(foodS);
  
  if(foodS == 0){
    dog.addImage(happyDog);
    milkBotltle2.visible=false;
  }else{
    dog.addImage(dogImg);
    milkBotltle2.visible=true;
  }
  var gameStateRef=database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState = data.val();
  });

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }
  if(gameState===2){
    dog.addImage(dogImg);
    dog.scale=0.175;
    milkBotltle2.visible=false;
    dog.y=250;
  }
  
  var Bath=createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Play=createButton("Lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,540);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}



//----------------------------------------------------EXTRA CODES------------------------------------------------
//---------------------------------------------------------------------------------------------------------

// function feedDog(){
//   dog.addImage(happyDogImg);

//   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
//   database.ref('/').update({
//     Food:foodObj.getFoodStock(),
//     FeedTime:hour()
//     // gameState: 'Hungry'
//   })
// }


// function addFoods(){
//   foodS++;
//   database.ref('/').update({
//    Food:foodS
//   })
// }

// function update(state){
//   database.ref('/').update({
//     gameState: state
//   });
// }
    


  // if(foodS !== undefined){

  //   textSize(20);
  //   fill(0);
  //   text("NOTE: Press UP_ARROW to feed the Drago milk!", width/2-200, 100 );
  //   text("Food left:"+ foodS, width/2-40, 130);

  //   if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happyDogImg)
  //  }
  //   if(keyWentUp(UP_ARROW)){
  //   dog.addImage(dogImg)
  //  }
  //  if(foodS === 0){
  //    foodS =  20;
  //  }


  // function writeStock(x){
  //   if(x<=0){
  //     x=0
  //   }else{
  //     x = x-1;
  //   }
  //   database.ref("/").update({
  //     Food:x
  //   })
  //   }
// 
// 
// 
// 
// 
// 
// 
// 
// 
//
  // currentTime = hour();
  // if(currentTime==(lastFed+1)){
  //   update("Playing");
  //   foodObj.garden();
  // }else if(currentTime==(lastFed+2)){
  //   update("Sleeping");
  //   foodObj.bedroom();
  // }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  //   update("Bathing");
  //   foodObj.washroom();
  // }else{
  //   update("Hungry");
  //   foodObj.display();
  // }

  // if(gameState != "Hungry"){
  //   feed.hide();
  //   addFood.hide();
  //   dog.remove();
  // }else{
  //   feed.show();
  //   addFood.show();
  //   dog.addImage(dogImg)
  // }

  