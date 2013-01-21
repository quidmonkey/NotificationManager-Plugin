# NotificationManager-Plugin Changelog

## v.1.1.3

- Fixed follow so that it font now matches entity's position vs. its velocity (submitted by theunstoppablecarl)
- Added entityOffset property for offseting font's position when following an entity (submitted by theunstoppablecarl)

## v.1.1.2

- Fixed Alpha

## v.1.1.1

- Fixed ig.Notification so that the passed-in font can either be an instance of ig.Font or a path to a font image. If the latter, ig.Notification will create an instance of ig.Font automatically.
- Added .follow() method that allows an ig.Notification object to follow an entity.
- Added .setVel() method that sets an ig.Notification vel and will stop it from following an entity if it is.

## v.1.1

- Refactored ig.NotificationManager
	- Added .add() - Adds any Notification vs. .spawn(), which instantiates and adds a new Notification
	- Added .find() - Finds any Notification by its Text string
	- Added .remove() - Removes any note
	- Renamed .spawnNote() to .spawn
- Refactored ig.Notification
	- Added .align property
	- Added two optional parameters to .draw(): align - specify an alignment from ig.Font.ALIGN, and text - specify a text string. These can be used if calling the .draw() directly for an ig.Notification vs. from the ig.NotificationManager
	- Changed .fadetime from an ig.Timer object to a value
	- Renamed class ig.Notification from Notification
