const canvasElem = document.getElementById('canvas');
const ctx = canvasElem.getContext('2d');

var circles = new Array();

function Circle(x, y)
{
	this.x = x;
	this.y = y;
    this.r = 0;
    this.growing = true;
	
	this.show = function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
		ctx.stroke();
	}
    
    this.grow = function()
    {
        this.r++;
    }
}

function distance(c1, c2)
{
    return Math.sqrt(Math.pow(c1.x - c2.x,2) + Math.pow(c1.y - c2.y,2));
}

function setup()
{
    canvasElem.width = 800;
    canvasElem.height = 500;
    canvasElem.style.backgroundColor = "black";
}

function run()
{
    x = Math.random() * canvasElem.width;
    y = Math.random() * canvasElem.height;
    
    c = new Circle(x,y);
    circles.push(c);
    
    for(i=0 ; i<circles.length ; i++)
    {
        
        if(circles[i].growing == true)
        { 
            // outside canvas
            if(circles[i].x-circles[i].r < 0 || circles[i].x+circles[i].r > canvasElem.width || circles[i].y+circles[i].r > canvasElem.height || circles[i].y-circles[i].r < 0)
                circles[i].growing = false;
            // check if not overlapping another
            for(j=0 ; j<circles.length ; j++)
            {
                if(i != j)
                {
                    if(circles[i].r + circles[j].r + 2 > distance(circles[i], circles[j]))
                    {
                        circles[i].growing = false;
                    }
                }
            }
            
            // show and grow each circle
            circles[i].show();
            circles[i].grow();
        }
    }
}

setup();
setInterval(run,10);