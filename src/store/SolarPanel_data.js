const images = require.context("@/store/images/solarPanel/", true, /\.png$/)

export default [
  { 
    uuid: "6676406A-45EA-4B45-98A9-6118ADF47CD6", 
    type: "solarPanel", 
    name: "ECTIVE MSP 80", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp80.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3G6QxQs",
        label: "ECTIVE 24V 70W Monokristallines Solarmodul Black Edition",
        lastKnownPrice: 86
      }
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
    uuid: "578D8BAA-EF41-47E9-A25E-45995B7E4F14", 
    type: "solarPanel", 
    name: "ECTIVE MSP 70", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp70.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3G6QxQs",
        label: "ECTIVE 24V 70W Monokristallines Solarmodul Black Edition",
        lastKnownPrice: 86
      }
    ],
    data: {
      watt: 70, // Watt peak
      nennspannung: 36.19, // Nennspannung
      leerlaufspannung: 21.50,
      nennstrom: 1.94, // Nennstrom
      kurzschlusstrom: 2.1
    }
  },
  { 
    uuid: "9E01A0BE-BBE5-4421-B52E-2DFE25D79C03", 
    type: "solarPanel", 
    name: "ECTIVE MSP 100", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp100.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/34BKl5b",
        label: "ECTIVE 24V 100W Monokristallines Solarmodul Black Edition",
        lastKnownPrice: 102
      }
    ],
    data: {
      watt: 100, // Watt peak
      nennspannung: 36.19, // Nennspannung
      leerlaufspannung: 21.50,
      nennstrom: 2.77, // Nennstrom
      kurzschlusstrom: 3.01
    }
  },
  { 
    uuid: "22C85112-E95E-4185-B2E7-EB2CB2D35BA1", 
    type: "solarPanel", 
    name: "Büttner Power Line 210", 
    hersteller: "Büttner",
    imageSrc: images("./buettner210.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Etriox",
        link: "https://shop.etriox.de/Buettner-Power-Line-Solar-Komplettanlage-210-W",
        label: "Büttner Power Line Solar-Komplettanlage 210 W, Komplettanlage",
        lastKnownPrice: 960
      },
      {
        shop: "Camping Wagner",
        link: "https://www.campingwagner.de/product_info.php/info/p83927_Buettner-Elektronik-Power-Line-MT-210-Solar-Komplettanlage--210Wp--920Wh-Tag.html",
        label: "Büttner Power Line Solar-Komplettanlage 210 W, Komplettanlage",
        lastKnownPrice: 1239
      }
    ],
    data: {
      watt: 210, // Watt peak
      nennspannung: 27, // Nennspannung
      leerlaufspannung: 22.50,
      nennstrom: 9.34, // Nennstrom
      kurzschlusstrom: 9.8
    }
  }
]
