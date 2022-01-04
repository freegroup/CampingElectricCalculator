const images = require.context("@/assets/components/starterBooster/", true, /\.png$/)

const components = [
  { 
    uuid: "6", 
    type: "starterBooster", 
    name: "Schaudt WA121525", 
    imageSrc: images("./schaudt_wa121525.png"),
    data: {
      strom: 15,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leewrlaufspannung der Solarpanele sein
      eingangsspannung: 12,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangsstrom: 15
    }
  }
]

export default components
