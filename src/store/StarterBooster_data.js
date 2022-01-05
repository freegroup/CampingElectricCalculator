const images = require.context("@/store/images/starterBooster/", true, /\.png$/)

const components = [
  { 
    uuid: "6", 
    type: "starterBooster", 
    name: "Schaudt WA121525", 
    imageSrc: images("./schaudt_wa121525.png"),
    shopping: [
    ],
    data: {
      // Eingangsspannung muss GÖßER als die Leewrlaufspannung der Solarpanele sein
      eingangsspannung: 12,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangsstrom: 15,
      spannung: 12,
      strom: 15
    }
  }
]

export default components
