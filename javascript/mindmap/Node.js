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
map.Node=function()
{
  this.parent = null;
  this.mindmap = null;
  this.deleteable = true;
  this.children = new map.ArrayList();

  this.eventbinding_collapse= this._collapse.bindAsEventListener(this);
  this.eventbinding_click= this._click.bindAsEventListener(this);
  this.eventbinding_dblclick= this._dblclick.bindAsEventListener(this);
  this.eventbinding_mousedown= this._mousedown.bindAsEventListener(this);
  this.eventbinding_mouseup= this._mouseup.bindAsEventListener(this);
  this.eventbinding_mousemove= this._mousemove.bindAsEventListener(this);
}


/**
 * @final
 * @private
 **/
map.Node.prototype._collapse=function(event)
{
   Element.toggle(this.childrenContainer);
   Event.stop(event);
   this.drawLines();
   this.getMindmap()._IE_bug();
}

/**
 * @final
 * @private
 **/
map.Node.prototype._click= function(event)
{
  Event.stop(event);
  if(event.ctrlKey==true)
    this.mindmap.addCurrentSelection(this);
  else
    this.mindmap.setCurrentSelection(this);
}


/**
 * @final
 * @private
 **/
map.Node.prototype._dblclick= function(event)
{
  Event.stop(event);
  this.startEdit();
}

map.Node.prototype._mousedown= function(event)
{
  this.mouseDown=true;
  Event.stop(event);
  Event.observe(this.getAnchor(), 'mouseup', this.eventbinding_mouseup);
  Event.observe(this.getAnchor(), 'mousemove', this.eventbinding_mousemove);
}

map.Node.prototype._mouseup= function(event)
{
  this.mouseDown=false;
  Event.stop(event);
  this.mindmap.setDraggingNode(null);
  Event.stopObserving(this.getAnchor(), 'mouseup', this.eventbinding_mouseup);
  Event.stopObserving(this.getAnchor(), 'mousemove', this.eventbinding_mousemove);
}

map.Node.prototype._mousemove= function(event)
{
  if(this.mouseDown==true)
  {
    // init the DragDrop operation;
    Event.stop(event);
    this.mindmap.setDraggingNode(this);
    Event.stopObserving(this.getAnchor(), 'mouseup', this.eventbinding_mouseup);
    this.mouseDown=false;
  }
  Event.stopObserving(this.getAnchor(), 'mousemove', this.eventbinding_mousemove);
}

/**
 * @type HTMLElement
 * @final
 **/
map.Node.prototype.addNode=function(/*:map.Node*/ node)
{
  this.children.add(node);
  this.childContainer.appendChild(node.getHTMLElement());
  node.setParent(this);
  node.setMindmap(this.mindmap);
  this.hideAction(this.children.getSize()==0);
}

/**
 * @type HTMLElement
 * @final
 **/
map.Node.prototype.removeNode=function(/*:map.Node*/ node)
{
  this.children.remove(node);
  node.getHTMLElement().remove();
  node.setParent(null);
  node.setMindmap(null);
  this.hideAction(this.children.getSize()==0);
  this.drawLines();
}


/**
 * Event to inform this object that another object has
 * been drop on this object.
 **/
map.Node.prototype.onDrop=function(/*:map.Node*/ node)
{
  // Knoten wird umgehängt
  node.getParent().removeNode(node);

  // für jeden Knoten rekursiv eine deep Copy anlegen
  this.addNode(this.deepCopy(node));
}

map.Node.prototype.deepCopy=function(/*:map.Node*/ node)
{
  var clone = this.createEmptyChildNode();
  clone.getHTMLElement();
  var children = node.getChildren();
  for(var i=0;i<children.getSize();i++)
  {
    var child = children.get(i);

    clone.addNode(this.deepCopy(child));
  }

  return clone;
}

/**
 * Set the parent node of this element.
 * 
 * @private 
 **/
map.Node.prototype.setParent=function(/*:map.Node*/ parent)
{
  this.parent = parent;
  if(this.parent!=null)
    this.drawLines();
}

/**
 * Returns the parent node of this object.<br>
 * 
 * @type map.Node
 **/
map.Node.prototype.getParent=function()
{
  return this.parent;
}


/**
 * Returns the children nodes of this object.<br>
 * 
 * @type map.Array
 **/
map.Node.prototype.getChildren=function()
{
  return this.children;
}

/**
 *
 * @private 
 **/
map.Node.prototype.isVisible=function()
{
  return Element.visible(this.childrenContainer);
}


/**
 * Set the to root mindmap element of this node.
 * 
 * @private 
 **/
map.Node.prototype.setMindmap=function(/*:map.Mindmap*/ mindmap)
{
  this.mindmap = mindmap;
  for(var i=0;i<this.children.getSize();i++)
  {
    var child = this.children.get(i);
    child.setMindmap(mindmap);
  }
}



/**
 * Set the deleteable attribute of the node.
 * 
 * @param {boolean} flag The deleteable flag
 **/
map.Node.prototype.setDeleteable=function(/*:boolean*/ flag)
{
  this.deleteable = flag;
}


/**
 * Returns whenether the element is deletable
 * 
 * @type boolean
 **/
map.Node.prototype.getDeleteable=function()
{
  return this.deleteable;
}


/**
 * Returns the current assigned mindmap object.<br>
 * 
 * @type map.Mindmap
 **/
map.Node.prototype.getMindmap=function()
{
  return this.mindmap;
}

/**
 * Called by the framework to inform this element that this node
 * has been selected.<br>
 * The node is responsible to change the graphical representation.<br>
 * Subclases can override this method to customize the style of the node
 * in the selected mode.
 * 
 * @param {boolean} flag [true] if you want mark this element as selected
 **/
map.Node.prototype.setSelected=function(/*:boolean*/ flag)
{
   if(flag==true)
   {
     $(this.getAnchor()).addClassName("selected_node");
     $(this.getAnchor()).removeClassName("normal_node");
   }
   else
   {
     $(this.getAnchor()).removeClassName("selected_node");
     $(this.getAnchor()).addClassName("normal_node");
   }
}

/**
 * 
 * @param {boolean} flag [true] if you want mark this element
 **/
map.Node.prototype.setHighlighted=function(/*:boolean*/ flag)
{
   if(flag==true)
     $(this.getAnchor()).addClassName("highlighted_node");
   else
     $(this.getAnchor()).removeClassName("highlighted_node");
}



/**
 * Hide the [+] Icon. Will be called if no children for this node are available.<br>
 * Called by the framework.
 *
 * @private
 **/
map.Node.prototype.hideAction=function(/*:boolean*/ flag)
{
   if(this.actionIcon == undefined)
     return;

   if(flag)
     Element.hide(this.actionIcon);
   else
     Element.show(this.actionIcon);

}

/**
 * Returns an empty child node.<br>
 * Inherited classes can override this method to return node depending child nodes.<br>
 *
 * @type map.Node
 * @abstract
 **/
map.Node.prototype.createEmptyChildNode=function()
{
   throw "subclass must implement this method";
}

/**
 * Event after the HTML has been generate.
 *
 * @private 
 **/
map.Node.prototype.afterCreateHTML=function()
{
   Event.observe(this.getAnchor(), 'mousedown', this.eventbinding_mousedown);
//   Event.observe(this.getAnchor(), 'mouseup', this.eventbinding_mouseup);
//   Event.observe(this.getAnchor(), 'mousemove', this.eventbinding_mousemove);
   Event.observe(this.getAnchor(), 'click',this.eventbinding_click);
   Event.observe(this.getAnchor(), 'dblclick',this.eventbinding_dblclick);

   Event.observe(this.actionIconIcon, 'mousedown', this.eventbinding_collapse);

   this.setSelected(false);
}

/**
 *
 * @private 
 **/
map.Node.prototype.startEdit=function()
{
   alert("start edit");;
}

/**
 * @private
 **/
map.Node.prototype.getAnchor=function()
{
   return this.labelDiv;
}


/**
 * @private
 **/
map.Node.prototype.getAbsoluteAnchor=function()
{
   return Element.cumulativeOffset($(this.labelDiv));
}

/**
 * @private
 **/
map.Node.prototype.getAnchorHeight=function()
{
   return Element.getDimensions($(this.labelDiv)).height;
}

/**
 * @private
 **/
map.Node.prototype.getAnchorDimension=function()
{
   return Element.getDimensions($(this.labelDiv));
}

/**
 * @private
 * @type map.Node
 **/
map.Node.prototype.getBestNode=function(/*:int*/ x, /*:int*/ y)
{
  if(this.isOver(x,y))
     return this;

  for(var i=0;i <this.children.getSize();i++)
  {
    var node = this.children.get(i);
    var hit = node.getBestNode(x,y);
    if(hit!=null)
        return hit;
  }
  return null;
}


/**
 * @private
 **/
map.Node.prototype.getAnchorBoundigBox=function()
{
   var box  = this.getAnchorDimension();
   var pos  = this.getAbsoluteAnchor();
   box.left = pos.left;
   box.top  = pos.top;
   return box;
}

/**
 * @private
 **/
map.Node.prototype.isOver = function (/*:int*/ iX ,/*:int*/ iY)
{
    var box = this.getAnchorBoundigBox();
    var iX2 = box.left + box.width;
    var iY2 = box.top - box.height;
    return (iX >= box.left && iX <= iX2 && iY <= box.top && iY >= iY2);
}

