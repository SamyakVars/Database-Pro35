var balloon, bg, database, balloonPos;

var balloon2, balloonPosition;

var balloonI, balloonI2, balloonI3;

var height, height2;


function preload(){
  bg = loadImage("Img/Hab1.png")

  balloonI = loadAnimation("Img/Hab2.png", "Img/Hab3.png", "Img/Hab4.png")
  balloonI2 = loadImage("Img/Hab3.png")
  balloonI3 = loadImage("Img/Hab4.png");

}

function setup() {
  createCanvas(925,550);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("Image",balloonI)
  balloon.scale = 0.3

  balloon2 = createSprite(400, 200, 50, 50);
  balloon2.addAnimation("Image",balloonI)
  balloon2.scale = 0.3

  database = firebase.database();

  balloonPos = database.ref("balloon/position")
  balloonPos.on("value", readPos, showE)

  balloonPosition = database.ref("balloon2/position")
  balloonPosition.on("value", readPosition, showE)

}

function draw() {
  background(bg); 

  console.log(height)
  console.log(height2)
  //console.log(database.ref("balloon/position/y"))

  if(keyDown(LEFT_ARROW)){
    writePos(-1, 0)
  }else if(keyDown(RIGHT_ARROW)){
    writePos(+1, 0)
  }else if(keyDown(DOWN_ARROW)){
    writePos(0, +1)
    balloon.addAnimation("Image", balloonI2)
    balloon.scale += 0.001
  }else if(keyDown(UP_ARROW)){
    writePos(0, -1)
    balloon.addAnimation("Image", balloonI3)
    balloon.scale -= 0.001
  }



  if(keyCode == 97){
    writePosition(-1, 0)
  }else if(keyCode == 100){
    writePosition(+1, 0)
  }else if(keyCode == 115){
    writePosition(0, +1)
    balloon2.addAnimation("Image", balloonI2)
    balloon2.scale += 0.001
  }else if(keyCode == 119){
    writePosition(0, -1)
    balloon2.addAnimation("Image", balloonI3)
    balloon2.scale -= 0.001
  }


  textSize(15)
  text("*Use Arrow Keys to move Balloon 1", 30, 30)
  text("*Use WASD Keys to move Balloon 2", 30, 50)
  drawSprites();
  
}


function readPos(data){

  height = data.val()
  balloon.x = height.x
  balloon.y = height.y

}

function writePos(x, y){

  database.ref("balloon/position").set({
    'x': height.x + x,
    'y': height.y + y
  })

}

function showE(){
  console.log("Error with Database")
}


function readPosition(data){

  height2 = data.val()
  balloon2.x = height2.x
  balloon2.y = height2.y

}

function writePosition(x, y){

  database.ref("balloon2/position").set({
    'x': height2.x + x,
    'y': height2.y + y
  })

}
