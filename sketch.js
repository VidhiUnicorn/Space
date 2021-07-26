var rocket;
var space;
var star;
var astroid;
var gameState = 1;
var PLAY,END;
var gameOver;
var starCT = 0,score = 0;

function preload(){

    astroidImg = loadImage ("astroid.png");
    rocketImg = loadImage("ROCKETSHIP.png");
    spaceImg = loadImage ("space.png");
    starImg = loadImage ("star.png")
    gameOverImg = loadImage ("gameOver (1).png")
}

function setup() {
    
    createCanvas(600,800);
    
    space = createSprite (width/2,400);
    space.addImage (spaceImg);
    space.scale =4
    space.velocityY = 2;
 
    rocket = createSprite (300,700);
    rocket.addImage (rocketImg);
    rocket.scale = 0.3;
    rocket.setCollider("rectangle",0,0,250,500);
    
    astroidG = createGroup ();
    starG = createGroup ();

    gameOver = createSprite (300,400);
    gameOver.addImage (gameOverImg);


}
   

function draw() {
 
    if(gameState === 1){
        if(space.y >= 500 ){
            space.y = width/2;
        }
    
        rocket.x = mouseX;
        rocket.y = mouseY;
    
        if(Math.round(frameCount % 10 === 0)){
            score = score + 1
        }
        

        spawnStars();
        spawnAstoids();
           
        console.log(astroidG.isTouching(rocket));
        gameOver.visible = false;

        if (starG.isTouching (rocket)){
            starG.destroyEach();
            starCT = starCT + 1;

        }

        if (astroidG.isTouching (rocket)) {
            gameState = 0;

        }
     

    }
        if (gameState === 0){
            background(0);
           
            astroidG.destroyEach();
            space.destroy();
             rocket.destroy();

            gameOver.visible = true;
            
           

        } 

    
    
    
    drawSprites()
    textSize (30);
    fill (255);
    text ("Score : "+ score, 50,50)
    text ("Stars : " + starCT, 50,100)
        
}


function spawnAstoids(){
    
    if (frameCount % 150 === 0){
    
        astroid = createSprite (Math.round(random (50,550),0));
        astroid.addImage (astroidImg);
        astroid.velocityY = 2;
        astroid.lifetime = 400;
        astroid.scale = 0.5;
        

        astroidG.add(astroid);

    }
}

function spawnStars(){
    
    if (frameCount % 1000 === 0){
    
        star = createSprite (Math.round(random (50,550),0));
        star.addImage (starImg);
        star.velocityY = 2;
        star.lifetime = 400;
        star.scale = 0.5;

        starG.add (star);

    }
}