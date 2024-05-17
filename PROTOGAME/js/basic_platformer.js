//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;



	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	//canvas.addEventListener("mousemove", track);
	//canvas.addEventListener("click", startGame);


	
	//var game = animate();


	player = new GameObject({x:100, y:canvas.height/2-100});
		player.width = 50;
		player.height = 50;


	var playbutton = new GameObject({x:canvas.width/2, y:canvas.height/2})
		playbutton.width = 200;
		playbutton.height = 150;
		playbutton.color = "black";


	var insbutton = new GameObject({x:canvas.width/2, y:canvas.height/2+150})
		insbutton.width = 350;
		insbutton.height = 150;
		insbutton.color = "black";
	
	var backbutton = new GameObject({x:150, y:700})
		backbutton.width = 200;
		backbutton.height = 150;
		backbutton.color = "black";


		var amount = 25;
		var particles = [];
		var colors = ["white", "#88ff88"];
		
		
		for(var i = 0; i < amount; i++)
		{
			particles[i] = new GameObject({width:10, height:10});
			
			var randomColor = Math.round(Math.random());
			particles[i].color = colors[randomColor]
		
			particles[i].x = Math.random() * canvas.width;
			particles[i].y = Math.random() * canvas.height;
			particles[i].vy = Math.random() * 10 + 5;
		}

		

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
	var state = menu;

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

		if (player.y >= 801)
			{
				state = end;
			}
	
	
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
			state = win;
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
		
	context.save();
	context.fillStyle = "black";
	context.fillRect (0, 0, 1000, 800);
	context.restore();

	for(var p = 0; p < particles.length; p++)
		{	
			particles[p].x += particles[p].vx;
			particles[p].y += particles[p].vy;
				
			
			if (particles[p].y > canvas.height)
			{
				particles[p].y = 10;
				particles[p].x += particles[p].vx;
				particles[p].y += particles[p].vy;
			}
	
			particles[p].drawRect();
	
	
			
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
	context.fillRect (0, 0, 1000, 800);
	context.restore();

	for(var p = 0; p < particles.length; p++)
		{	
			particles[p].x += particles[p].vx;
			particles[p].y += particles[p].vy;
				
			
			if (particles[p].y > canvas.height)
			{
				particles[p].y = 10;
				particles[p].x += particles[p].vx;
				particles[p].y += particles[p].vy;
			}
	
			particles[p].drawRect();
	
	
			
		}


	context.save();	
	context.font = "bold 58px Arial"
	context.textAlign = "center";
	context.fillStyle = "white";
	context.fillText("You LOSE!", canvas.width/2, canvas.height/2+78/4)
	context.restore();



}

function win()
{

	
	context.save();
	context.fillStyle = "black";
	context.fillRect (0, 0, 1000, 800);
	context.restore();

	for(var p = 0; p < particles.length; p++)
		{	
			particles[p].x += particles[p].vx;
			particles[p].y += particles[p].vy;
				
			
			if (particles[p].y > canvas.height)
			{
				particles[p].y = 10;
				particles[p].x += particles[p].vx;
				particles[p].y += particles[p].vy;
			}
	
			particles[p].drawRect();
	
	
			
		}


	context.save();	
	context.font = "bold 58px Arial"
	context.textAlign = "center";
	context.fillStyle = "white";
	context.fillText("You WIN!", canvas.width/2, canvas.height/2+78/4)
	context.restore();



}

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	
	state();

	
}



function menu() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	

	context.save();
	context.fillStyle = "black";
	context.fillRect (0, 0, 1000, 800);
	context.restore();

	for(var p = 0; p < particles.length; p++)
		{	
			particles[p].x += particles[p].vx;
			particles[p].y += particles[p].vy;
				
			
			if (particles[p].y > canvas.height)
			{
				particles[p].y = 10;
				particles[p].x += particles[p].vx;
				particles[p].y += particles[p].vy;
			}
	
			particles[p].drawRect();
	
	
			
		}

	playbutton.drawRect();
	insbutton.drawRect();



	context.save();
	context.fillStyle = "black";
	context.fillRect (canvas.width/2-95,canvas.height/2/2-75, 200, 150);
	context.font = "bold 58px Arial"
	context.textAlign = "center";
	context.fillStyle = "white";
	context.fillText("Protogame", canvas.width/2,canvas.height/2/2);
	context.fillText("Play", canvas.width/2,canvas.height/2);
	context.fillText("Instructions", canvas.width/2, canvas.height/2+150);
	context.restore();


	
	




	if(playbutton.hitTestPoint(mouse))
		{
		   if (mouse.pressed)
			{
				startGame();
			}
			
			
		}


		
	if(insbutton.hitTestPoint(mouse))
		{
		   if (mouse.pressed)
			{
				startIns();
			}
			
			
		}


	
}




function ins()
{

	context.save();
	context.fillStyle = "black";
	context.fillRect (0, 0, 1000, 800);
	context.restore();

	for(var p = 0; p < particles.length; p++)
		{	
			particles[p].x += particles[p].vx;
			particles[p].y += particles[p].vy;
				
			
			if (particles[p].y > canvas.height)
			{
				particles[p].y = 10;
				particles[p].x += particles[p].vx;
				particles[p].y += particles[p].vy;
			}
	
			particles[p].drawRect();
	
	
			
		}

		backbutton.drawRect();


	context.save();	
	context.font = "bold 58px Arial"
	context.textAlign = "center";
	context.fillStyle = "white";
	context.fillText("WASD Keys for movement", canvas.width/2, canvas.height/2+78/4)
	context.fillText("Get the goal", canvas.width/2, canvas.height/2/4)
	context.fillText("Back", 150, 700)
	context.restore();






	if(backbutton.hitTestPoint(mouse))
		{
		   if (mouse.pressed)
			{
				state = menu;
			}
			
			
		}





}

 function startGame()
 	{

		state = game;
	}

	function startIns()
	{

	   state = ins;
   }
  

