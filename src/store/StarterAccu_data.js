const images = require.context("@/store/images/starterAccu/", true, /\.png$/)

export default [
  { 
    uuid: "1w3453245", 
    name: "Starter", 
    imageSrc: images("./starter.png"),
    exportable: false,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 400
    }
  }
]
