//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var ball;
var score = 0;



//---------------Set Friction and Gravity-----------------
var frictionX = .98;	
var frictionY = .97;
var gravity = 1;
//--------------------------------------------------------


	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	
	//Instantiate Player 1
	player = new GameObject();
	player.width = 250
	player.height = 40
	player.x = canvas.width;
	player.y = canvas.height-50;
	player.color = "#00ffff"
	player.force = 1;
	

	//Initiate the Ball
	ball = new GameObject();
	ball.width = 40
	ball.height = 40
	ball.color = "#ff00ff";
	ball.force = 5;




	
	



	//Set the Animation Timer
	timer = setInterval(animate, interval);




	


function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	// ----------------------Start of Player 1 Code--------------------------------
	
	//Move the Player to the right
	if(d)
	{	
		player.vx += player.ax * player.force;
	}
	if(a)
	{
		player.vx += player.ax * -player.force;
	}
	
	
	
	player.vx *= frictionX;
	

	
	player.x += player.vx;
	

//--------------Bounce of Right----------------------
if(player.x > canvas.width - player.width/2)
{

	player.x=canvas.width - player.width/2;
	
	
	
}

//--------------Bounce of Left----------------------
if(player.x < 0 + player.width/2)
{	

	player.x=player.width/2;
	
	
	
	
}

// ----------------------End of Player 1 Code--------------------------------


// ----------------------Start of Ball Code--------------------------------

//----Movement Using the ball's move() function----
ball.vy *= frictionY;
ball.vx *= frictionX;

ball.vy += gravity;
		
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
	score = 0;
	
}
///--------------Bounce of Left----------------------
if(ball.x < 0 - ball.width/2)
{	

	//ball.y=canvas.height/2;
	//ball.x=canvas.width/2;
	
	
	ball.x=ball.width/2;
	ball.vx = -ball.vx 
	score = 0;
}

//--------------Bounce of Botom----------------------
if(ball.y > canvas.height - ball.width/2)
{
	//ball.y=canvas.height/2;
	//ball.x=canvas.width/2;

	ball.y=canvas.height;
	ball.y-=ball.width/2//Some number of pixels
	ball.vy = -ball.vy 
	score = 0;
}

//--------------Bounce of Top----------------------
if(ball.y < 0 + ball.width/2)
{	

	//ball.y=canvas.height/2;
	//ball.x=canvas.width/2;

	ball.y=ball.width/2;
	
	ball.vy = -ball.vy 
	score = 0;
}

// ----------------------End of Ball Code--------------------------------


// ----------------------Start of Collision Code--------------------------------	
	if(ball.hitTestObject(player))
	{	
		score ++
		ball.vy = -35
		
		ball.y = player.y - ball.height/2 - ball.height/4;


		//left
		if(ball.x > player.x - player.width/6)
		{
			ball.vx = ball.force
		}

		//right
		if(ball.y < player.x + player.width/6)
		{
			ball.vx = -ball.force
		}

		//left
		if(ball.x > player.x - player.width/3)
		{
			ball.vx = ball.force *5
		}

		//right
		if(ball.y < player.x + player.width/3)
		{
			ball.vx = -ball.force *5
		}

	}
	
	
	// ----------------------End of Collision Code--------------------------------	

	//Update the Screen



	//-------Net Code------------------------
	context.save();
	context.strokeStyle = "#000000";
	context.beginPath();
	context.moveTo(player.x, player.y);
	context.lineTo(ball.x, ball.y);
	context.closePath();
	context.lineWidth = 1;
	context.stroke();
	context.restore(); 
	
//-------Net Code------------------------

//-------Objects Code------------------------
player.drawRect();
ball.drawCircle();

//-------Objects Code------------------------



//-------Score Code------------------------
	context.font = "16px Arial ";
	context.fillText('Score: ' + score, 80, 25	)
//-------Score Code------------------------



	
}


