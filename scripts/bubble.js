var circles = new Array();
var img = new Image();

const canvasElem = document.getElementById('canvas');
const canvasElemPhoto = document.getElementById('photo');
const ctx = canvasElem.getContext('2d');
const ctxPhoto = canvasElemPhoto.getContext('2d');

img.src = "data/tak.png";

var whiteArea = [];

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
        
        randColor = ((1<<24)*Math.random()|0);
        if(randColor < 200)
            randColor = 65535;        
        ctx.strokeStyle = "#"+randColor.toString(16);
        ctx.stroke();
	}
    
    this.grow = function()
    {
        if(this.r < 20)
        this.r++;
    }
}

function distance(c1, c2)
{
    return Math.sqrt(Math.pow(c1.x - c2.x,2) + Math.pow(c1.y - c2.y,2));
}

function searchArray(array, x, y)
{
    for(i=0 ; i<array.length ; i++)
    {
        if(array[i][0] == x && array[i][1] == y)
        {
            return true;
        }
    }
    
    return false;
}

function setup()
{
    // canvas sizes
    canvasElem.width = img.width;
    canvasElem.height = img.height;
    canvasElemPhoto.width = img.width;
    canvasElemPhoto.height = img.height;
    canvasElem.style.backgroundColor = "black";
    canvasElemPhoto.style.visibility = 'hidden';
    
    ctxPhoto.drawImage(img, 0, 0);
    
    // searching for white pixels and store their vector
    for(i=0 ; i<img.width-1 ; i++)
    {
        for(j=0 ; j<img.height-1 ; j++)
        {
            var pixel = ctxPhoto.getImageData(i,j,1,1);
            var data = pixel.data;
            
            if(data[0] > 1)
            {
                whiteArea.push([i,j]);
            }
        }
    }
    
    console.log(whiteArea.length);
}

function run()
{
    rand = Math.random() * whiteArea.length;
    rand = Math.floor(rand);
        
    x = whiteArea[rand][0];
    y = whiteArea[rand][1];
        
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
setInterval(run,1);
location.reload();
