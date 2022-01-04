const images = require.context("@/assets/components/fuse/", true, /\.png$/)

const fuses = 
[
  { 
    uuid: "7", 
    type: "fuse", 
    name: "Automat 150A", 
    imageSrc: images("./sicherungsatomat-200A.png"),
    data: {
      strom: 150,
      spannung: 12
    }
  },
  { 
    uuid: "8", 
    type: "fuse", 
    name: "Automat 200A", 
    imageSrc: images("./sicherungsatomat-200A.png"),
    data: {
      strom: 200,
      spannung: 12
    }
  }
]

export default fuses
