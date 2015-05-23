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
 * A factory for creating new EditParts. EditPartViewers can be configured with an EditPartFactory.
 * Whenever an EditPart in that viewer needs to create another EditPart, it can use the Viewer's factory.
 * The factory is also used by the viewer whenever EditPartViewer.setContents(Object)  is called.
 * 
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */

var createCanvas = function(/*:HTMLElement*/ parent) 
{
  var canvas = document.createElement("canvas");
  parent.appendChild(canvas);
  if ("G_vmlCanvasManager" in window) 
  {
    canvas = G_vmlCanvasManager.initElement(canvas);
    Element.setStyle( $(canvas).firstChild,"display:inline-block");
  }
  return canvas;
}

function disableSelection(element) {
    element.onselectstart = function() {
        return false;
    };
    element.unselectable = "on";
    element.style.MozUserSelect = "none";
    element.style.cursor = "default";
}


map.Mindmap=function(/*:String*/ id, /*:int*/width, /*:int*/ height)
{
   /** @private **/
   this.width  = width;
   /** @private **/
   this.height = height;
   /** @private **/
   this.leftChildren = new map.ArrayList();
   /** @private **/
   this.rightChildren = new map.ArrayList();
   /** @private **/
   this.selection = new map.ArrayList();
   /** @private **/
   this.selectionListeners = new map.ArrayList();
   /** @private **/
   this.html = null;
   /** 
    * Current DragDrop node.
    * @private 
    **/
   this.draggingNode=null /*:map.Node*/

   /** 
    * The underlying Node (if exist) during a Drag&Drop operation.
    * @private 
    **/
   this.hoverNode=null /*:map.Node*/

   /** 
    * The drag&drop feedback ghost.
    * @private 
    **/
   this.draggingGhost=null /*HTMLElement*/

   /** @private **/
   this.commandStack = new map.CommandStack();

   $(id).appendChild(this.getHTMLElement());
   var oThis = this;

   Event.observe(this.getAnchor(), 'click', function(event)
   {
     Event.stop(event);
     oThis.setCurrentSelection(oThis);
   });

   this.eventbinding_mousedown= this._mousedown.bindAsEventListener(this);
   this.eventbinding_mouseup= this._mouseup.bindAsEventListener(this);
   this.eventbinding_mousemove= this._mousemove.bindAsEventListener(this);
   this.eventbinding_click= this._click.bindAsEventListener(this);

   Event.observe(this.html.parentNode, 'mousedown', this.eventbinding_mousedown);
   Event.observe(this.html.parentNode, 'mouseup', this.eventbinding_mouseup);
   Event.observe(this.html.parentNode, 'click', this.eventbinding_click);
   Event.observe(this.html.parentNode, 'mousemove', this.eventbinding_mousemove);

   disableSelection(this.html);
}

/**
 * Binding for the click event
 * @private
 **/
map.Mindmap.prototype._click=function(event)
{
//  Event.stop(event);
   if(this.dragging==false)
     this.clearCurrentSelection();
   this.dragging = false;
}

/**
 * Binding for the mouse down event
 * @private
 **/
map.Mindmap.prototype._mousedown=function(event)
{
  this.clientX = event.clientX;
  this.clientY = event.clientY;
  this.mousedown=true;
}

/**
 * Binding for the mouse up event
 * @private
 **/
map.Mindmap.prototype._mouseup=function(event)
{
//  Event.stop(event);
  this.mousedown=false;

  if(this.hoverNode!=null)
  {
     this.hoverNode.setHighlighted(false);
     this.hoverNode.onDrop(this.draggingNode);
     this.hoverNode = null;
  }
  this.setDraggingNode(null);
}

/**
 * Binding for the mouse up event
 * @private
 **/
map.Mindmap.prototype._mousemove=function(event)
{
  if(this.mousedown==true)
  {
    var diffX = event.clientX - this.clientX;
    var diffY = event.clientY - this.clientY;
    this.scrollTo(this.html.parentNode.scrollLeft-diffX,this.html.parentNode.scrollTop-diffY);
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    this.dragging = true;
  }
  if(this.draggingGhost!=null)
  {
//     Event.stop(event);
     var left = this.html.parentNode.scrollLeft;
     var top = this.html.parentNode.scrollTop-this.html.parentNode.offsetTop;
     this.draggingGhost.style.left=(event.clientX+left-5)+"px";
     this.draggingGhost.style.top=(event.clientY+top-5)+"px";

     var node = this.getBestNode((event.clientX+left),(event.clientY+top));
     if(this.hoverNode!=null)
       this.hoverNode.setHighlighted(false);
     this.hoverNode = node;
     if(this.hoverNode!=null)
       this.hoverNode.setHighlighted(true);
  }
}


map.Mindmap.prototype._IE_bug=function(/*:map.Node*/ node)
{
   if(node)
   {

       if(node.isVisible())
       {
          node.drawLines(true);
       }
       else
         return;

       for(var i=0;i<node.children.getSize();i++)
       {
         var child = node.children.get(i);
         this._IE_bug(child);
       }
   }
   else
   {
     for(var i=0;i<this.leftChildren.getSize();i++)
     {
       var child = this.leftChildren.get(i);
       this._IE_bug(child);
     }
     for(var i=0;i<this.rightChildren.getSize();i++)
     {
       var child = this.rightChildren.get(i);
       this._IE_bug(child);
     }
     this.drawLines();
   }
}


/**
 * Returns the current selected nodes.<br>
 * 
 * @type map.ArrayList
 **/
map.Mindmap.prototype.getCurrentSelection=function()
{
   return this.selection;
}

/**
 * Set the current selected node of the mindmap and reset the old
 * selection
 *
 * @private
 **/
map.Mindmap.prototype.setCurrentSelection=function(/*:map.Node*/ node)
{
   for(var i=0;i<this.selection.getSize();i++)
   {
     var child = this.selection.get(i);
     child.setSelected(false);
   }
   this.selection = new map.ArrayList();
   if(node!=null)
   {
      this.selection.add(node);
      node.setSelected(true);
   }
   this.notifyListeners();
}

/**
 *
 * @private
 **/
map.Mindmap.prototype.setDraggingNode=function(/*:map.Node*/ node)
{
   // nothing to do
   if(this.draggingNode==node)
      return;

   this.draggingNode = node;

   if(node==null)
   {
     if(this.draggingGhost!=null)
       this.draggingGhost.remove();
     this.draggingGhost=null;
   }
   else
   {
      var pos = node.getAbsoluteAnchor();
      // create DragDrop node
      this.draggingGhost = new Element("div");
      this.draggingGhost.className="dragging_ghost";
      this.draggingGhost.innerHTML=node.getAnchor().innerHTML;
      Element.setStyle(this.draggingGhost,"left:"+pos.left+"px");
      Element.setStyle(this.draggingGhost,"top:"+pos.top+"px");
      this.getHTMLElement().appendChild(this.draggingGhost);
   }

}

/**
 *
 * @private
 **/
map.Mindmap.prototype.getDraggingNode=function()
{
   return this.draggingNode;
}

/**
 * Set the current selected node of the mindmap and reset the old
 * selection
 *
 * @private
 **/
map.Mindmap.prototype.removeCurrentSelection=function(/*:map.Node*/ node)
{
   this.selection.remove(node);
   node.setSelected(false);
   this.notifyListeners();
}


/**
 * Add the handsover node the the selection. This is the support
 * for multiselect.
 *
 * @private
 **/
map.Mindmap.prototype.addCurrentSelection=function(/*:map.Node*/ node)
{
   this.selection.add(node);
   node.setSelected(true);
   this.notifyListeners();
}


/**
 * Reset the current selection
 * for multiselect.
 *
 * @private
 **/
map.Mindmap.prototype.clearCurrentSelection=function()
{
   for(var i=0;i<this.selection.getSize();i++)
   {
     var child = this.selection.get(i);
     child.setSelected(false);
   }
   this.selection = new map.ArrayList();
   this.notifyListeners();
}


/**
 * Returns an empty child node.<br>
 * Inherited classes can override this method to return node depending child nodes.<br>
 *
 * @type map.Node
 * @abstract
 **/
map.Mindmap.prototype.createEmptyChildNode=function()
{
   return new map.LeftNode();
}


/**
 * Called by the framework to inform the mindmap that the root node has been selected.
 * 
 * @param {boolean} flag [true] if you want mark this element as selected
 * @final
 **/
map.Mindmap.prototype.setSelected=function(/*:boolean*/ flag)
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
 * Returns whenether the element is deletable. The root node (the Mindmap)
 * always returns <code>false</code>
 * 
 * @type boolean
 **/
map.Mindmap.prototype.getDeleteable=function()
{
  return false;
}


/**
 * Returns the command stack for the Canvas. Required for undo/redo  support.
 *
 * @type map.CommandStack
 **/
map.Mindmap.prototype.getCommandStack = function()
{
  return this.commandStack;
}


map.Mindmap.prototype.getAnchor=function()
{
   return this.centerLabel;
}



/**
 * @type HTMLElement
 **/
map.Mindmap.prototype.addNode=function(/*:map.Node*/ node)
{
   if(node instanceof map.LeftNode)
   {
      this.leftChildrenHTML.appendChild(node.getHTMLElement());
      this.leftChildren.add(node);
   }
   else
   {
      this.rightChildrenHTML.appendChild(node.getHTMLElement());
      this.rightChildren.add(node);
   }

   // The mindmap is parent and to root element of this node
   //
   node.setParent(this);
   node.setMindmap(this);
}

/**
 * @type HTMLElement
 **/
map.Mindmap.prototype.removeNode=function(/*:map.Node*/ node)
{
   if(node instanceof map.LeftNode)
   {
      node.getHTMLElement().remove();
      this.leftChildren.remove(node);
   }
   else
   {
      node.getHTMLElement().remove();
      this.rightChildren.remove(node);
   }

   // The mindmap is parent and to root element of this node
   //
   node.setParent(null);
   node.setMindmap(null);
   this.drawLines();
}

map.Mindmap.prototype.getHeight=function()
{
  return this.height;
}

map.Mindmap.prototype.getWidth=function()
{
  return this.width;
}

map.Mindmap.prototype.scrollTo=function(/*:int*/ x, /*:int*/y)
{
  this.html.parentNode.scrollLeft=x;
  this.html.parentNode.scrollTop=y;
}

/**
 * @type HTMLElement
 **/
map.Mindmap.prototype.getHTMLElement=function()
{
   if(this.html==null)
   {
      this.html = new Element("table");
      this.html.className ="root";
      this.html.style.width  =this.width+"px";
      this.html.style.height =this.height+"px";

      var row=this.html.insertRow(0);

      this.leftChildrenHTML=row.insertCell(0);
      this.leftChildrenHTML.className = "left_canvas";
      this.leftChildrenHTML.width= ""+parseInt(this.width/2);

      this.leftLines=row.insertCell(1);
      this.leftLines.style.width= "50px";
      this.leftLines.style.height =this.height+"px";
          this.leftCanvas = createCanvas(this.leftLines);
          this.leftCanvas.style.width = "50px";  //IE
          this.leftCanvas.style.height = this.height+"px";
          this.leftCanvas.setAttribute('width', "50" ); //FF
          this.leftCanvas.setAttribute('height', this.height);//FF

      this.centerCanvas=row.insertCell(2);
      this.centerCanvas.className = "center_canvas";
      this.centerCanvas.width= "80";
          this.centerLabel = new Element("div");
          this.centerLabel.innerHTML= "CENTER";
          this.centerCanvas.appendChild(this.centerLabel);

      this.rightLines=row.insertCell(3);
      this.rightLines.style.width= "50px";
      this.rightLines.style.height =this.height+"px";
          this.rightCanvas = createCanvas(this.rightLines);
          this.rightCanvas.style.width = "50px";  //IE
          this.rightCanvas.style.height = this.height+"px";
          this.rightCanvas.setAttribute('width', "50" ); //FF
          this.rightCanvas.setAttribute('height', this.height);//FF

      this.rightChildrenHTML=row.insertCell(4);
      this.rightChildrenHTML.className = "right_canvas";
      this.rightChildrenHTML.width= ""+parseInt(this.width/2);
   }
   return this.html;
}


map.Mindmap.prototype.drawLines=function()
{
     this.adjustCanvasHeight();

     var ctx = this.leftCanvas.getContext('2d');
     var thisAnchor = Element.cumulativeOffset($(this.leftCanvas));
     ctx.clearRect(0, 0, 50, this.height);

     ctx.strokeStyle = '#999999';
     ctx.lineWidth = 0.3;
     for(var i=0;i<this.leftChildren.getSize();i++)
     {
       var child = this.leftChildren.get(i);
       var anchor = child.getAbsoluteAnchor();
       var top = (anchor.top-thisAnchor.top)+ child.getAnchorHeight()/2;
       ctx.moveTo(0,top);
       ctx.bezierCurveTo(20,top, 15, this.height/2,50,this.height/2);
       ctx.stroke();
     }


     ctx = this.rightCanvas.getContext('2d');
     thisAnchor = Element.cumulativeOffset($(this.rightCanvas));
     ctx.clearRect(0, 0, 50, this.height);

     ctx.strokeStyle = '#999999';
     ctx.lineWidth = 0.3;
     for(var i=0;i<this.rightChildren.getSize();i++)
     {
       var child = this.rightChildren.get(i);
       var anchor = child.getAbsoluteAnchor();
       var top = (anchor.top-thisAnchor.top)+ child.getAnchorHeight()/2;
       ctx.moveTo(50,top);
       ctx.bezierCurveTo(0,top, 15, this.height/2,0,this.height/2);
       ctx.stroke();
     }
}

/**
 * @private
 * @type map.Node
 **/
map.Mindmap.prototype.getBestNode=function(/*:int*/ x, /*:int*/ y)
{
  for(var i=0;i <this.leftChildren.getSize();i++)
  {
    var node = this.leftChildren.get(i);
    var hit = node.getBestNode(x,y);
    if(hit!=null)
        return hit;
  }
  for(var i=0;i <this.rightChildren.getSize();i++)
  {
    var node = this.rightChildren.get(i);
    var hit = node.getBestNode(x,y);
    if(hit!=null)
        return hit;
  }
  return null;
}

/**
 *
 * @private 
 **/
map.Mindmap.prototype.adjustCanvasHeight=function()
{
//  var dim = $(this.html).getDimensions();
  this.leftCanvas.style.height = (this.height-5)+"px";//IE
  this.leftCanvas.setAttribute('height', (this.height-5));//FF
  this.rightCanvas.style.height = (this.height-5)+"px";//IE
  this.rightCanvas.setAttribute('height', (this.height-5));//FF

  return this.height;
}

/**
 * Adds a listener to the mindmap, which will be notified whenever the selection has been changed.
 * @param {map.CommandStackListener} listener the listener to add.
 */
map.Mindmap.prototype.addSelectionListener=function(/*:map.SelectionListener*/ listener)
{
   this.selectionListeners.add(listener);
}

/**
 * Removes a listener.
 * @param {map.SelectionListener} listener the listener to remove.
 */
map.Mindmap.prototype.removeSelectionListener=function(/*:map.SelectionListener*/ listener)
{
   this.selectionListeners.remove(listener);
}

/**
 * Notifies selection listeners that the selection has been changed
 * 
 * @private
 **/
map.Mindmap.prototype.notifyListeners=function()
{
  var size = this.selectionListeners.getSize();
  for (var i = 0; i < size; i++)
     this.selectionListeners.get(i).selectionChanged(this.selection);
}
