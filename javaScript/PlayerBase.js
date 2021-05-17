function PlayerBase()
{
    this.health = 100;
    this.active = true;
    this.width = 90;
    this.height = 70;
    this.x = gameAreaWidth/2-45;
    this.y = gameAreaHeight-70;

    this.draw = function(){
        if(this.health > 0){
            ctx.fillStyle = 'Blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
        }else{
            this.active = false;
        }
    }
    this.die = function() {
        this.health -= 100;
    }
}