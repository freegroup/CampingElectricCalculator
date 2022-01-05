const images = require.context("@/store/images/starterAccu/", true, /\.png$/)

const components = [
  { 
    uuid: "1w3453245", 
    type: "starterAccu", 
    name: "Starter", 
    imageSrc: images("./starter.png"),
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 400
    }
  }
]

export default components
