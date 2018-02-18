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