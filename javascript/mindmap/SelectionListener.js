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
 * A listener interface for receiving notification before and after commands are executed, undone, or redone.
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
map.SelectionListener=function()
{
}

map.SelectionListener.prototype.type="map.SelectionListener";

/**
 * Sent when the selection in the mindmap has been changed.
 * Can be used to enable element in relation to the current selection.
 *
 **/
map.SelectionListener.prototype.selectionChanged=function(/*:map.ArrayList*/ currentSelection)
{
}
