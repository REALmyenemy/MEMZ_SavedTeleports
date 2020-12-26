/*:
 * Version 1.0.0
 * @target MZ
 * Last update 26/12/20
 * @author myenemy
 * @plugindesc You can go back to the entrance you came from
 * 
 * @command save
 * @text Save Teleport
 * @arg Name
 * @arg Type
 * @arg Map
 * @arg X
 * @arg Y
 * @arg Direction
 * @arg Transition
 * @desc Transfer player
 * 
 * @command transfer
 * @text Transfer
 * @arg Name
 * @desc Sends the player to saved location by name
 * 
 * 
 * @help
 * In many games there's the situation where a door's location or warp, changes,
 * it may be over time or for example, a shop that's just in every single city,
 * or a dungeon you can enter from many places or a "my castle".
 * Instead noting and sending back to the last visited map, or copy-pasting that shop, you can just use this plugin.
 * I suggest you to start with LastDoor plugin if you are worried about setting this one up.
 * 
 * Script Commands:
 * - Save teleport
 * "Name" is the alias you will use to teleport later. If it's already there, it will be updated to the new info. It must start by a letter!
 * "Type" is 0 if you want to set the location specifically, any other number if you want to use variables
 * Just like editor transfer player option, "Map" is the map to be teleported when you call it, "X" the X coordinate in the map and "Y" the Y coordinate in the map.
 * "Direction" is where the character will face. 1 for down, 2 for left, 3 for right, 4 for up. 0 is "retain".
 * Trasition is the effect to apply on this transfer, 0 for black screen, 1 for white screen, any other for no effect.
 * 
 * If you don't set "Type", "Direction" and "Transition", they will be set to 0!
 * Also, if you only type the Name, Map, X and Y will be set to current location.
 * 
 * - Transfer
 * This only contains one argument, "Name". Name is the name you declared when you used save. Make sure the player runs "save" first!
 * 
 * 
 * ==============================================
 * @Terms of use
 * - Common:
 * -  Free to use as in money.
 * -  Feel free to modify to redistribute it.
 * -  This plugin comes as is, with no guarantees.
 * -  I'll try to give support about it, but I can't say I will do it for sure.
 * - Non Commercial:
 * -  No credit required unless you modify it then credit yourself, in other words,
 *   no claiming as your own!
 * - Commercial:
 * -  Give credit me as the author of this plugin, I don't mind if you do so in some
 *   scene or some easter egg.
 * -  Report any bugs, incompatibilities and issues with this plugin to me, even if
 *   you have someone else fixing them.
 * 
 * @Terms of redistribution and disambiguation
 * - You must include a link to the original RPG Maker Forums Post plugin.
 * - You can add terms to it, but you can't remove or modify the ones already existent.
 * - You must follow LGPL 3.0.
 *
 * ==============================================
 *
 *
 */

 Game_Player.prototype.ME_savedTeleports=new Map();

PluginManager.registerCommand("ME_SavedTeleports","save",args => {
	
	if (args&&args["Name"]&&!args["Name"].match(/^\d/))
	{
		var name=args["Name"];

		var type=parseInt(args["Type"])||0;
		var map=parseInt(args["Map"])||$gameMap._mapId;
		var x=parseInt(args["X"])||$gamePlayer._x;
		var y=parseInt(args["Y"]||$gamePlayer._y);
		var direction=parseInt(args["Direction"])||0;
		var transition=args["Transition"]||0;
		
		$gamePlayer.ME_savedTeleports.set(name,[type,map,x,y,direction,transition]);		
	}
});

PluginManager.registerCommand("ME_SavedTeleports","transfer",args => {
	
	if (args)
	{
		var name= args["Name"];
		if (name&&!name.match(/^\d/))
		{
			if ($gamePlayer.ME_savedTeleports.has(name))
			{
				var params=$gamePlayer.ME_savedTeleports.get(args["Name"]);
			
				return Game_Interpreter.prototype.command201(params);
			}
		}
	}
	return false;
});
