const images = require.context("@/store/images/solarPanel/", true, /\.png$/)

export default [
  { 
    uuid: "6676406A-45EA-4B45-98A9-6118ADF47CD6", 
    type: "solarPanel", 
    name: "ECTIVE MSP 80", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp80.png"),
    shopping: [
    ],
    data: {
      watt: 80, // Watt peak
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
    shopping: [
    ],
    data: {
      watt: 80, // Watt peak
      nennspannung: 18.20, // Nennspannung
      leerlaufspannung: 21.50,
      nennstrom: 4.40, // Nennstrom
      kurzschlusstrom: 4.91
    }
  }
]
