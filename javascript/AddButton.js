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
map.AddButton=function(/*:map.Mindmap*/ mindmap)
{
  map.ToolbarButton.call(this,mindmap, "Add");
  this.setEnable(false);
}

map.AddButton.prototype = new map.ToolbarButton;


/**
 * Execute function of the button. This method will be called if the user
 * clicks on the button.<br>
 * Inherited classes should override this method to implement more usefull functions. :-)
 * 
 * @public
 **/
map.AddButton.prototype.execute=function()
{
   var node = this.getMindmap().getCurrentSelection().get(0);
   var command = new map.CommandAdd(node, node.createEmptyChildNode());
   this.getMindmap().getCommandStack().execute(command);
   this.getMindmap()._IE_bug();
}

/**
 * Sent when the selection in the mindmap has been changed.
 * Can be used to enable element in relation to the current selection.
 *
 **/
map.AddButton.prototype.selectionChanged=function(/*:map.ArrayList*/ currentSelection)
{
   this.setEnable(currentSelection.getSize()==1);
}
