function BrickBlock(x, y, width, height)
{
    this.health = 100;
    this.active = true;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.draw = function(){
        if(this.health > 0){
        //    canvas = document.getElementById("myCanvas");
         //   ctx = canvas.getContext("2d");
            ctx.fillStyle = 'Red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
        }else{
            this.active = false;
        }
    }
    this.hit = function() {
        this.health -= 25;
    }
}