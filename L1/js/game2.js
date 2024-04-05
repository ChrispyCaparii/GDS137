// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	ball = new Player();
	
	//------Declare the ball's speed on the x and y axis------
	ball.vx = 10;
	ball.vy = 10;
	//----------------------------------------------------
	
	timer = setInterval(animate, interval);


function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//----Movement Using the ball's move() function----
	ball.move();
	//---------------------------------------------------
	
	//--------------Bounce of Right----------------------
	if(ball.x > canvas.width - ball.width/2)
	{

		ball.x=canvas.width;
		ball.x-=100 //Some number of pixels
		ball.vx = -ball.vx - 10;
		
	}
	///--------------Bounce of Left----------------------
	if(ball.x < 0 + ball.width/2)
	{	

		ball.x=ball.width/2;
		
		ball.vx = -ball.vx + 10;
		
	}

	//--------------Bounce of Botom----------------------
	if(ball.y > canvas.height - ball.width/2)
	{

		ball.y=canvas.height;
		ball.y-=100 //Some number of pixels
		ball.vy = -ball.vy - 20;
		
	}

//--------------Bounce of Top----------------------
	if(ball.y < 0 + ball.width/2)
	{	

		ball.y=ball.width/2;
		
		ball.vy = -ball.vy + 20;
		
	}

	ball.draw();
}
