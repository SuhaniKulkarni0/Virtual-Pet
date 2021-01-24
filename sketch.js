//Create variables here
var  dog, happyDog, database, foodS, foodStock

var database

var food = 20

function preload()
{
  //load images here
  dog1 = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database()

  dog = createSprite(250,250,10,10)

  foodstock = database.ref("food").on("value", readStock)
  
  dog.scale = 0.3
  dog.addImage(dog1)
}


function draw() {  
  background(46, 139, 87)

  drawSprites();
  //add styles here
  textSize(15)
  fill("white");
  text("Food Remaining:"+ food ,190,450)

  fill("white");
  text("Press the up arrow to feed the dog",140,50)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    food = food - 1
    dog.addImage(happyDog)
   
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}
