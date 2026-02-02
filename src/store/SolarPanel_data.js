const images = require.context("@/store/images/solarPanel/", true, /\.png$/)

export default [
  { 
    uuid: "custom", 
    name: "Generic Solar Panel", 
    hersteller: "Generic",
    imageSrc: images("./custom.png"),
    operationHours: 24,
    exportable: true,
    shopping: [],
    data: {
      watt: 0, // Watt peak
      nennspannung: 0,
      leerlaufspannung: 0,
      nennstrom: 0,
      kurzschlussstrom: 0
    }
  },
  { 
    uuid: "6676406A-45EA-4B45-98A9-6118ADF47CD6", 
    name: "ECTIVE MSP", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp80.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/34lRN3U",
        label: "ECTIVE 24V 70W Monokristallines Solarmodul Black Edition",
        lastKnownPrice: 86
      }
    ],
    data: {
      watt: 80, // Watt peak
      nennspannung: 18.20,
      leerlaufspannung: 21.50,
      nennstrom: 4.40,
      kurzschlussstrom: 4.91
    }
  },
  { 
    uuid: "578D8BAA-EF41-47E9-A25E-45995B7E4F14", 
    name: "ECTIVE MSP", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp70.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3obvzsI",
        label: "ECTIVE 24V 70W Monokristallines Solarmodul Black Edition",
        lastKnownPrice: 86
      }
    ],
    data: {
      watt: 70, // Watt peak
      nennspannung: 21.50, // Nennspannung
      leerlaufspannung: 36.19,
      nennstrom: 1.94, // Nennstrom
      kurzschlussstrom: 2.1
    }
  },
  { 
    uuid: "9E01A0BE-BBE5-4421-B52E-2DFE25D79C03", 
    name: "ECTIVE MSP", 
    hersteller: "ECTIVE",
    imageSrc: images("./ectivemsp100.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3saKzs6",
        label: "ECTIVE 24V 100W Monokristallines Solarmodul Black Edition",
        lastKnownPrice: 102
      }
    ],
    data: {
      watt: 100, // Watt peak
      nennspannung: 21.50, // Nennspannung
      leerlaufspannung: 36.19,
      nennstrom: 2.77, // Nennstrom
      kurzschlussstrom: 3.01
    }
  },
  { 
    uuid: "22C85112-E95E-4185-B2E7-EB2CB2D35BA1", 
    name: "Büttner Power Line", 
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
      nennspannung: 22.50, // Nennspannung
      leerlaufspannung: 27,
      nennstrom: 9.34, // Nennstrom
      kurzschlussstrom: 9.8
    }
  },
  { 
    uuid: "58FBABFF-C628-442C-AC1B-CEF162566074", 
    name: "enjoysolar Monokristallines", 
    hersteller: "enjoysolar",
    imageSrc: images("./enjoysolar_180.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3KWW3rB",
        label: "enjoysolar® Monokristallines Solarmodul Solarpanel mit PERC Zellentechnik schwarzes Rahmen Version",
        lastKnownPrice: 138.95
      }
    ],
    data: {
      watt: 180, // Watt peak
      nennspannung: 19.1, // Nennspannung
      leerlaufspannung: 23.2,
      nennstrom: 9.43, // Nennstrom
      kurzschlussstrom: 9.99
    }
  }
  }/* NEW_COMPONENT_PLACE */
]
