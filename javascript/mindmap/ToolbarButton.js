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
map.ToolbarButton=function(/*:map.Mindmap*/ mindmap, /*:String*/ label)
{
  if(mindmap== undefined)
      return;
  this.label = label;
  this.mindmap = mindmap;
  this.enabled = false;
  this.mindmap.addSelectionListener(this);

  this.executeBinding= this.execute.bindAsEventListener(this);

  // init the element
  this.getHTMLElement();
}

map.ToolbarButton.prototype = new map.SelectionListener;


/**
 * @private
 **/
map.ToolbarButton.prototype.getHTMLElement=function()
{
   if(this.html==null)
   {
      this.html = new Element("li");
      this.html.className="toolbar_button";
      this.a= new Element("a");
      this.a.className="toolbar_button";
      this.a.innerHTML = this.label;
      this.html.appendChild(this.a);
      this.setEnable(true);
      disableSelection(this.a);
   }
   return this.html;
}

/**
 * Returns the current assigned mindmap object.<br>
 * 
 * @type map.Mindmap
 **/
map.ToolbarButton.prototype.getMindmap=function()
{
  return this.mindmap;
}

/**
 * Execute function of the button. This method will be called if the user
 * clicks on the button.<br>
 * Inherited classes should override this method to implement more usefull functions. :-)
 * 
 * @public
 **/
map.ToolbarButton.prototype.execute=function()
{
   alert("Default action for a Toolbarbutton called");
}


/**
 * Enable / disable this element.
 * 
 * @param {boolean} flag The enable flag
 * @final
 * @public
 **/
map.ToolbarButton.prototype.setEnable=function(/*:boolean*/ flag)
{
   // nothing todo
   if(this.enabled == flag)
      return;

   this.enabled = flag;
   if(this.enabled == true)
   {
     Event.observe(this.html, 'click',this.executeBinding);
     $(this.a).removeClassName("toolbar_button_disabled");
   }
   else
   {
     Event.stopObserving(this.html, 'click',this.executeBinding);
     $(this.a).addClassName("toolbar_button_disabled");
   }
}

/**
 * Sent when the selection in the mindmap has been changed.
 * Can be used to enable element in relation to the current selection.
 *
 **/
map.ToolbarButton.prototype.selectionChanged=function(/*:map.ArrayList*/ currentSelection)
{
}
