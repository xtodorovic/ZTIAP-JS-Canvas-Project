Probably the most tricky part was the collision.
Since I was trying to do all the graphics by myself, I didn't finish most of them,but the intro screen is looks cool.

There are still bugs that need to be solved, but the game is playable for the most part.

I considered implementing MVC but I didn't have time to overwrite the whole code.
I also didn't implement the Observer pattern. The rest is there I think.
Every bit of code is seperated in it's own .js file so it's easier to connect the code.

gameScript.js has most of variables used by the game and it has Load,Quit game and Start function.
		It also has the main menu update() function.

GameArea.js is what happens in the game. It has it's own update function, everything happening on the screen
		is manipulated in that function.

Enemy, Player function/classes have sligtly different structure, but they are very similar.

Collision is checked in the Collision.js and if collision is detected, function renders it not active and 
function fillters only active objects.