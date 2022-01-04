const images = require.context("@/assets/components/pressurePump/", true, /\.png$/)

const components = [
  { 
    uuid: "1w3123pump43lk245", 
    type: "pressurePump", 
    name: "Lilie LP4142", 
    imageSrc: images("./lilie_lp4142.png"),
    data: {
      spannung: 12, 
      strom: 3.5,
      watt: 3.5 * 12 // P=I*U
    }
  }
]

export default components