const images = require.context("@/store/images/fridge/", true, /\.png$/)

export default [
  { 
    uuid: "1w3453lk245", 
    type: "fridge", 
    name: "Engel CK100", 
    imageSrc: images("./engel_ck100.png"),
    operationHours: 24,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 32 / 12, // I=P/U
      watt: 32
    }
  }
]
