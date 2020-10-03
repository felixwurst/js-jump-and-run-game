# Project: Build a Front-End Application with Vanilla JavaScript

## Creating a Jump & Run Game

[Live Demo](https://felixwurst.github.io/js-jump-and-run-game/)

Jump and Run Game with a Retro Design of the 2D 8-Bit Games of the 80’s.

The Player will have to conquer different levels in which she/he will have to collect all coins and avoid being burned by lava to be able to get into the next level.
If the player touches lava, the current level is restored to its starting position, and the player may try again.

We want to create a structured foundation for a jump and run game.
The game should be extendable.

Our game shall be developed without canvas. Canvas shall be used as an addition if wanted to add preferred background or different player suit.

There shall be different moving actors in the game and some which are static.

We want the player token to be moved with the arrow keys, when they are pressed down.

We want to create the levels by ourselves. We will use common keyboard chars for it.

To do so the program must be able to read them, to differ between moving and static actors and separate them from each other in order to make them move or move the player token with the arrow keys.

The Color references are Piet Mondrian and Roy Lichtenstein
We will be imitating a painting hanging on a wall.

Our reference is the book: Eloquent JavaScript

We tried to realize a project given in the book.

Feel free to contact us:

Neda Dehghan: neda.mail7@yahoo.com

Felix Wurst: felix.wurst@gmail.com

**Code Documentation :**

The Documentation is a shorter description of the steps we took.
The Code is commented more detailed and even has and extended Comment-sheet for going more into detail of what has been done and why. So please go ahead and check the code for better understanding and explanation.

#### Content Table

-   [Class Level](#1.-class-level)

-   [Class State](#2.-class-state)

-   [Class Vec](#3.-class-vec)

-   [Class Player](#4.-class-player)

-   [Class Coin](#5.-class-coin)

-   [Level Chars](#6.-level-chars)

-   [Function Elt](#7.-function-elt)

-   [Class DOMDisplay](#8.-class-domdisplay)

-   [Function drawGrid](#9.-function-drawgrid)

-   [Function drawActors](#10.-function-drawactors)

-   [DOMDisplay.prototype.syncState](#11.-domdisplay.prototype.syncstate)

-   [DOMDisplay.prototype.scrollPlayerIntoView](#12.-domdisplay.prototype.scrollplayerintoview)

-   [Level.prototype.touches](#13.-level.prototype.touches)

-   [Update method](#14.-update-method)

-   [State.prototype.update](#15.-state.prototype.update)

-   [Function Overlap](#16.-function-overlap)

-   [Lava.prototype.collide, Coin.prototype.collide](#17.-lava.prototype.collide,-coin.prototype.collide)

-   [Lava.prototype.update, Coin.prototype.update](#18.-lava.prototype.update,-coin.prototype.update)

-   [Player.prototype.update](#19.-player.prototype.update)

-   [Function trackKeys](#20.-function-trackkeys)

-   [Function runAnimation](#21.-function-runanimation)

-   [Function runLevel](#22.-function-runlevel)

-   [Async function runGame](#23.-async-function-rungame)

-   [Function createHiScoreList](#24.-function-createhiscorelist)

-   [Function scoreFormatter](#25.-function-scoreformatter)

Creation of Simple Level Plan for better understanding of how the levels are created with the chars and how they can look like. It is up to us.

(.) periods are "empty" so they are the background-color<br>
(#) characters are walls<br>
(=) at the top is a block of lava that moves back and forth horizontally<br>
(|) creates vertically moving lava<br>
(v) indicates dripping lava<br>
(@) is the starting position is the player<br>

```
..............................
......#................#......
......#..............=.#......
......#.........o.o....#......
......#.@......#####...#......
......#####............#......
..........#++++++++++++#......
..........##############......
..............................
```

#### 1. Class Level

Create a Level reader.
We create a class that stores the level object. Its argument is the string that defines the level.
To interpret the characters in the plan, the Level constructor uses the levelChars object, which maps background elements to strings and actor characters to classes.

each 'rows' holds an array of arrays with characters, the rows of the level plan.
map passes the array index as a second argument to the mapping function,
which tells us the x- and y-coordinates of a given character.

#### 2. Class State

Create the class State for the status.
As the game runs, actors will do different things and be at different places or even disappear entirely (coins when collected). We’ll use a State class to track the state of a running game.

#### 3. Class Vec

The actors movements are vector movements, so they have to be calculated new each time they move.
So it's best to create foundation for it which can be reused with the wanted/needed parameters.
It is the object with which we are able to find and give the different actors their position in the grid of the game.
The position of the actor is stored as a Vec object. This is a two-dimensional vector, an object with x and y properties.
The functions plus and times are created in the vector object and can be used for the class Vec.
Function plus for vector addition, function times for vector multiplication, e.g. for jumping

**Now we can create the classes for the different actors in the game.**

The different types of actors get their own classes since their behavior is different.
Their pos property holds the coordinates of the element’s top-left corner, and their size property holds its size.

#### 4. Class Player

We create a class for the player with an object constructor.  
The static create method looks at the character that the Level constructor passes and creates the
appropriate player actor from a character in the level plan.
It is given the coordinates of the character and the character itself, which is needed because the Lava class handles several different characters.

The size of non of the Actors will change.
So it is stored on .prototype rather than in the object itself
using type would create and return a new Vec object every time the property is read

#### 5. Class Coin

We want the coins to "wobble".
coins would move up and down synchronously, the starting phase of each coin is randomized to avoid that.
Multiply the value returned by Math.random by 2 π to give the coin a random starting position on the wave. The width/range of the wave a circle produces, is 2 π
range of a Circle = 2π \* r, random gives a number between 0 and 1, also a position on the circular orbit. beginning = 0, end = 1, 0 and 1 are same position

#### 6. Level Chars

Then we define the levelChars object that maps the plan characters to either background grid types or actor classes.
The levelChars Object has to be declared after the classes are created not before.
As the chars are ascribed to actor classes that had to be created before.

Now we get to the functions that create the foundations.

#### 7. Function Elt

We create a function to create the base elements with attributes.
this function provides a short and precise way to create an element and give it some attributes
and child nodes. It is going to be reused in the following functions afterwards every time new
elements and attributes are needed, it also adds children element to their parent.
name => which html-element(e.g. Div, table...), attrs => classes or style-attributes for this element, ...children => div(game) => table(background) => tr(row) => td(block)

Now we get to draw the Level

#### 8. Class DOMDisplay

We define the display object to encapsule the drawing code.
The reason for this is that we want to be able to extend the game and display it in a different way. By putting the drawing behind an interface, we can load the same game program there and plug in a new display module. We do so by defining an display object.
The DOMDisplay is called so because it uses DOM elements to show the level.
A display is created by giving it a parent element to which it should append
itself and a level object.
DrawGrid has to be read in combination with the class DOMDisplay. They belong together.
The function could have also be written right inside the class.
It is a dynamic way to create the elements, classes and attributes of the background-grid,
which is divided like table-rows with table data.
this.dom acts like a super div with all the information inside(from drawGrid) which
each time is then added dynamically again to the body which is the 'master' parent.

#### 9. Function drawGrid

At this Point we want to scale the coordinates
scale constant gives the number of pixels that a single unit takes up on the screen.
each char/actor has its position on the grid. It is the frame on which the vector object
aligns the position for the moveable actors when it comes to use.
DrawGrid has to be read in combination with the class DOMDisplay. they belong together.
Same as for the DOMDisplay it could have been written inside the class.
By separation the code is more accessible and readable. Because you can use the function for different classes if needed.

**We’ll be using a style sheet to set the actual colors**

and other fixed properties of the elements that make up the game, to keep the code clean.
It would also be possible to directly assign to the elements’ style property when we create them, but that would complicate and produce a lengthy code.

#### 10. Function drawActors

Start drawing of the single actors with scaling and positioning
creating DOM-elements
First line is to create a div with actor-divs inside, each gets size- and position-values inside their style-attributes
We use the elt function here again as a recursive.
We create one div without attributes but all the children from the parameter actors.
It is mapped to get every single "actor"-element which is then given an element again, an attribute, but this time no children.
The size attributes are the size and position and scale which have been set before

#### 11. DOMDisplay.prototype.syncState

Showing the current position of the Actor and redraw it in its new position
We initialize an Object
By building different methods for the different classes. and add it to them with .prototype
The created syncState method is used to make the display show a given state
The actorLayer property will be used to track the element that holds the actors so that they
can be easily removed and replaced
This deletes the moving actor and redraws it with its new position again and adds it to the main div(superDiv in this.dom) and gives it now the class: 'game playing'
Since there will be only a few actors in the game, redrawing all of them is not so wasteful on the data-space
syncState is a property of DOMDisplay added to it with .prototype. it doesn't change and
it is a function inside this property, it is used inside the async function runGame

#### 12. DOMDisplay.prototype.scrollPlayerIntoView

Detect positions of the actor to set the position of the game screen
We want the view point of the player to be frankly centered.
First to not be able to see the entire level, but also so the game frame moves with the players movement.
The way the player’s center is found shows how the methods on the Vec type allow calculation with objects to be written in a readable way.
To add the actor's center, we add its position (top-left corner) and half its size.
That is the center in level coordinates, but we need it in pixel coordinates, so
we then multiply the resulting vector by our display scale.
This way we create a method "scrollPlayerIntoView" which is added to DOMDisplay with .prototype. as a property.
It is a function inside this property.
It is used in the syncState function

#### 13. Level.prototype.touches

Now we want to control and set the setting for the movements in the game
we will create conditions to be able to deal with the interactions between the elements.
The game must notice when a given motion causes an object to hit another object and respond accordingly.
with: Level.prototype.touches = {....} we are checking and giving conditions to make sure the player stays inside the game field and doesn't fall outside of the frame.
The created touches method for the level object (added to it with .prototype) tells us whether a rectangle (specified by a position and a size) touches a grid element of the given type.
It calculates the set of grid squares that the body overlaps with.( by using Math.ceil/floor)
By rounding the sides of a box up and down, we get the range of background squares that the box touches.
We loop over the grid by rounding the coordinates and return true when the matching square is found. Squares outside of the level are also treated as "wall" even they are actually "empty" to make sure that the player can't leave the level world and won’t accidentally try to read outside of the bounds of our rows array.

#### 14. Update method

Each actor has his individually created update method which is then initialized to the different objects with .prototype. We do this because the actors act differently.
Update method actualizes the data of the given object.
The actors also get the time step, the keys, and the state, so that they can base their update on those parameters.

#### 15. State.prototype.update

The State update
The first thing it does is call the update method on all actors, producing an array of updated actors.
this.actors.map is an array of objects.
We map it and check for the single actor (coin, lava, player..).. the .update is then added to the actor.
actor.update(time, this, keys) is the INDIVIDUAL update method of those classes of the actors, which have been created and added to them before ( with .prototype).
It is passed with parameters for them which are not necessarily used by all classes in their methods. Only the player will actually read keys, since that’s the only actor that’s controlled by the keyboard.

#### 16. Function Overlap

Overlap between actors is detected with the overlap function. It takes two
actor objects and returns true when they touch, which is the case when they
overlap both along the x-axis and along the y-axis.
If the actors overlap the collide method updates the state. Touching lava will change the status to "lost".

#### 17. Lava.prototype.collide, Coin.prototype.collide

Then we create a method for colliding actors
For the lava and the coins.
In case of the coins, they will vanish when the player collides with them.
We restart the sound, it's needed if you collect more than one coin in a short time and the sound didn't finished yet.
We set the conditions for the coins. Because the player has to collect all coins before she/he can get to the next level.
If touching the last coins the status is changed to "won"
If there is no actor "coin" found with .some then the game is won
The ! switches true to false .. so it shows me true when there are no more coins in the filtered array.

#### 18. Lava.prototype.update, Coin.prototype.update

Creating the update method for the moving actors
The objects’ update methods for the actors, take as arguments the time step, the state object, and a keys object.
The one for the Lava actor type ignores the keys object.
This update method (for the lava) calculates a new position by adding the product of the time step and the current speed to its old position.

For the coin : The wobble property is incremented to track time and then used as an argument to Math.sin to find the new position on the wave. The coin’s current position is then calculated from its base position and an offset based on this wave.

#### 19. Player.prototype.update

Player motion is handled separately per axis because hitting the floor should not prevent horizontal motion, and hitting a wall should not stop falling or jumping motion.
The horizontal motion is calculated based on the state of the left and right arrow keys.
When there’s no wall blocking the new position created by this motion, it is used.
Otherwise, the old position is kept.
Vertical motion works similar but has to simulate jumping and gravity.
The player’s vertical speed ( ySpeed ) is first anticipated to account for gravity.

#### 20. Function trackKeys

We want that the effect of the pressed key (moving the player figure) to stay active as long as they are held.
We set up a key handler that stores the current state of the left, right, and up arrow keys.
We call preventDefault for those keys so that they don’t end up scrolling the page.
The function takes the given array of key names and will return an object that tracks the current position of those keys.
It registers event handlers for "keydown" and "keyup" events and, when the key code in the event is present in the set of codes that it is tracking, it updates the object.
The same function is used for both event types. It checks if the key state should
be updated: to true = "keydown" or false = "keyup".

#### 21. Function runAnimation

To show and run the game the script uses requestAnimationFrame to schedule the animate function to run whenever the browser is ready to repaint the screen.
The animate function itself again calls requestAnimationFrame to schedule the next update.
If we just updated the DOM in a loop, the page would freeze, and nothing would show up on the screen.
Browsers do not update their display while a JavaScript program is running, nor do they allow any interaction with the page. This is why we need requestAnimationFrame it lets the browser know that we are done for now, and it can go ahead and do other things such as updating the screen and responding to user actions.
Using requestAnimationFrame requires us to track the time at which our function was called the last time around and call requestAnimationFrame again after every frame.
We create a function (runAnimation) that wraps the time tracking function(frame) which needs a time difference as an argument and draws a single frame.
When the frame function returns the value false, the animation stops.

#### 22. Function runLevel

The runLevel function takes a Level object and a display constructor and returns a promise.
It displays the level (in document.body) and lets the user play through it.
runLevel waits one more second (to let the user see what happens) and then clears the display,
tops the animation, and resolves the promise to the game’s end status.
the switch for gameBlocker, prevents start of a new gameDisplay if playButton is clicked repeatedly while game is already running

#### 23. Async function runGame

Whenever the player dies, the current level is restarted.
The runGame function takes an array of level plans, which are strings, and a display constructor.
Because runLevel returns a promise we can write runGame with async.
It returns another promise, which resolves when the player finishes the game.

#### 24. Function createHiScoreList

We created a function to access the local storage and be able to display the High scores of the different players.
You have to enter a name in the playerName input to see your high score after the game is played.
It stores the name and the score of the player in the local storage and shows it after the player
has won or lost the game.
When the player plays a new game or a new plays the high score is not lost.

#### 25. Function scoreFormatter

Last but not least the Score Formatting
created a function to set the digits of the score and the coins in the score bar.
It takes the score and adds a digit to it depending on the given digit number, so it always has the same length in the score counter.
