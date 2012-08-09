# NotificationManager-Plugin Changelog

- Refactored ig.NotificationManager
	- Added .add() - Adds any Notification vs. .spawn(), which instantiates and adds a new Notification
	- Added .find() - Finds any Notification by its Text string
	- Added .remove() - Removes any note
	- Renamed .spawnNote() to .spawn()
- Refactored ig.Notification
	- Added .align property
	- Added two optional parameters to .draw(): align - specify an alignment from ig.Font.ALIGN, and text - specify a text string. These can be used if calling the .draw() directly for an ig.Notification vs. from the ig.NotificationManager
	- Changed .fadetime from an ig.Timer object to a value
	- Renamed class ig.Notification from Notification