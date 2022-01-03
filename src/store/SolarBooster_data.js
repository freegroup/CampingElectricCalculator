const images = require.context("@/assets/components/solarBooster/", true, /\.png$/)

const components = [
  { 
    uuid: "4", 
    type: "solarBooster", 
    name: "BlueSolar 75|15", 
    imageSrc: images("./bluesolar_75_15.png"),
    data: {
      typ: "mppt",
      strom: 15,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leewrlaufspannung der Solarpanele sein
      eingangsspannung: 75,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 200
    }
  }, 
  { 
    uuid: "5", 
    type: "solarBooster", 
    name: "Booster 2", 
    imageSrc: images("./bluesolar_75_15.png"),
    data: {
      typ: "mppt",
      strom: 151,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leewrlaufspannung der Solarpanele sein
      eingangsspannung: 35,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 100
    }
  }
]

export default components
