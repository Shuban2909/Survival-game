var PLAY = 1 ;
var END = 0 ;
var gameState = PLAY ;
var Hero ;
var HeroImg ;
var ground ;
var score ;
var alien ;
var alienImg ;
var aliensGroup ;
var bullet;
var bgimg;



function preload() {
  HeroImg = loadImage("unnamed.jpg");
  alienImg = loadImage("alien.png") ;
  bgimg = loadImage("back.jpg");
}

function setup() {
  createCanvas(400,400);
  
  Hero = createSprite(50,350,20,20) ;
  Hero.addImage(HeroImg);
  Hero.scale = 0.2

 
  
  ground = createSprite(200,1600,400,20);
  ground.depth = -10 ;
  
  aliensGroup = new Group();
  bulletsGroup = new Group();

  score = 0 ;
}

function draw() {
  background(bgimg) ;
  
  stroke("black")
  fill("yellow");
  textSize(30)
  text("Kill The aliens", 100,50);


  
  
  
 if(gameState === PLAY){
   
   if(keyDown("space")) {
    
    spawnBullets();
   }
  
   
 if(aliensGroup.isTouching(bulletsGroup)){
    aliensGroup.destroyEach();
    bulletsGroup.destroyEach();
  }
   
   spawnalien() ;
  
   if(aliensGroup.isTouching(Hero)) {
     gameState = END ;
   }
   
 }
   else if (gameState === END) {
     ground.velocityX = 0 ;
     Hero.velocityY = 0 ;
     
     stroke("black")
     fill("yellow");
     textSize(20)
     text("GAME OVER" , 150,150 ) ;
     textSize()
     text("Press R To Restart" , 100,200)
     
     
     aliensGroup.setLifetimeEach(-1);
     aliensGroup.setVelocityXEach(0);
     
    
    
 }
  
  if(keyDown("r")) {
   restart() ;
  }

  Hero.collide(ground) ;
  
drawSprites() ; 
}

function spawnalien() {
  if (frameCount % 100 === 0){
   var alien = createSprite(350,340,10,40);
    var rand = Math.round(random(80,120));
    alien.addImage(alienImg) ;
    alien.velocityX = -6 ;   
    alien.scale = 0.5 ;
    alien.lifetime = 100 ;
    alien.depth = 10 ;
    alien.setCollider("circle" , 0,0,150 ) ;
  
    
    
    aliensGroup.add(alien);
  }
  
}

function restart() {
    gameState = PLAY ;
    score = 0 ;
    aliensGroup.destroyEach() ;
}

function spawnBullets() {
   var bullet = createSprite(100,330,10,10);
    var rand = Math.round(random(80,120));
    bullet.velocityX = 6 ;  
    bullet.lifetime = 100 ;
    bullet.depth = 10 ;
  
    
    
    bulletsGroup.add(bullet);
  
}
