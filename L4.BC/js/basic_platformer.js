//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:100, y:canvas.height/2-100});
		player.width = 50;
		player.height = 50;


	platform0 = new GameObject();
		platform0.width = 200;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";

	platform1 = new GameObject();
		platform1.width = 200;
		platform1.x = platform0.x + platform0.width*2;
		platform1.y = canvas.height - 100;
		platform1.color = "#66ff33";


	platform2 = new GameObject();
		platform2.width = 400;
		platform2.x = canvas.width/2 + canvas.width/4;
		platform2.y = canvas.height/2 - canvas.height/6; 
		platform2.color = "#66ff33";


	enemy = new GameObject();
		enemy.width = 50;
		enemy.height = 50;
		enemy.color = "#0000FF";
		enemy.x = platform2.x;
		enemy.y = platform2.y/2;
		enemy.vx = 2;

	portal1 = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#800080"});
		portal1.x = platform1.x;
		portal1.y = platform1.y-100;

	portal2 = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#800080"});
		portal2.x = canvas.width/2 + canvas.width/4;
		portal2.y = canvas.height/2 - canvas.height/4;

		
	goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

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

	
	

	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}
	
	
	//---------Objective: Treasure!!!!!!!---------------------------------------------------------------------------------------------------- 
	//---------Run this program first.
	//---------Get Creative. Find a new way to get your player from the platform to the pearl. 
	//---------You can do anything you would like except break the following rules:
	//---------RULE1: You cannot spawn your player on the pearl!
	//---------RULE2: You cannot change the innitial locations of platform0 or the goal! 




	while(platform1.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform1.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}




	while(platform2.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform2.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}



	while(platform2.hitTestPoint(enemy.bottom()) && enemy.vy >=0)
	{
		enemy.y--;
		enemy.vy = 0;

		if(enemy.x >= platform2.x + platform2.width/2 - 20)
		{
			enemy.vx = -2;
		}
			

		
		if(enemy.x <= platform2.x - platform2.width/2 + 20)
		{
			enemy.vx = 2;
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
	}
	while(enemy.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
		player.x = 10000;
	}
	

	
	
	platform0.drawRect();
	platform1.drawRect();
	platform2.drawRect();

	//Show hit points
	player.drawRect();
	enemy.drawRect();
	goal.drawCircle();
	portal1.drawCircle();
	portal2.drawCircle();
}

