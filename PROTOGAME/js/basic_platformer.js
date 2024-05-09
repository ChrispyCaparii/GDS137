//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;



	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	


	
	//var game = animate();


	player = new GameObject({x:100, y:canvas.height/2-100});
		player.width = 50;
		player.height = 50;

	var platform = [];	

	platform[0] = new GameObject();
		platform[0].width = 200;
		platform[0].x = platform[0].width/2;
		platform[0].y = canvas.height - platform[0].height/2;
		platform[0].color = "#66ff33";

	platform[1] = new GameObject();
		platform[1].width = 200;
		platform[1].x = platform[0].x + platform[0].width*2;
		platform[1].y = canvas.height - 100;
		platform[1].color = "#66ff33";


	platform[2] = new GameObject();
		platform[2].width = 400;
		platform[2].x = canvas.width/2 + canvas.width/4;
		platform[2].y = canvas.height/2 - canvas.height/6; 
		platform[2].color = "#66ff33";


	enemy = new GameObject();
		enemy.width = 50;
		enemy.height = 50;
		enemy.color = "#0000FF";
		enemy.x = platform[2].x;
		enemy.y = platform[2].y/2;
		enemy.vx = 2;

	portal1 = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#800080"});
		portal1.x = platform[1].x;
		portal1.y = platform[1].y-100;

	portal2 = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#800080"});
		portal2.x = canvas.width/2 + canvas.width/4;
		portal2.y = canvas.height/2 - canvas.height/4;

		
	goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);
var state = game;

function game()
{
	if(w && player.canJump && player.vy ==0)
		{
			player.canJump = false;
			player.vy += player.jumpHeight;
		}
	
		if(a)
		{
			player.vx += -player.ax * player.force;
		}
		if(d)
		{
			player.vx += player.ax * player.force;
		}
	
		player.vx *= fX;
		player.vy *= fY;
		
		player.vy += gravity;
		
		player.x += Math.round(player.vx);
		player.y += Math.round(player.vy);
	
	
		//enemy.vx *= fX;
		enemy.vy *= fY;
		
		enemy.vy += gravity;
		
		enemy.x += Math.round(enemy.vx);
		enemy.y += Math.round(enemy.vy);
	
		
		
		
		for(var i = 0; i < platform.length; i++)
	{
		while(platform[i].hitTestPoint(player.bottom()) && player.vy >=0)
		{
			player.y--;
			player.vy = 0;
			player.canJump = true;
		}
		while(platform[i].hitTestPoint(player.bottomleft()) && player.vy >=0)
		{
			player.y--;
			player.vy = 0;
			player.canJump = true;
		}
		while(platform[i].hitTestPoint(player.bottomright()) && player.vy >=0)
		{
			player.y--;
			player.vy = 0;
			player.canJump = true;
		}
		while(platform[i].hitTestPoint(player.left()) && player.vx <=0)
		{
			player.x++;
			player.vx = 0;
		}
		while(platform[i].hitTestPoint(player.right()) && player.vx >=0)
		{
			player.x--;
			player.vx = 0;
		}
		while(platform[i].hitTestPoint(player.top()) && player.vy <=0)
		{
			player.y++;
			player.vy = 0;
		}
		while(platform[i].hitTestPoint(enemy.bottom()) && enemy.vy >=0)
		{
			enemy.y--;
			enemy.vy = 0;
	
			if(enemy.x >= platform[i].x + platform[i].width/2 - 20)
			{
				enemy.vx = -2;
			}
				
	
			
			if(enemy.x <= platform[i].x - platform[i].width/2 + 20)
			{
				enemy.vx = 2;
			}
			
		}
	}
			
		if(player.hitTestObject(goal))
		{
			goal.y = 10000;
			context.textAlign = "center";
			context.drawText("You Win!!!", canvas.width/2, canvas.height/2);
		}
		
	
		if(player.hitTestObject(portal1))
		{
			player.x = portal2.x
			player.y = portal2.y
			
		}
	
	
		while(enemy.hitTestPoint(player.bottom()) && player.vy >=0)
		{
			player.y--;
			player.vy = 0;
			player.canJump = true;
			enemy.x = 10000;
		}
		while(enemy.hitTestPoint(player.left()) && player.vx <=0)
		{
			player.x++;
			player.vx = 0;
			player.x = 10000;
			state = end;
		}
		while(enemy.hitTestPoint(player.right()) && player.vx >=0)
		{
			player.x--;
			player.vx = 0;
			player.x = 10000;
			state = end;
		}
		
	
		
		
		platform[0].drawRect();
		platform[1].drawRect();
		platform[2].drawRect();
	
		//Show hit points
		player.drawRect();
		enemy.drawRect();
		goal.drawCircle();
		portal1.drawCircle();
		portal2.drawCircle();



}

function end()
{

	context.save();
		context.fillStyle = "black";
		context.font = "bold 58px Arial"
		context.textAlign = "center";
		context.fillRect(0, canvas.height/2-100,canvas.width, 200);
		context.fillStyle = "white";
		context.fillText("You Lose", canvas.width/2, canvas.height/2+78/4)
	context.restore();



}

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	
	state();

	
}

