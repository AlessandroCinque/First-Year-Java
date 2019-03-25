 //as soon as window loads,
//run the init) function to start everything
window.onload = init();
c = document.getElementById("Tile");
ctx=c.getContext("2d");

//Set the speed of the game
var time = 60;
var x=1 , y=1 ; // player start position
var Ex= 7, Ey= 7; //Enemy 1 start position
var Ex2= 10, Ey2= 9;
var Ex3= 1, Ey3= 14;
var Bx= 9, By = 9;
var Bx1= 2, By1 = 14;
//=========================================================================Ex2 + 0.25,Ey2 + 0.25
//var Bx= Ex2 + 0.25, By= Ey2 + 0.25;
//===== "BOOLS" =========
var doorHit= false; // Player has NOT escaped
var doorHit2= false; // Player has NOT escaped
var PlayerHitted= false; //Player hasn't been hitted
var HittedEnemy= false;  //Player didn't touch the enemy
var gamestate = 0;
//	
//============== dimension of a tile ================
var arrayX = 18;
var arrayY = 18;
var tilesize= 50; 
var trigger = 1;
var Bullettrigger = 1;
var Bullettrigger1 = 1;
var BullettriggerLV2 = 1;
var Bullettrigger1LV2 = 1;
var state = 0;
c.width=tilesize * arrayX;
c.height=tilesize * arrayY;


var gridArray =[
//x  y:1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,
/*1*/ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
/*2*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,2,1],
/*3*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
/*4*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
/*5*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
/*6*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
/*7*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
/*8*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
/*9*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
/*10*/[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
/*11*/[1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,1,1],
/*12*/[1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1],
/*13*/[1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,1],
/*14*/[1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1],
/*15*/[1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1],
/*16*/[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
/*17*/[1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
/*18*/[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

];
var gridArray2 =[
//x  y:1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,
/*1*/ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
/*2*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
/*3*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
/*4*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
/*5*/ [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
/*6*/ [1,1,1,0,1,1,1,1,0,0,0,0,1,0,1,1,0,1],
/*7*/ [1,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,1],
/*8*/ [1,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,1],
/*9*/ [1,0,0,0,0,0,0,1,1,1,0,0,1,0,1,1,0,1],
/*10*/[1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,1],
/*11*/[1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,1],
/*12*/[1,0,0,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
/*13*/[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1],
/*14*/[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1],
/*15*/[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
/*16*/[1,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,1],
/*17*/[1,1,1,0,1,1,0,1,2,1,0,0,1,0,0,0,0,1],
/*18*/[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

];

/*
for (B=0;B<10; B++)
{
	var Bx,By;
	[1].x=3;
	[1].y=3;
	
}
*/

function init()
{
	//set the size of the grid
	
	
	/////////// load tile images /////////
	
	/*
	var grassReady = false;
	var grassImage = new Image();
	grassImage.onload = function ()
	{ 
	grassReady = true;
	};
	grassImage.src = "pix/grass.png"; 
	*/
}

// Write functions to draw all the different tiles(and the player)
function wall (x3,y3) // 1 wall
{
	/*
	ctx.fillStyle = "grey";
	ctx.fillRect(x3*tilesize, y3*tilesize, tilesize, tilesize);
	*/
	var Wall = false;
	var WallImage = new Image();
	WallImage.onload = function ()
	{ 
	Wall = true;
	};
	WallImage.src = "Wall.png"; 
	ctx.drawImage(WallImage,x3*tilesize,y3*tilesize);
}
function door(x4,y4)
{
	var Door = false;
	var DoorImage = new Image();
	DoorImage.onload = function ()
	{ 
	Door = true;
	};
	DoorImage.src = "Door.png"; 
	ctx.drawImage(DoorImage,x4*tilesize,y4*tilesize);
}

function block(x1,y1) // 0 grass
{
	/*
	ctx.fillStyle = "white";
	ctx.fillRect(x1*tilesize, y1*tilesize, tilesize, tilesize);
	*/
	var BG = false;
	var BGImage = new Image();
	BGImage.onload = function ()
	{ 
	BG = true;
	};
	BGImage.src = "BG.png"; 
	ctx.drawImage(BGImage,x1*tilesize,y1*tilesize);
}
//==================Player====================
function player1 (x2,y2) 
{
	/*
	ctx.fillStyle = "blue";
	ctx.fillRect(x2*tilesize, y2*tilesize, tilesize, tilesize);
	*/
	var Player = false;
	var PlayerImage = new Image();
	PlayerImage.onload = function ()
	{ 
	Player = true;
	};
	PlayerImage.src = "Player.png"; 
	ctx.drawImage(PlayerImage,x2*tilesize,y2*tilesize);
	
}
//===================Enemy1===================
function enemy1(ex,ey)
{
	/*
	ctx.fillStyle= "black";
	ctx.fillRect(ex*tilesize,ey*tilesize,tilesize,tilesize);
	*/
	var Enemy = false;
	var EnemyImage = new Image();
	EnemyImage.onload = function ()
	{ 
	Player = true;
	};
	EnemyImage.src = "Enemy.png"; 
	ctx.drawImage(EnemyImage,ex*tilesize,ey*tilesize);
	
}
//===================Enemy2===================
function enemy2(ex2,ey2)
{
	var Enemy = false;
	var EnemyImage = new Image();
	EnemyImage.onload = function ()
	{ 
	Player = true;
	};
	EnemyImage.src = "Enemy.png"; 
	ctx.drawImage(EnemyImage,ex2*tilesize,ey2*tilesize);
}
//===================Enemy3===================
function enemy3(ex3,ey3)
{
	var Enemy = false;
	var EnemyImage = new Image();
	EnemyImage.onload = function ()
	{ 
	Player = true;
	};
	EnemyImage.src = "FlippedE.png"; 
	ctx.drawImage(EnemyImage,ex3*tilesize,ey3*tilesize);
}
//===================Bullet===================
function Bullet(Bx,By)
{
	var Bullet = false;
	var BulletImage = new Image();
	BulletImage.onload = function ()
	{ 
	Bullet = true;
	};
	BulletImage.src = "Bullet.png"; 
	ctx.drawImage(BulletImage,Bx*tilesize,By*tilesize);
}
//===================Bullet1===================
function Bullet1(Bx1,By2)
{
	var Bullet = false;
	var BulletImage = new Image();
	BulletImage.onload = function ()
	{ 
	Bullet = true;
	};
	BulletImage.src = "Bullet.png"; 
	ctx.drawImage(BulletImage,Bx*tilesize,By*tilesize);
}
// create a pre-defined level using a double array, where numbers represent different tiles
//Trying to create an enemy path
/*function enemy1()
{
	
	
}
*/
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown",function (e)
{
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup",function(e)
{
	delete keysDown[e.keyCode];
}, false);

addEventListener("keydown", function(e) {
    // space and arrow keys
    if([13,32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)
	{
        e.preventDefault();
    }
}, false);

//Draw boxes
function clear()
{
	ctx.fillStyle = "black";
	ctx.clearRect(0,0, c.width, c.height);
}

//loop through the grid array and check the value of each element
function drawGrid(gridx)
{
	for (var X=0; X < arrayX; X++)
	{
		for(var Y=0; Y < arrayY; Y++)
		{
			if(gridx[X][Y] == 0)//grass
			{
				block (X,Y);
			}
			else if (gridx[X][Y] == 1)
			{
				wall(X,Y);
			}
			else if (gridx[X][Y] ==2)
			{
				door (X,Y);
			}
		}
	}
	
}
//===================DRAW Player===================
function drawPlayer()
{
	player1(x,y);
}
//===================DRAW Enemy====================
function drawEnemy1()
{
	enemy1(Ex,Ey);
}
//===================DRAW Enemy====================
function drawEnemy2()
{
	enemy2(Ex2,Ey2);
}
//===================DRAW Enemy====================
function drawEnemy3()
{
	enemy3(Ex3,Ey3);
}
//===================DRAW Bullet====================
function drawBullet()
{
	Bullet(Bx, By);
}
//===================DRAW Bullet1====================
function drawBullet1()
{
	Bullet(Bx1, By1);
}
// Draw everything on the canvas
function drawStuff()
{
//========================= STATE 0 MENU=======================
	if(gamestate == 0)
	{
		ctx.fillStyle = "black";
		ctx.font = "30px Helvetica";
		ctx.fillText ("WELCOME TO THE BLUE PLANET!",200,500);
		ctx.fillText ("Press START for run the game.",230,550);

		if(13 in keysDown)
		{
			gamestate = 1;
			x=1 , y=1 ; // player start position
			Ex= 7, Ey= 7; //Enemy 1 start position
			Ex2= 10, Ey2= 9;
			Ex3= 1, Ey3= 14;
			Bx= 9, By = 9;
			Bx1= 2, By1 = 14;
			doorHit= false; // Player has NOT escaped
			doorHit2= false; // Player has NOT escaped
			PlayerHitted= false; //Player hasn't been hitted
			HittedEnemy= false;  //Player didn't touch the enemy
			trigger = 1;
			Bullettrigger = 1;
			Bullettrigger1 = 1;
		}
	}
//========================= STATE 1 LEVEL 1=======================
	if(gamestate == 1)
	{
		drawGrid(gridArray);
	//=================DRAW IN THE LEVEL 1 Player  ============
		player1(x,y);
	//=================DRAW IN THE LEVEL 1 Enemy 1 ============
		enemy1(Ex,Ey);
	//=================DRAW IN THE LEVEL 1 Enemy 2 ============
		enemy2(Ex2,Ey2);
	//=================DRAW IN THE LEVEL 1 Enemy 3 ============
		enemy3(Ex3,Ey3);
	//=================DRAW IN THE LEVEL 1 Bullet  ============
		drawBullet();
	//=================DRAW IN THE LEVEL 1 Bullet1  ============
		drawBullet1();
	
	//================================================
		ctx.fillStyle = "black";
		ctx.font = "30px Helvetica";
	//================= SWITCHING STATES =======================
		if (doorHit && gamestate == 1)
		{
			ctx.fillText ("You Escaped!",50,40);
			gamestate = 2;
			Ex = 16,Ey=6;
			Ex2=16,Ey2=3;
			Ex3=3, Ey3=13;
			Bx=15,By=6;
			Bx1=15, By1=3;
			doorHit = false;
			//gridArray = gridArray2;
		}
		else if (PlayerHitted || HittedEnemy)
		{
			//ctx.fillText ("You Died!",50,40);
			gamestate = 3;
		}
		else if (50 in keysDown)
		{
			gamestate = 2;
			Ex = 16,Ey=6;
			Ex2=16,Ey2=3;
			Ex3=3, Ey3=13;
			Bx=15,By=6;
			Bx1=15, By1=3;
		}
	}
	
//======================== STATE 2 LEVEL 2=======================

	if(gamestate == 2)
	{
		drawGrid(gridArray2);
	//=================DRAW IN THE LEVEL 2 Player  ============
	//If you change the values inside those brackets they gonna reset those values to that number EVERY FRAME!!!!
		player1(x,y);                    
	//=================DRAW IN THE LEVEL 2 Enemy 1 ============
		enemy1(Ex,Ey);                   
	//=================DRAW IN THE LEVEL 2 Enemy 2 ============
		enemy2(Ex2,Ey2);                 
	//=================DRAW IN THE LEVEL 2 Enemy 3 ============
		enemy3(Ex3,Ey3);                 
	//=================DRAW IN THE LEVEL 2 Bullet  ============
		drawBullet();                    
	//=================DRAW IN THE LEVEL 2 Bullet1  ============
		drawBullet1();
		 
		if (PlayerHitted || HittedEnemy)
		{
			//ctx.fillText ("You Died!",50,40);
			gamestate = 3;
		}	
		if (doorHit2)
		{
			gamestate = 4;
		}	
	}
	
//======================== STATE 3 GAME OVER=======================
	if(gamestate == 3)
	{
		ctx.fillText ("You Died!",300,500);
		ctx.fillText ("Press START for RETRY.",300,550);
		if(13 in keysDown)
		{
			gamestate = 1;
			drawPlayer(x=1,y=1);
		}
//============= This is for reset everything to his original place!
	x=1 , y=1 ; // player start position
	Ex= 7, Ey= 7; //Enemy 1 start position
	Ex2= 10, Ey2= 9;
	Ex3= 1, Ey3= 14;
	Bx= 9, By = 9;
	Bx1= 2, By1 = 14;
	doorHit= false; // Player has NOT escaped
	PlayerHitted= false; //Player hasn't been hitted
	HittedEnemy= false;  //Player didn't touch the enemy
	trigger = 1;
	Bullettrigger = 1;
	Bullettrigger1 = 1;
	
	}
	if(gamestate == 4)
	{
		ctx.fillText ("Press START for Re-start the game",200,200);
		ctx.fillText ("Congratulations!!!One day we gonna be back for beat them,BUT",000,300);
		ctx.fillText ("for now enjoy your freedom in the BLUE PLANET!!!",100,350);
		if(13 in keysDown)
		{
			x=1 , y=1 ;
			gamestate = 0;
			
			
		}
	}
//===== Cause we put the updates at the bottom we have to put everything that impling text here ======
	
}

//================ BOOLS ===============
function  checkHit()
{
	if(gridArray[x][y] == 2)
	{
		//player has arrived at the door
		doorHit = true;
	}
	else
	{
		doorHit = false;
	}

}
function  checkHit2()
{
	if(gridArray2[x][y] == 2)
	{
		//player has arrived at the door
		doorHit2 = true;
	}
	else
	{
		doorHit2 = false;
	}

}
//=====================Collision Bullet VS Player=============================
function CheckCollision()
{
	if(x == Bx && y == By ||x == Bx1 && y == By1 && gamestate == 1)
	{
		PlayerHitted = true;
	}
	else if(x == Bx && y == By ||x == Bx1 && y == By1 && gamestate == 2)
	{
		PlayerHitted = true;
	}
	else
	{
		PlayerHitted = false;
	} 
}
//=====================Collision Enemies VS Player=============================
function CheckEnemCollision()
{
	if(x == Ex && y == Ey ||x == Ex2 && y == Ey2 ||x == Ex3 && y == Ey3 && gamestate == 1)
	{
		HittedEnemy = true;
	}
	else if(x == Ex && y == Ey ||x == Ex2 && y == Ey2 ||x == Ex3 && y == Ey3 && gamestate == 2)
	{
		HittedEnemy = true;
	}
	else
	{
		HittedEnemy = false;
	} 
}
//========================== PATROLLING TRIGGERS!!! =================
function EnemyPatrol()
{
	//Ex,EY= 7,7
	//start
	
	if(trigger == 1 && gamestate == 1)
	{
		Ex += 1;
	}
	else if(trigger == 2 && gamestate == 1)
	{
		Ey += 1;
	}
	else if(trigger ==3 && gamestate == 1)
	{
		Ex -= 1;
	}
	else if(trigger ==4 && gamestate == 1)
	{
		Ey -=1;
	}
//========================== PATROLLING TRIGGERS LV 2 !!! =================
	//Ex3=3;Ey3=13;
	//start
	if(trigger == 5 && gamestate == 2)
	{
		Ex3 += 1;
	}
	else if(trigger == 6 && gamestate == 2)
	{
		Ey3 += 1;
	}
	else if(trigger ==7 && gamestate == 2)
	{
		Ex3 -= 1;
	}
	else if(trigger ==8 && gamestate == 2)
	{
		Ey3 -=1;
	}
	
}
//========================== SHOOTING TRIGGERS!!! ===================
function EnemyShooting()
{
	if(Bullettrigger == 1 && gamestate == 1)
	{
		Bx -=1;
	}
	else if(Bullettrigger == 2 && gamestate == 1)
	{
		Bx = 9;
	}

//===== Bullet 1
	if(Bullettrigger1 == 1 && gamestate == 1)
	{
		Bx1 +=1;
	}
	else if(Bullettrigger1 == 2 && gamestate == 1 )
	{
		Bx1 = 2;
	}
//===== Bullet LV2 
	if(BullettriggerLV2 == 1 && gamestate == 2)
	{
		Bx -=1;
	}
	else if(BullettriggerLV2 == 2 && gamestate == 2)
	{
		Bx = 15;
	}
//==== Bullet 1 LV2
	if(Bullettrigger1LV2 == 1 && gamestate == 2)
	{
		Bx1 -=1;
	}
	else if(Bullettrigger1LV2 == 2 && gamestate == 2 )
	{
		Bx1 = 15;
	}
}

//=====================================
function updateStuff()
{
//==========================Collision with LEVEL 1=============
	if (37 in keysDown && gridArray [x-1][y] != 1 && gamestate == 1)
	{
		x -= 1;
	}
	if (39 in keysDown && gridArray [x+1][y] !=1 && gamestate == 1)
	{
		x += 1;
	}
	if (38 in keysDown && gridArray [x][y-1] !=1 && gamestate == 1)
	{
		y-= 1;
	}
	if (40 in keysDown && gridArray [x][y+1] !=1 && gamestate == 1)
	{
		y += 1;
	}
	//==========================Collision with LEVEL 2=============
	if (37 in keysDown && gridArray2 [x-1][y] != 1 && gamestate == 2)
	{
		x -= 1;
	}
	if (39 in keysDown && gridArray2 [x+1][y] !=1 && gamestate == 2)
	{
		x += 1;
	}
	if (38 in keysDown && gridArray2 [x][y-1] !=1 && gamestate == 2)
	{
		y-= 1;
	}
	if (40 in keysDown && gridArray2 [x][y+1] !=1 && gamestate == 2)
	{
		y += 1;
	}
//===================== Enemies` movement ============
	if(Ex == 7 && Ey == 7 && gamestate == 1)
	{
		trigger = 1;
	}
	if(Ex == 15 && Ey == 7 && gamestate == 1)
	{
		trigger =2;
	}
	if(Ex == 15 && Ey == 15 && gamestate == 1)
	{
		trigger = 3;
	}
	if(Ex == 7 && Ey == 15 && gamestate == 1)
	{
		trigger = 4;
	}
//===================== Enemies` movement LV2 ============
	//Ex3=2;Ey3=14;
	//start
    if(Ex3 == 3 && Ey3 == 13 && gamestate == 2)
	{
		trigger = 5;
	}
	if(Ex3 == 16 && Ey3 == 13 && gamestate == 2)
	{
		trigger = 6;
	}
	if(Ex3 == 16 && Ey3 == 16 && gamestate == 2)
	{
		trigger = 7;
	}
	if(Ex3 == 3 && Ey3 == 16 && gamestate == 2)
	{
		trigger = 8;
	}

//===================== BULLET SHOOTING LEVEL 1 ==============================
	if (Bx == 9 && By ==9 && gamestate == 1)
	{
		Bullettrigger = 1;
	}
	if (Bx == 1 && By == 9 && gamestate == 1)
	{
		Bullettrigger = 2;
	}

//===================== BULLET SHOOTING LEVEL 1 ==============================
	if(Bx1 == 2 && By1 == 14 && gamestate == 1)
	{
		Bullettrigger1 = 1;
	}
	if(Bx1 == 9 && By1 == 14 && gamestate == 1)
	{
		Bullettrigger1 = 2;
	}
//===================== BULLET SHOOTING LEVEL 2 ==============================Bx = 15 ;By =   6;
	if (Bx == 15 && By ==6 && gamestate == 2)
	{
		BullettriggerLV2 = 1;
	}
	if (Bx == 6 && By == 6 && gamestate == 2)
	{
		BullettriggerLV2 = 2;
	}
//===================== BULLET SHOOTING LEVEL 2 ==============================
	if(Bx1 == 15 && By1 == 3 && gamestate == 2)
	{
		Bullettrigger1LV2 = 1;
	}
	if(Bx1 == 1 && By1 == 3 && gamestate == 2)
	{
		Bullettrigger1LV2 = 2;
	}

	EnemyShooting();
	EnemyPatrol();
	
//==================================================
	CheckEnemCollision();
	checkHit();
	checkHit2();
	CheckCollision();
//================== GAME STATES ===================
/*	switch(state)
	{
		case 0:
		ctx.fillText ("Welcome!",50,40);
		ctx.fillText ("->Press START<-",50,60);
		if(13 in KeysDown)
		{
			state = 1;
		}
		case 1:
		function GameLoop()
		
	}*/
	console.log(trigger);

}


// this makes everything happen over time 
function GameLoop()
{
	clear(); 
	updateStuff();
	drawStuff();
	setTimeout(GameLoop, time);
}

GameLoop();