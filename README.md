# NotificationManager Plugin

Written by Abraham Walters<br>
* v1.0 - July 2011
* v1.1 - July 2012
* v.1.1.1 - August 2012
* v.1.1.2 - August 2012
* v.1.1.3 - January 2013

This plugin extends the Font class and allows you to  move it and have
it fade after a specified amount of time. The plugin also provides a 
NotificationManager to do all your dirty work and track each Notification 
for updating and drawing.

To use the plugin you will need to create an instance of the
NotificationManager in your game like so:
```javascript
myNoteMgr: new ig.NotificationManager(),
```
You will then need to add myNoteMgr.update() to ig.game.update()
and myNoteMgr.draw() to ig.game.draw().  Make sure you add 
myNoteMgr.draw() after the this.parent() draw, otherwise your 
Notifications will be drawn over. From there you can spawn a
Notification within any Entity using the following syntax:
```javascript
ig.game.myNoteMgr.spawn('media/font.png', 'string', x, y, settings);
```
Or you can create a Notification and then feed it to the NotificationManager
later:
```javascript
var note = new ig.Notification( 'media/font.png', 'string', x, y, settings );
//other code
ig.game.myNoteMgr.add( note );
```
A Notification can accept either an ig.Font object as its first parameter or a path to a font image. The NotificationManager also provides find() and remove() methods for managing your notifications. You can also use Notifications sans the NotificationManager.

##New in Version 1.1.1 

You can now set an ig.Notification to follow an entity:
```javascript
var player = ig.game.getEntitiesByType( EntityPlayer )[0];
var note = new ig.Notification( 'media/font.png', 'Hello World', player.pos.x, player.pos.y - 10 );
note.follow( player );
ig.game.myNoteMgr.add( note );
```
This will create a new Notification and have it follow the player.

Feel free to dig into the code and the changelog for more details.

Enjoy!
