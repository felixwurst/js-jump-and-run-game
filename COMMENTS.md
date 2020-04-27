we built different methods for the different classes. 
for example: update has different functions for the actors. each moving actor has his own update function/METHOD. the update is then added with .prototype to the actor class. like this we create methods. but each update method is individual for each class and has to be added to that class with .prototype. 
so lava is not using the update method of coin when it is added like 
lava.update.
.update can only be used by the object properties from the class it has been added 
to with .prototype. 
as all the moving actors have different conditions for their updates. the method update has been created for them individually. 

in this piece of code : 

State.prototype.update = function(time, keys) {

    let actors = this.actors.map(actor => actor.update(time, this, keys));
    console.log(actors);

    ................}

we are creating an update method for the class state and adding it to it with .prototype. 

this.actors.map is an array of objects. 
we map it and check for the single actor ( coin, lava, player..).. 
the .update is then added to the actor.
actor.update(time, this, keys)  is the INDIVIDUAL update method of those classes of the actors, which have been created and added to them before ( with .prototype) it is passed with parameters for them which are not necessarily used by all classes in their methods.  actor.update(TIME, THIS, KEYS)
 the parameters : (TIME, THIS, KEYS)
 time for example is used by all actors in their update method, 
 state is used by lava and player in their update method
 keys are used from player and state in their update method
and this is the State itself. 

/////////////////////////////////////////////////////////////////////////////////////////
 
 in this piece of code : 

 Coin.prototype.collide = function (state) {
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    console.log(state.actors);
    console.log(filtered);
    
    
   
    if (!filtered.some(a => a.type == "coin")) {
        status = "won";



here: let filtered = state.actors.filter(a => a != this);
we filter the actors out of the array from state.actors (filter also creates a new array) 
it looks inside and sees which actors are there on that level, and how many. ( for example if there is more than one coin in the level, it is written : "coin" coin")
we filter what is unequal this (  != this; so we filter everything besides the object coin,
"this" is a coin because it refers to the object Coin : Coin.prototype.collide = ...)
so like this we create an new filtered array without the coins in the moment our player "eats" the coins.
look at : console log( filtered)


in : (!filtered.some(a => a.type == "coin"))
.some is looking if the filtered element passes the condition. 
in this case the condition is to see if the type of the actor is a coin.
through the exclamation mark (!) the given boolean value is reversed .. true is false and false is true 

.some would return true if it finds at least one coin in the array.
like this with the exclamation mark, it gives me true when it CAN NOT find any coins anymore.
so now our code in our if-condition sais: 
if it is true, that there are no more coins, then you have won. 

