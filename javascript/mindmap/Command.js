/* This notice must be untouched at all times.

Open-jACOB Draw2D
The latest version is available at
http://www.openjacob.org

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/

/**
 * Base class for the undo redo support in the Open-jACOB Draw2d framework.
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
map.Command=function(/*:String*/ label)
{
  this.label = label;
}

/** @private **/
map.Command.prototype.type="map.Command";

/**
 * Returns a label of the Command. e.g. "move figure".
 *
 * @final
 **/
map.Command.prototype.getLabel=function()
{
   return this.label;
}


/**
 * Returns [true] if the command can be execute and the execution of the
 * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
 * return false. Rhe execution of this Command doesn't modify the model.
 *
 * @type boolean
 **/
map.Command.prototype.canExecute=function()
{
  return true;
}

/**
 * Execute the command the first time.
 * Sup-classes must implement this method.
 **/
map.Command.prototype.execute=function()
{
}

/**
 * Will be called if the user cancel the operation.
 *
 **/
map.Command.prototype.cancel=function()
{
}

/**
 * Undo the command.
 * Sup-classes must implement this method.
 *
 **/
map.Command.prototype.undo=function()
{
}

/** 
 * Redo the command after the user has undo this command.
 * Sup-classes must implement this method.
 *
 **/
map.Command.prototype.redo=function()
{
}
