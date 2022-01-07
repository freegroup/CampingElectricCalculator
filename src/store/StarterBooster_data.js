const images = require.context("@/store/images/starterBooster/", true, /\.png$/)

export default [
  { 
    uuid: "6", 
    type: "starterBooster", 
    name: "Schaudt WA121525", 
    imageSrc: images("./schaudt_wa121525.png"),
    shopping: [
    ],
    data: {
      type: "DC-DC Converter",
      eingangsspannung: 12,
      eingangsstrom: 15,
      spannung: 12,
      strom: 15
    }
  }
]
