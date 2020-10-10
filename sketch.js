
var monkey , monkey_running, monkeyCollide;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var ground,invisibeGround;
var score = 0;
var bananaScore = 0;
var PLAY = 1
var END = 0
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   monkeyCollide = loadAnimation("sprite_3.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);

  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.addAnimation("collide", monkeyCollide);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4
  ground.x = ground.width/2;
 invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = false;

obstaclesGroup = createGroup();
  FoodGroup = createGroup();
 
}




function draw() {
 background("white");
  text("SURVIVAL TIME: "+score, 470, 20);
   text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState ===PLAY){
  food();
 obs();
     score = score + Math.round(getFrameRate()/60);
    if(ground.x > 00){
     ground.x = 300
 
  }
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
      }
   monkey.velocityY = monkey.velocityY + 0.8
  
  
  
  if(monkey.isTouching(FoodGroup)){
     bananaScore++; 
    FoodGroup.destroyEach();
    
  }
    if (obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
    if (gameState === END){
     ground.velocityX = 0
      
    ///monkey.y = 235;
    //monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
      monkey.velocityX = 0
      obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    
    }
 
  }
  
  
  
  drawSprites(); 
  monkey.collide(invisibleGround);
}
function food(){
  if (frameCount % 200 === 0) {
    banana = createSprite(600, 600, 40, 10);
    banana.y = Math.round(random(200 ,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 300;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    //add each cloud to the group
    FoodGroup.add(banana);
  
  }
 
} 
 

function obs(){
  
  
  if (frameCount % 80 === 0) {
    obstacle = createSprite(600, 330, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }

  
  
  
}





