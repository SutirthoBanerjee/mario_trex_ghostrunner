var hypnoticBall, database;
var position;
var pc, heart
var ground
var gameState = "play" 
var flyGround, flyGroundGroup
var mush, mush_img, mushGroup
var invisflyGroup
function preload(){
  mario_img = loadAnimation("images/marioR.png", "images/marioL.png")
  bg_img = loadImage("images/bg.jpg")
  fly_img = loadImage("images/fly.jpg")
  mush_img = loadImage("images/mush.png")
  heart_img = loadImage("images/marioH.png")
}
function setup(){
  canvas = createCanvas(1000, 500);
  ground = createSprite(0, 0)
  for (var i = 15; i < 200; i = i+40)
  {
    heart = createSprite(i, 450, 5, 5)
    heart.addImage("heart", heart_img)
    heart.scale = 0.1
  }
  ground.addImage("ground", bg_img)
  ground.scale=1.4
  ground.velocityX = -3
  pc = createSprite(50, 355, 20, 20);
  pc.addAnimation("mario", mario_img)
  pc.scale=0.25
 pc.debug = true

  invisibleGround = createSprite(0, 360, 2000, 5)
  invisibleGround.visible = false
  flyGroundGroup = new Group();
  invisflyGroup = new Group();
}

function draw(){
 background("lightblue")
 if (gameState === "play"){

  if(ground.x < 0){
    ground.x = ground.width/2
  }
  pc.collide(invisibleGround)
  
  spawnFlyGround()
  
  if (keyDown("D")){
    pc.x += 5

  }
  if (keyDown("A")){
    pc.x -= 5

  }
  if (keyDown("W")){
    pc.velocityY = -7
    
  }
  pc.velocityY += 0.5
  if (flyGroundGroup.isTouching(pc)){
    gameState = "end"
  }
}
  else if (gameState === "end"){
    ground.velocityX = 0
    invisflyGroup.setVelocityXEach(0)
    flyGroundGroup.setVelocityXEach(0)
    pc.velocityY = 0
  }

 drawSprites(); 
}

function spawnFlyGround(){
  if (frameCount%150 === 0){
    flyGround = createSprite(900, 180, 20, 5)
    flyGround.y = Math.round(random(150, 350))
    flyGround.scale = 0.25
    flyGround.addImage(fly_img)
    flyGround.velocityX = -5
    flyGroundGroup.add(flyGround);
    invisfly = createSprite(900, 150, 150, 2)
    invisfly.velocityX = -5
    invisfly.visible = false
    invisflyGroup.add(invisfly)
    invisfly.y = flyGround.y - 20
    flyGround.lifeTime = 500
    flyGround.depth = pc.depth
    pc.depth += 1
    if(frameCount%450 === 0){
    mush = createSprite(900, 155, 10,5)
    mush.addImage(mush_img)
    mush.scale = 0.1
    mush.velocityX = -5
    mush.y = flyGround.y - 40
    mush.lifeTime = 500
    mush.depth = pc.depth
    pc.depth += 1
    }
   
  }

}

