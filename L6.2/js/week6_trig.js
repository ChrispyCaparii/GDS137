//--------------------Goal - To utilize distance and displacement formulas ----------------------------------------------------------------------
//--------------------Description - To make the pearl magnet to the player when it's less than 300 pixels away from the player-------------------
//--------------------Read the commented instructions below to complete this assignment----------------------------------------------------------
//--------------------Upload your completed file to the ict server and submit a link-------------------------------------------------------------

var canvas;
var context;
var timer;
var interval;
var player;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject();
	player.force = 1;
	
	follower = new GameObject({x:200, y:200, width:25, color:"cyan"});
	
	
	//friction
	var fX = .80;
	var fY = .80;
	
	var angle = 0;
	
	//gravity gets added to the vy
	var gravity = 0;

	interval = 1000/60;
	timer = setInterval(animate, interval);
	

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	/*-----------This function move the player-----------*/
	//w and s move forward and backward
	//a and d rotate the triangle
	angularMovement();
	
	//-------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------INSTRUCTIONS-------------------------------------------------------
	//-------------------------------------------------------------------------------------------------------------------------
	
	//--------Make the blue pearl move to the player when it's within 300 pixels of the player.------
	//--------If the pearl hits the player's x and y coordinates move it off screen.-----------------

	/*-----------These move the follower-----------------*/
	//Get the displacement of the follower from the player
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;

	//This is the Pythagorean Theorem and gets the hypoteneuse of a triangle.
	//This can be used to get the actual distance between two points.
	var dist = Math.sqrt(dx * dx + dy * dy);
		
	if (dist < 300)
	{
		follower.x += dx /25;
		follower.y += dy /25;

		//setTimeout(() => {  follower.x = 10000; }, 1000);
		

		
		


			

	}

	
	


	





	//--------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------END OF INSTRUCTIONS-------------------------------------------------
	//--------------------------------------------------------------------------------------------------------------------------
	
	player.drawTriangle();
	follower.drawCircle();
}

function angularMovement()
{
	if(w)
	{	
		//Convert Angle to Radians
		var radians = player.angle * Math.PI/180;
		
		//Calculate acceleration modifiers (lengtha and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * player.force;
		player.vy += player.ay * player.force;
	}
	
	if(s)
	{
		//Convert Angle to Radians
		var radians = player.angle * Math.PI/180;
		
		//Calculate acceleration modifiers (lengtha and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * -player.force;
		player.vy += player.ay * -player.force;
	}
	
	//Rotate Counter Clockwise
	if(a)
	{
		player.angle-=2;
	}
	//Rotate Clockwise
	if(d)
	{
		player.angle+=2;
	}

	//apply physics to velocity
	player.vx *= fX;
	player.vy *= fY;
	
	//apply gravity to velocity
	player.vy += gravity;
	
	//move player
	player.move();
}


function revolve()
{
	angle-=5;
	var radians = angle * Math.PI/180;
	
	follower.x = player.x + Math.cos(radians) * 200;
	follower.y = player.y + Math.sin(radians) * 200;
}
	
function magnet()
{
	//Get the displacement of the follower from the player
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	//Not using this in this function but...
	//This is the Pythagorean Theorem and gets the hypoteneuse of a triangle.
	//This can be used to get the actual distance between two points.
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	follower.x += dx /25;
	follower.y += dy /25;
}

function point()
{
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	follower.angle = radians * 180/Math.PI;
}

function follow()
{
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	follower.vx = Math.cos(radians)*follower.force;
	follower.vy = Math.sin(radians)*follower.force;

	follower.x += follower.vx * 2;
	follower.y += follower.vy * 2;
}

function orbit()
{
	var dx = player.x - follower.x;
	var dy = player.y - follower.y;
	
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	angle = radians * 180/Math.PI;
	
	follower.vx += Math.cos(radians)*follower.force;
	follower.vy += Math.sin(radians)*follower.force;
	
	follower.x += follower.vx * 2;
	follower.y += follower.vy * 2;

}

function sinWave()
{
	angle-=5;
	var radians = angle * Math.PI/180;
	follower.y = player.y + Math.sin(radians) * 200;
	follower.x += 2;
}

