# Collision Based Metaball Speeds Within an Isosurface

This repository includes a creative refactoring of The Coding Train's (Dan Shiffman) Coding Challenge: Metaballs. My refactoring takes the Metaballs and increases their speeds when they hit the edges of the canvas. It also has a counter at the top for how many times the edges have been hit by the Metaballs.

## Original Coding Challenge

[Metaballs - Coding Challenge #28 - The Coding Train](https://thecodingtrain.com/CodingChallenges/028-metaballs.html)

## Changes to the Code

One of the biggest changes with my code is that instead of creating a class on a seperate file as Dan Shiffman did, I have all my "classes" on the sketch.js file using object inheritance. The main reason behind this is that my original refactoring ideas were different from what I ended up doing and for those ideas I thought it be easier to implement if I changed the code to not use classes on seperate files. 

### The Collision Counter

A function within the blob's object type checks if there has been a collision with the canvas. Based on this, it sets a variable equal to either true or false and returns said variable. Within the draw() function, a for loop iterates through each metaball in the array of 10 and sets another variable equal to the boolean returned by the collision check function for the metaball in the array that the loop is on. If the value returned is true, 1 is added to the variable holding total # of collisions. This total variable is then displayed as text.

### Speed Increase by Canvas Collision

In the update function of the blob object is where the x and y positions are updated based on their respective speeds. In this function were also conditional statements that checked if the the position of the metaball was the same as a point on the edge of the canvas. If it was, the speed would be multiplied by -1 to send it in the opposite direction. In this, I simply added a line that added 0.5 to the x and y speeds. However, the metaballs would sometimes go off screen due to the fact that adding a value to the reversed speed would sometimes make it above 0 and so instead of reversing, the ball would just continue in the same direction and go offscreen. To fix this, I added two conditionals that checked whether the speeds were greater than 0. If they were, it would add 0.5 and if they were less than 0, it would subtract 0.5. Now the speeds would increase, but the balls would still travel in the right direction.
