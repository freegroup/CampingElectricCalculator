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
map.ArrayList=function()
{
   /* Properties */
   this.increment = 10;
   this.size = 0;
   this.data = new Array(this.increment);
}

map.ArrayList.EMPTY_LIST = new map.ArrayList();


// reverse the ArrayList
map.ArrayList.prototype.reverse=function()
{
   var newData = new Array(this.size);
   for (var i=0; i<this.size; i++)
   {
      newData[i] = this.data[this.size-i-1];
   }
   this.data = newData;
}

// getCapacity() -- returns the number of elements the vector can hold
map.ArrayList.prototype.getCapacity=function() 
{
   return this.data.length;
}

// getSize() -- returns the current size of the vector
map.ArrayList.prototype.getSize=function() 
{
   return this.size;
}

// isEmpty() -- checks to see if the Vector has any elements
map.ArrayList.prototype.isEmpty=function() 
{
   return this.getSize() == 0;
}

// getLastElement() -- returns the last element
map.ArrayList.prototype.getLastElement=function() 
{
   if (this.data[this.getSize() - 1] != null) 
   {
      return this.data[this.getSize() - 1];
   }
}

// getFirstElement() -- returns the first element
map.ArrayList.prototype.getFirstElement=function() 
{
   if (this.data[0] != null) 
   {
      return this.data[0];
   }
}

// getElementAt() -- returns an element at a specified index
map.ArrayList.prototype.get=function(/*:int*/i)
{
   return this.data[i];
}

// add() -- adds a element at the end of the Vector
map.ArrayList.prototype.add=function(obj)
{
   if(this.getSize() == this.data.length) 
   {
      this.resize();
   }
   this.data[this.size++] = obj;
}

// add() -- adds a element at the end of the Vector
map.ArrayList.prototype.addAll=function(obj)
{
   for (var i=0;i<obj.getSize(); i++) 
   {
      this.add(obj.get(i));
   }
}

// indexOf() -- returns the index of a searched element
map.ArrayList.prototype.remove=function(obj)
{
   var index = this.indexOf(obj);
   if(index>=0)
    return this.removeElementAt(index);
   return null;
}


// insertElementAt() -- inserts an element at a given position
map.ArrayList.prototype.insertElementAt=function(obj, index) 
{
   if (this.size == this.capacity) 
   {
      this.resize();
   }
   
   for (var i=this.getSize(); i > index; i--) 
   {
      this.data[i] = this.data[i-1];
   }
   this.data[index] = obj;
   this.size++;
}

// removeElementAt() -- removes an element at a specific index
map.ArrayList.prototype.removeElementAt=function(index)
{
   var element = this.data[index];

   for(var i=index; i<(this.getSize()-1); i++)
   {
      this.data[i] = this.data[i+1];
   }

   this.data[this.getSize()-1] = null;
   this.size--;
   return element;
}

// removeAllElements() -- removes all elements in the Vector
map.ArrayList.prototype.removeAllElements=function()
{
   this.size = 0;

   for (var i=0; i<this.data.length; i++) 
   {
      this.data[i] = null;
   }
}

// indexOf() -- returns the index of a searched element
map.ArrayList.prototype.indexOf=function(obj)
{
   for (var i=0; i<this.getSize(); i++) 
   {
      if (this.data[i] == obj) 
      {
         return i;
      }
   }
   return -1;
}

// contains() -- returns true if the element is in the Vector, otherwise false
map.ArrayList.prototype.contains=function(obj) 
{
   for (var i=0; i<this.getSize(); i++) 
   {
      if (this.data[i] == obj)
      {
         return true;
      }
   }
   return false;
}

// resize() -- increases the size of the Vector
map.ArrayList.prototype.resize=function()
{
   newData = new Array(this.data.length + this.increment);

   for   (var i=0; i< this.data.length; i++) 
   {
      newData[i] = this.data[i];
   }

   this.data = newData;
}


// trimToSize() -- trims the vector down to it's size
map.ArrayList.prototype.trimToSize=function()
{
   // nothing to do
   if(this.data.length == this.size)
      return;

   var temp = new Array(this.getSize());

   for (var i = 0; i < this.getSize(); i++) 
   {
      temp[i] = this.data[i];
   }
   this.size = temp.length;
   this.data = temp;
} 

// sort() - sorts the collection based on a field name - f
map.ArrayList.prototype.sort=function(f) 
{
   var i, j;
   var currentValue;
   var currentObj;
   var compareObj;
   var compareValue;

   for(i=1; i<this.getSize();i++) 
   {
      currentObj = this.data[i];
      currentValue = currentObj[f];

      j= i-1;
      compareObj = this.data[j];
      compareValue = compareObj[f];

      while(j >=0 && compareValue > currentValue) 
      {
         this.data[j+1] = this.data[j];
         j--;
         if (j >=0) {
                  compareObj = this.data[j];
                  compareValue = compareObj[f];
         }
      }
      this.data[j+1] = currentObj;
   }
}

// clone() -- copies the contents of a Vector to another Vector returning the new Vector.
map.ArrayList.prototype.clone=function() 
{
   var newVector = new map.ArrayList(this.size);

   for (var i=0; i<this.size; i++) {
      newVector.add(this.data[i]);
   }

   return newVector;
}

// overwriteElementAt() - overwrites the element with an object at the specific index.
map.ArrayList.prototype.overwriteElementAt=function(obj, index) 
{
   this.data[index] = obj;
}

map.ArrayList.prototype.getPersistentAttributes=function()
{
   return {
          data: this.data,
          increment: this.increment,
          size: this.getSize()
          };
}
