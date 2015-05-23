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
 * 
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
map.CommandDelete=function(/*:map.ArrayList*/ nodes)
{
   map.Command.call(this,"Delete Nodes");
   this.nodes = nodes;
}

map.CommandDelete.prototype = new map.Command;
/** @private **/
map.CommandDelete.prototype.type="map.CommandDelete";

/**
 * Execute the command the first time
 * 
 **/
map.CommandDelete.prototype.execute=function()
{
   this.redo();
}

/**
 * Undo the command
 *
 **/
map.CommandDelete.prototype.redo=function()
{
   var size = this.nodes.getSize();
   for(var i=0; i<size;i++)
   {
      var node = this.nodes.get(i);
      var parent = node.getParent();
      node.getMindmap().removeCurrentSelection(node);
      parent.removeNode(node);
   }
}

/** Redo the command after the user has undo this command
 *
 **/
map.CommandDelete.prototype.undo=function()
{
}
