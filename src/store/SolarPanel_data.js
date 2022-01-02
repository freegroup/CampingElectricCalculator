const images = require.context("@/assets/components/solarPanel/", true, /\.png$/)

const components = [
  { 
    uuid: "99", 
    type: "solarPanel", 
    name: "ECTIVE MSP 80", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp80.png"),
    data: {
      gewicht: 6000,
      watt: 80,
      zellen: 36,
      nennspannung: 18.20,
      leerlaufspannung: 21.50,
      nennstrom: 4.40,
      kurzschlusstrom: 4.91
    }
  },
  { 
    uuid: "199", 
    type: "solarPanel", 
    name: "ECTIVE MSP 71", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp80.png"),
    data: {
      gewicht: 6000,
      watt: 80,
      zellen: 36,
      nennspannung: 18.20,
      leerlaufspannung: 21.50,
      nennstrom: 4.40,
      kurzschlusstrom: 4.91
    }
  }
]

export default components
