const canvasElem = document.getElementById('canvas');
const ctx = canvasElem.getContext('2d');

function Circle(x, y)
{
	this.x = x;
	this.y = y;
    r = Math.random() * 50;
	
	this.show = function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, r, 0, 2*Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
		ctx.stroke();
	}
}

canvasElem.width = 800;
canvasElem.height = 500;
canvasElem.style.backgroundColor = "black";

for(i=0; i< 10 ; i++){
    var circle = new Circle(Math.random()*canvasElem.width, Math.random() * canvasElem.height);
    
    circle.show();
}