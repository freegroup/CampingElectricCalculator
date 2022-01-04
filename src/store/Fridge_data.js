const images = require.context("@/assets/components/fridge/", true, /\.png$/)

const components = [
  { 
    uuid: "1w3453lk245", 
    type: "fridge", 
    name: "Engel CK100", 
    imageSrc: images("./engel_ck100.png"),
    data: {
      spannung: 12, 
      strom: 32 / 12, // I=P/U
      watt: 32
    }
  }
]

export default components
