// JavaScript Document

var canvas;
var context;
var timer;
var interval = 1000/60;
var player;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	player = new Player();
	
	//------Declare the Player's speed on the x and y axis------
	player.vx = 10;
	player.vy = 10;
	//----------------------------------------------------
	
	timer = setInterval(animate, interval);


function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//----Movement Using the Player's move() function----
	player.move();
	//---------------------------------------------------
	
	//--------------Bounce of Right----------------------
	if(player.x > canvas.width - player.width/2)
	{

		player.x=canvas.width;
		player.x-=100 //Some number of pixels
		player.vx = -player.vx - 10;
		
	}
	///--------------Bounce of Left----------------------
	if(player.x < 0 + player.width/2)
	{	

		player.x=player.width/2;
		
		player.vx = -player.vx + 10;
		
	}

	//--------------Bounce of Botom----------------------
	if(player.y > canvas.height - player.width/2)
	{

		player.y=canvas.height;
		player.y-=100 //Some number of pixels
		player.vy = -player.vy - 20;
		
	}

//--------------Bounce of Top----------------------
	if(player.y < 0 + player.width/2)
	{	

		player.y=player.width/2;
		
		player.vy = -player.vy + 20;
		
	}

	player.draw();
}
