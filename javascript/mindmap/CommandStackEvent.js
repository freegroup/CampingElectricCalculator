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
 * Instances of this class are sent whenever stack events occur. The type of event 
 * can be determined by calling getDetail(), and comparing the return value to constants 
 * defined by map.CommandStack.
 *
 * Warning: this class is not intended to be subclassed. 
 * 
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
map.CommandStackEvent=function(/*:map.Command*/ command, /*:int*/ details)
{
   this.command = command;
   this.details = details;
}

map.CommandStackEvent.prototype.type="map.CommandStackEvent";

/**
 * Returns null or a Command if a command is relevant to the current event.
 * 
 * @type map.Command
 **/
map.CommandStackEvent.prototype.getCommand=function()
{
   return this.command;
}

/**
 * Returns an integer identifying the type of event which has occurred
 * ( defined by map.CommandStack).
 **/
map.CommandStackEvent.prototype.getDetails=function()
{
   return this.details;
}

/**
 * Returns true if this event is fired after the stack having changed.
 *
 * @type boolean
 * @returns true if post-change event
 **/
map.CommandStackEvent.prototype.isPostChangeEvent=function()
{
   return 0 != (this.getDetails() & map.CommandStack.POST_MASK);
}

/**
 * Returns true if this event is fired prior to the stack changing.
 * 
 * @type boolean
 * @returns true if pre-change event
 **/
map.CommandStackEvent.prototype.isPreChangeEvent=function()
{
   return 0 != (this.getDetails() & map.CommandStack.PRE_MASK);
}
