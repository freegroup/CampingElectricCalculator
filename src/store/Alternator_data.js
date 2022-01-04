const images = require.context("@/assets/components/alternator/", true, /\.png$/)

const components = [
  { 
    uuid: "1w345iuiouh3245", 
    type: "alternator", 
    name: "Alternator", 
    imageSrc: images("./alternator.png"),
    data: {
      spannung: 12, 
      strom: 80
    }
  }
]

export default components
