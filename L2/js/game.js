//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var ball;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new GameObject();
	player.width = 30
	player.height = 150
	player.x = player.width/2;
	player.y = player.height/2;




	//Initiate the Ball
	ball = new GameObject();
	ball.width = 50
	ball.height = 50
	ball.vx = 10;
	ball.vy = 10;
	ball.color = "#1100ff";



	



	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	// ----------------------Start of Player Code--------------------------------
	
	//Move the Player to the right
	if(s)
	{
		console.log("Moving Right");
		player.y += 20;
	}
	if(w)
	{
		console.log("Moving Left");
		player.y += -20;
	}
	

//--------------Bounce of Botom----------------------
if(player.y > canvas.height - player.height/2)
{

	player.y=canvas.height - player.height/2;
	
	
	
}

//--------------Bounce of Top----------------------
if(player.y < 0 + player.height/2)
{	

	player.y=player.height/2;
	
	
	
}
// ----------------------End of Player Code--------------------------------



// ----------------------Start of Ball Code--------------------------------

//----Movement Using the ball's move() function----
ball.move();
//---------------------------------------------------

//--------------Bounce of Right----------------------
if(ball.x > canvas.width - ball.width/2)
{

	ball.x=canvas.width;
	ball.x-=ball.width/2 //Some number of pixels
	ball.vx = -ball.vx 
	
}
///--------------Bounce of Left----------------------
if(ball.x < 0 + ball.width/2)
{	

	ball.x=ball.width/2;
	
	ball.vx = -ball.vx 
	
}

//--------------Bounce of Botom----------------------
if(ball.y > canvas.height - ball.width/2)
{

	ball.y=canvas.height;
	ball.y-=ball.width/2//Some number of pixels
	ball.vy = -ball.vy 
	
}

//--------------Bounce of Top----------------------
if(ball.y < 0 + ball.width/2)
{	

	ball.y=ball.width/2;
	
	ball.vy = -ball.vy 
	
}

// ----------------------End of Ball Code--------------------------------
//Update the Screen


	//Check Collisions
	
	//Demonstrates Accuracy of Bounding Box Collision
	if(ball.hitTestObject(player))
	{
		//change color
		ball.color = "yellow";
	}
	else
	{
		ball.color = "#00ff00";
	}
	
	//Shows Bounding Boxes
	if(ball.hitTestObject(player))
	{
		//draw bounding boxes
		context.strokeRect(ball.x- ball.width/2, ball.y - ball.height/2, ball.width, ball.height)
		context.strokeRect(player.x- player.width/2, player.y - player.height/2, player.width, player.height)
	}
	
	//Demonstrates how often collisions take place
	if(ball.hitTestObject(player))
	{
		console.log("colliding");
	}
	
	//Impede movement
	if(ball.hitTestObject(player))
	{
		player.x = prevX;
		console.log("colliding");
	}
	else
	{
		prevX = player.x;
	}
	

	//Update the Screen
	player.drawRect();
	ball.drawCircle();
}

