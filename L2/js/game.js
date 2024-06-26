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
	
	//Instantiate Player 1
	player = new GameObject();
	player.width = 30
	player.height = 150
	player.x = player.width/2;
	player.y = player.height/2;





	//Initiate the Ball
	ball = new GameObject();
	ball.width = 50
	ball.height = 50
	ball.vx = -10;
	ball.vy = 0;
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

	//ball.y=canvas.height/2;
	//ball.x=canvas.width/2;
	
	ball.x=canvas.width;
	ball.x-=ball.width/2 //Some number of pixels
	ball.vx = -ball.vx 
	
}
///--------------Bounce of Left----------------------
if(ball.x < 0 - ball.width/2)
{	

	ball.y=canvas.height/2;
	ball.x=canvas.width/2;
	
	//ball.x=ball.width/2;
	//ball.vx = -ball.vx 
	
}

//--------------Bounce of Botom----------------------
if(ball.y > canvas.height - ball.width/2)
{
	//ball.y=canvas.height/2;
	//ball.x=canvas.width/2;

	ball.y=canvas.height;
	ball.y-=ball.width/2//Some number of pixels
	ball.vy = -ball.vy 
	
}

//--------------Bounce of Top----------------------
if(ball.y < 0 + ball.width/2)
{	

	//ball.y=canvas.height/2;
	//ball.x=canvas.width/2;

	ball.y=ball.width/2;
	
	ball.vy = -ball.vy 
	
}

// ----------------------End of Ball Code--------------------------------


// ----------------------Start of Collision Code--------------------------------	
	if(ball.hitTestObject(player))
	{	
		ball.vx = -ball.vx 
		ball.x = player.x + ball.width/2  + ball.width/4;


		//top
		if(ball.y < player.y - player.height/6)
		{
			
			ball.vy = -10
		}

		

		//bottom
		if(ball.y > player.y - player.height/6)
		{
			
			ball.vy = +10
		}
	}
	
	
	
	// ----------------------End of Collision Code--------------------------------	

	//Update the Screen
	player.drawRect();
	ball.drawCircle();
}


