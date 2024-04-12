//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var player2;
var ball;


var p1Wins = 0;
var p2Wins = 0;

var img;




	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	
	//Instantiate Player 1
	player = new GameObject();
	player.width = 30
	player.height = 150
	player.x = player.width/2;
	player.y = player.height/2;

	//Instantiate Player 2
	player2 = new GameObject();
	player2.width = 30
	player2.height = 150
	player2.x = canvas.width-player2.width/2;
	player2.y = canvas.height-player2.height/2;
	player2.color = "#00FF00";



	//Initiate the Ball
	ball = new GameObject();
	ball.width = 50
	ball.height = 50
	ball.vx = -10;
	ball.vy = 0;
	ball.color = "#1100ff";



	var img=document.getElementById("ric");
	



	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	// ----------------------Start of Player 1 Code--------------------------------
	
	//Move the Player to the right
	if(s)
	{
		//console.log("Moving Right");
		player.y += 20;
	}
	if(w)
	{
		//console.log("Moving Left");
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

// ----------------------End of Player 1 Code--------------------------------


// ----------------------Start of Player 2 Code--------------------------------
	
	//Move the Player to the right
	if(l)
	{
		//console.log("Moving Right");
		player2.y += 20;
	}
	if(p)
	{
		//console.log("Moving Left");
		player2.y += -20;
	}
	

//--------------Bounce of Botom----------------------
if(player2.y > canvas.height - player2.height/2)
{

	player2.y=canvas.height - player2.height/2;
	
	
	
}

//--------------Bounce of Top----------------------
if(player2.y < 0 + player2.height/2)
{	

	player2.y=player2.height/2;
	
	
	
}

// ----------------------End of Player 2 Code--------------------------------


// ----------------------Start of Ball Code--------------------------------

//----Movement Using the ball's move() function----
ball.move();
//---------------------------------------------------

//--------------Bounce of Right----------------------
if(ball.x > canvas.width - ball.width/2)
{

	ball.y=canvas.height/2;
	ball.x=canvas.width/2;
	p1Wins = p1Wins + 1;
	
	//ball.x=canvas.width;
	//ball.x-=ball.width/2 //Some number of pixels
	//ball.vx = -ball.vx 
	
}
///--------------Bounce of Left----------------------
if(ball.x < 0 - ball.width/2)
{	

	ball.y=canvas.height/2;
	ball.x=canvas.width/2;
	p2Wins = p2Wins + 1;
	
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
	


	if(ball.hitTestObject(player2))
	{	
		ball.vx = -ball.vx 
		ball.x = player2.x - ball.width/2  - ball.width/4;


		//top
		if(ball.y < player2.y - player2.height/6)
		{
			
			ball.vy = -10
		}

		

		//bottom
		if(ball.y > player2.y - player2.height/6)
		{
			
			ball.vy = +10
		}
	}
	
	
	
	// ----------------------End of Collision Code--------------------------------	

	//Update the Screen


//-------Net Code------------------------
	context.save();
	context.strokeStyle = "#FFFF00";
	context.beginPath();
	context.moveTo(512,0);
	context.lineTo(canvas.width/2, canvas.height);
	context.closePath();
	context.lineWidth = 10;
	context.stroke();
	context.restore(); 
	
//-------Net Code------------------------



//-------Score Code------------------------
	context.font = "20px Arial ";
	context.fillText("P1: " + p1Wins + "||" + "P2: " + p2Wins, 512, 20)
//-------Score Code------------------------




//-------Objects Code------------------------
	player.drawRect();
	player2.drawRect();
	ball.drawCircle();
	context.drawImage(img, ball.x-30, ball.y-30, ball.width+10, ball.height+10);
//-------Objects Code------------------------
	
}


