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
map.Application=function(/*:String*/ id)
{
  this.containerId = id;
}

map.Application.prototype = new map.Application;

/**
 **/
map.Application.prototype.init=function()
{
 var mindmap = new map.Mindmap("canvas",1700, 1700);

 var node1 = new map.LeftNode();
 var node2 = new map.LeftNode();

 var child1 = new map.LeftNode();
 var child2 = new map.LeftNode();
 var child3 = new map.LeftNode();
 var child4 = new map.LeftNode();

 var child3_1 = new map.LeftNode();
 var child3_2 = new map.LeftNode();
 
 mindmap.addNode(node1);
 mindmap.addNode(node2);

 node1.addNode(child1);
 node1.addNode(child2);
 node1.addNode(child3);
 node1.addNode(child4);

 child3.addNode(child3_1);
 child3.addNode(child3_2);


 var node_r1 = new map.RightNode();
 var node_r2 = new map.RightNode();

 mindmap.addNode(node_r1);
 mindmap.addNode(node_r2);

 child1 = new map.RightNode();
 child2 = new map.RightNode();
 child3 = new map.RightNode();

 node_r2.addNode(child1);
 node_r2.addNode(child2);
 node_r2.addNode(child3);

  this.toolbar = new map.Toolbar(mindmap);
  $(this.containerId).appendChild(this.toolbar.getHTMLElement());

  // setup my toolbar with the ADD / REMOVE Button group
  //
  this.group1 = new map.ToolbarButtonGroup(mindmap);
  this.toolbar.addElement(this.group1);
  this.group1.addElement(new map.AddButton(mindmap));
  this.group1.addElement(new map.DeleteButton(mindmap));

  this.group2 = new map.ToolbarButtonGroup(mindmap);
  this.toolbar.addElement(this.group2);
  this.group2.addElement(new map.ToolbarButton(mindmap,"test2"));
  this.group2.addElement(new map.ToolbarButton(mindmap,"END"));

 var dimension = clientDimension();
 mindmap.scrollTo(mindmap.getWidth()/2-dimension.width/2+80,mindmap.getHeight()/2-dimension.height/2);
  
}

