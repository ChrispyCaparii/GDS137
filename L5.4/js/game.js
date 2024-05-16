	//----------------------------------------------------------Instructions------------------------------------------------
	//---------------------In this assignment you will draw a lazy version of the "matrix"----------------------------------
	//---------------------You will recalculate some particles positions and colors when they move off screen---------------
	//---------------------Follow the commented instructions below to complete this assignment------------------------------

var canvas;
var context;
var timer;
var interval;
var player;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	canvas.style.backgroundColor="black";
	
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
	
	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{	
	context.clearRect(0,0,canvas.width, canvas.height);	
	
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
	

}


