//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
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
	player.width = 50
	player.height = 50
	player.x = canvas.width;
	player.y = canvas.height-50;
	player.color = "#ffff00"
	player.force = 1;
	

	//Initiate the balls
	
	var amount = 5;
	var ball = [];
	var colors = ["#88ff88"];
	
	
	for(var i = 0; i < amount; i++)
	{
		ball[i] = new GameObject({width:10, height:10});
		
		ball[i].color = "#FF0000"
	
		ball[i].x = Math.random() * canvas.width;
		ball[i].y = Math.random() * canvas.height;
		ball[i].vy = Math.random() * 10 + 5;
	}
	
	
	//Initiate the squares
	
	var amount = 5;
	var square = [];
	var colors = ["#88ff88"];
	
	
	for(var i = 0; i < amount; i++)
	{
		square[i] = new GameObject({width:10, height:10});
		
		square[i].color = "#00FF00"
	
		square[i].x = Math.random() * canvas.width;
		square[i].y = Math.random() * canvas.height;
		square[i].vy = Math.random() * 10 + 5;
	}




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



// ----------------------Start of Collision Code--------------------------------	

for(var p = 0; p < ball.length; p++)
	{	
		ball[p].x += ball[p].vx;
		ball[p].y += ball[p].vy;
			
		
		
		if (ball[p].y > canvas.height)
		{
			ball[p].y = 10;
			ball[p].x += ball[p].vx;
			ball[p].y += ball[p].vy;
		}

		ball[p].drawCircle();

		if(ball[p].hitTestObject(player))
		{
			ball[p].x = Math.random() * canvas.width;
			ball[p].y = Math.random() * canvas.height;
			player.color = "#FF0000";
			
			score = score - 1;

		}




			
		
	}





	for(var p = 0; p < ball.length; p++)
		{	
			square[p].x += square[p].vx;
			square[p].y += square[p].vy;
				
			
			
			if (square[p].y > canvas.height)
			{
				square[p].y = 10;
				square[p].x += square[p].vx;
				square[p].y += square[p].vy;
			}
	
			square[p].drawRect();
	
			if(square[p].hitTestObject(player))
			{
				square[p].x = Math.random() * canvas.width;
				square[p].y = Math.random() * canvas.height;
				player.color = "#00FF00";
				score = score + 1;
				setTimeout(() => {  player.color = "#ffff00"; }, 1000);
			
	
			}
	
				
			
		}
	
	
	// ----------------------End of Collision Code--------------------------------	



	//Update the Screen





//-------Objects Code------------------------
player.drawRect();

//-------Objects Code------------------------



//-------Score Code------------------------
	context.font = "16px Arial ";
	context.fillText('Score: ' + score, 80, 25	)
//-------Score Code------------------------



	
}


