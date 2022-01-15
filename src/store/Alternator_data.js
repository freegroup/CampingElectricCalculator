const images = require.context("@/store/images/alternator/", true, /\.png$/)

export default [
  { 
    uuid: "1w345iuiouh3245", 
    type: "alternator", 
    name: "Alternator 12V", 
    imageSrc: images("./alternator.png"),
    operationHours: 24,
    exportable: false,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 80
    }
  },
  { 
    uuid: "CCA500F4-14DB-4E51-80E4-611671FC24D6", 
    type: "alternator", 
    name: "Alternator 24V", 
    imageSrc: images("./alternator.png"),
    operationHours: 24,
    exportable: false,
    shopping: [
    ],
    data: {
      spannung: 24, 
      strom: 80
    }
  }
]
