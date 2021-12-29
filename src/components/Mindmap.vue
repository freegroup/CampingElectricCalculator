<template>
  <div class="canvas" ref="root"></div>
</template>

<script>
import { ref, onMounted } from 'vue'
import MindMap from '@/map/Mindmap'
import RightNode from '@/map/RightNode'

export default {
  setup() {
    const root = ref(null)

    onMounted(() => {
      const map = new MindMap(root.value, 2000, 2000)
      const node = map.getCurrentSelection()[0]
      node.addNode(node.createEmptyChildNode())
      node.addNode(node.createEmptyChildNode())

      const n = node.createEmptyChildNode()
      node.addNode(n)
      n.addNode(node.createEmptyChildNode())
      n.addNode(node.createEmptyChildNode())

      const right = new RightNode()
      map.addNode(right)
    })

    return {
      root
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.root {
  position: relative;
  table-layout: fixed;
}

.left_filler {
  width: 100%;
}

.canvas {
  overflow: auto;
  font-size: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

.mindmapTable {
  border-spacing: 0;
  border-collapse: collapse;
  border: none;
}

.mindmapTable tr,
.mindmapTable td {
  padding: 0;
  margin: 0;
  border: none;
}

.mindmapCanvas {
  display: block;
}

.left_action_icon {
  cursor: pointer;
}

.center_canvas {
  text-align: center;
  white-space: nowrap;
}

.right_action_icon {
  cursor: pointer;
}

.selected_node {
  border: 3px solid gray;
}

.normal_node {
  margin: 3px;
  cursor: pointer;
}

.highlighted_node {
  background-color: yellow !important;
}
</style>
