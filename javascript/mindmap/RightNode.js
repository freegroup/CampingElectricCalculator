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
map.RightNode=function()
{
  map.Node.call(this);
}

map.RightNode.prototype = new map.Node;

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
map.RightNode.prototype.getHTMLElement=function()
{
   if(this.html==null)
   {
      this.html = new Element("table");
      this.html.className ="right_node";

      var row=this.html.insertRow(0);
      row.style.height="100%";

      this.leftLabel=row.insertCell(0);
      this.leftLabel.className = "right_label";
      this.labelDiv = new Element("div");
      this.labelDiv.innerHTML="label";
      this.labelDiv.id=map.UUID.create();
      this.leftLabel.appendChild(this.labelDiv);

      this.actionIcon=row.insertCell(1);
      this.actionIcon.className = "right_action";
      var oThis = this;
          this.actionIconIcon = new Element("img");
          this.actionIconIcon.src = "images/icon_plus.png";
          this.actionIconIcon.className = "right_action_icon";
          this.actionIcon.appendChild(this.actionIconIcon);

      this.childrenContainer=row.insertCell(2);
      this.childrenContainer.style.height="100%";
      this.childrenContainer.className = "right_children";

          var innerTable = new Element("table");
          innerTable.style.height="100%";

          var innerRow=innerTable.insertRow(0);
          innerRow.style.height="100%";

          cell=innerRow.insertCell(0);
          cell.style.height="100%";
          this.canvas = createCanvas(cell);
          this.canvas.style.width = "30px";  //IE
          this.canvas.style.height = "30px";//IE
          this.canvas.setAttribute('width', "30" ); //FF
          this.canvas.setAttribute('height', "30");//FF

          var cell=innerRow.insertCell(1);
          cell.style.height="100%";
          this.childContainer = cell;


      this.childrenContainer.appendChild(innerTable);
      this.hideAction(this.children.getSize()==0);
      this.afterCreateHTML();
   }
   return this.html;
}


/**
 * Returns an empty child node.<br>
 *
 * @type map.RightNode
 **/
map.RightNode.prototype.createEmptyChildNode=function()
{
   return new map.RightNode();
}


/**
 * Draw all required lines to the children nodes.<br>
 * Called by the framework.
 *
 * @private
 **/
map.RightNode.prototype.drawLines=function()
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
       ctx.moveTo(30,top);
       ctx.bezierCurveTo(0, top, 15, height/2, 0, height/2);
       ctx.stroke();
     }
   }
   if(this.parent!=null)
     this.parent.drawLines();

}
/**
 *
 * @private 
 **/
map.RightNode.prototype.adjustCanvasHeight=function()
{
  this.canvas.style.height = "5px";//IE
  this.canvas.setAttribute('height', 5);//FF
  var dim = $(this.childrenContainer).getDimensions();
  this.canvas.style.height = (dim.height-20)+"px";//IE
  this.canvas.setAttribute('height', (dim.height-20));//FF

  return dim.height;
}