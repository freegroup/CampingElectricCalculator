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
map.LeftNode=function()
{
  map.Node.call(this);
}

map.LeftNode.prototype = new map.Node;

/**

<table  class="left_node">
<tr>
<td class="left_filler">&nbsp;</td>
<td class="left_children">
	<div class="left_line_canvas">
	CHILDREN_NODES
	</div>
</td>
<td class="left_action">action</td>
<td><div class="left_label">label</div></td>
</tr>
</table>

 **/
map.LeftNode.prototype.getHTMLElement=function()
{
   if(this.html==null)
   {
      this.html = new Element("table");
      this.html.className ="left_node";

      var row=this.html.insertRow(0);
      row.style.height="100%";

      this.leftFiller=row.insertCell(0);
      this.leftFiller.className = "left_filler";
      this.leftFiller.style.height="100%";
      this.leftFiller.innerHTML= "&nbsp;";

      this.childrenContainer=row.insertCell(1);
      this.childrenContainer.style.height="100%";
      this.childrenContainer.className = "left_children";

          var innerTable = new Element("table");
          innerTable.style.height="100%";
          var innerRow=innerTable.insertRow(0);
          innerRow.style.height="100%";
          var cell=innerRow.insertCell(0);
          cell.style.height="100%";
          this.childContainer = cell;

          cell=innerRow.insertCell(1);
          cell.style.height="100%";
          this.canvas = createCanvas(cell);
          this.canvas.style.width = "30px";  //IE
          this.canvas.style.height = "30px";//IE
          this.canvas.setAttribute('width', "30" ); //FF
          this.canvas.setAttribute('height', "30");//FF

      this.childrenContainer.appendChild(innerTable);

      this.actionIcon=row.insertCell(2);
      this.actionIcon.className = "left_action";
      var oThis = this;
          this.actionIconIcon = new Element("img");
          this.actionIconIcon.src = "images/icon_plus.png";
          this.actionIconIcon.className = "left_action_icon";
          this.actionIcon.appendChild(this.actionIconIcon);

      this.leftLabel=row.insertCell(3);
      this.leftLabel.className = "left_label";
      this.labelDiv = new Element("div");
      this.labelDiv.innerHTML="label";
      this.labelDiv.id=map.UUID.create();
      this.leftLabel.appendChild(this.labelDiv);
      this.hideAction(this.children.getSize()==0);
      this.afterCreateHTML();
   }
   return this.html;
}


/**
 * Returns an empty child node.<br>
 *
 * @type map.LeftNode
 **/
map.LeftNode.prototype.createEmptyChildNode=function()
{
   return new map.LeftNode();
}

/**
 * Draw all required lines to the children nodes.<br>
 * Called by the framework.
 *
 * @private
 **/
map.LeftNode.prototype.drawLines=function(flag)
{
   if(this.isVisible())
   {
     var height = this.adjustCanvasHeight();
     var thisAnchor = Element.cumulativeOffset($(this.canvas));
     var ctx = this.canvas.getContext('2d');
     ctx.clearRect(0, 0, 30, height);

     ctx.strokeStyle = '#999999';
     ctx.lineWidth = 0.3;
     for(var i=0;i<this.children.getSize();i++)
     {
       var child = this.children.get(i);
       var anchor = child.getAbsoluteAnchor();
       var top = (anchor.top-thisAnchor.top)+ child.getAnchorHeight()/2;

       ctx.moveTo(0,top);
       ctx.bezierCurveTo(20, top, 15, height/2, 30, height/2);
       ctx.stroke();
     }
   }
   if(flag==undefined && this.parent!=null)
     this.parent.drawLines();
}

/**
 *
 * @private 
 **/
map.LeftNode.prototype.isVisible=function()
{
  return Element.visible(this.childrenContainer);
}

/**
 *
 * @private 
 **/
map.LeftNode.prototype.adjustCanvasHeight=function()
{
  this.canvas.style.height = "5px";//IE
  this.canvas.setAttribute('height', 5);//FF
  var dim = $(this.childrenContainer).getDimensions();
  this.canvas.style.height = (dim.height-20)+"px";//IE
  this.canvas.setAttribute('height', (dim.height-20));//FF

  return dim.height;
}

