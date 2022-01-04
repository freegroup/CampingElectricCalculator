const images = require.context("@/assets/components/starterAccu/", true, /\.png$/)

const components = [
  { 
    uuid: "1w3453245", 
    type: "starterAccu", 
    name: "Starter", 
    imageSrc: images("./starter.png"),
    data: {
      gewicht: 6000,
      spannung: 12, 
      strom: 80
    }
  }
]

export default components
