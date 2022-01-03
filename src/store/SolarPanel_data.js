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
      spannung: 18.20, // Nennspannung
      leerlaufspannung: 21.50,
      strom: 4.40, // Nennstrom
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
      spannung: 18.20, // Nennspannung
      leerlaufspannung: 21.50,
      strom: 4.40, // Nennstrom
      kurzschlusstrom: 4.91
    }
  }
]

export default components
