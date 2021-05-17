function collisionCheck(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }

  function collisionOccurs() {
    bullets.forEach(function(bullet) {
      enemies.forEach(function(enemy) {
        if (collisionCheck(bullet, enemy)) {
          bullet.die();
          enemy.die();
          tank.score+=10;
          enemiesLeft++;
        }
      });
    });

    bullets.forEach(function(bullet) {
        brickBlocks.forEach(function(block) {
          if (collisionCheck(bullet, block)) {
            bullet.die();
            block.hit();
          }
        });
      });

      enemies.forEach(function(enemy) {
        brickBlocks.forEach(function(block) {
          if (collisionCheck(enemy, block)) {
            enemy.stop();
          }
        });
      });

    enemyBullets.forEach(function(bullet) {
          if (collisionCheck(bullet, tank)) {
            bullet.die();
            tank.die();
            enemiesLeft++;
          }
      });

      enemyBullets.forEach(function(bullet) {
        if (collisionCheck(bullet, base)) {
          bullet.die();
          base.die();
        }
    });

      enemyBullets.forEach(function(bullet) {
        brickBlocks.forEach(function(block) {
            if (collisionCheck(bullet, block)) {
                bullet.die();
                block.hit();
            }
        });
    });
    
    enemies.forEach(function(enemy) {
      if (collisionCheck(enemy, tank)) {
       // if (hit_delay === 0) {
          enemy.die();
          tank.die();
          enemiesLeft++;
      //  }
      }
    });
    brickBlocks.forEach(function(block) {
        if (collisionCheck(block, tank)) {
            switch(tank.angle)
            {
                case 1: stop1=true; tank.speedY = 0; break;
                case 2: stop2=true; tank.speedX = 0; break;
                case 3: stop3=true; tank.speedY = 0; break;
                case 4: stop4=true; tank.speedX = 0; break;
                default: break;
            }
        }
    });

    bullets = bullets.filter(function(bullet) {
        return bullet.active;
      });
    enemyBullets = enemyBullets.filter(function(eBullet) {
        return eBullet.active;
    });
    enemies = enemies.filter(function(enemy) {
        return enemy.active;
    });
    brickBlocks = brickBlocks.filter(function(block) {
        return block.active;
    });
  }