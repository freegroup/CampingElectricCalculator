const images = require.context("@/store/images/alternator/", true, /\.png$/)

export default [
  { 
    uuid: "1w345iuiouh3245", 
    type: "alternator", 
    name: "Alternator", 
    imageSrc: images("./alternator.png"),
    operationHours: 24,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 80
    }
  }
]
